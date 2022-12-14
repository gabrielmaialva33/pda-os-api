import {
  HttpException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { catchError, forkJoin, from, map, switchMap, of } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';

import {
  CreateCollaboratorDto,
  UpdateCollaboratorDto,
} from '@modules/collaborator/dto';

import { PaginationObject } from '@lib/pagination';
import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';
import { ListOptions } from '@common/interfaces/base-repository.interface';

import { CollaboratorRepository } from '@modules/collaborator/repositories/collaborator.repository';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';
import { UserService } from '@modules/user/services/user.service';
import { RoleService } from '@modules/role/services/role.service';
import { PhoneService } from '@modules/phone/services/phone.service';
import { AddressService } from '@modules/address/services/address.service';
import { BankService } from '@modules/bank/services/bank.service';
import { RoleType } from '@modules/role/enum/role-type.enum';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private readonly userService: UserService,
    private readonly rolesService: RoleService,
    private readonly phoneService: PhoneService,
    private readonly addressService: AddressService,
    private readonly backService: BankService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, sort, order }: ListOptions<Collaborator>) {
    return from(
      this.collaboratorRepository.paginate({
        page,
        per_page,
        sort,
        order,
        context: { populate: '[phones, addresses, user, bank]' },
      }),
    ).pipe(
      map(({ total, results: data }) =>
        PaginationObject<Collaborator>({
          data,
          total,
          page,
          per_page,
          route: '/collaborators',
        }),
      ),
    );
  }

  list({ sort, order }: ListOptions<Collaborator>) {
    return from(
      this.collaboratorRepository.list({
        sort,
        order,
        context: { populate: '[phones, addresses, user, bank]' },
      }),
    ).pipe(map((collaborators) => collaborators));
  }

  get(id: string) {
    return from(
      this.collaboratorRepository
        .getBy(['id'], id, { populate: '[phones, addresses, user, bank]' })
        .pipe(
          map((collaborator) => {
            if (!collaborator)
              throw new NotFoundException(
                this.i18nService.t('exception.not_found', {
                  args: {
                    entity: this.i18nService.t('model.collaborator.entity'),
                  },
                }),
              );

            return collaborator;
          }),
        ),
    );
  }

  create({ phones, addresses, user, bank, ...data }: CreateCollaboratorDto) {
    const user$ = from(
      this.userService.create({
        ...user,
        password: user.password ? user.password : data.cpf.replace(/\D/g, ''),
        role: RoleType.COLLABORATOR,
      }),
    );

    const collaborator$ = user$.pipe(
      switchMap((user) => {
        return from(
          this.collaboratorRepository.create({
            ...data,
            user_id: user.id,
          }),
        );
      }),
    );

    return forkJoin([user$, collaborator$]).pipe(
      switchMap(([_, collaborator]) => {
        const phones$ = from(this.phoneService.createMany(phones)).pipe(
          switchMap((phones) =>
            this.syncPhones(
              collaborator,
              phones.map((phone) => phone.id),
            ),
          ),
        );

        const addresses$ = from(this.addressService.createMany(addresses)).pipe(
          switchMap((addresses) =>
            this.syncAddresses(
              collaborator,
              addresses.map((address) => address.id),
            ),
          ),
        );

        const bank$ = from(
          this.backService.create({
            ...bank,
            collaborator_id: collaborator.id,
          }),
        ).pipe(map((bank) => this.syncBank(collaborator, bank.id)));

        return forkJoin([phones$, addresses$, bank$]).pipe(
          switchMap(() => this.get(collaborator.id)),
        );
      }),
      catchError((error) => {
        Logger.error(error, 'CollaboratorService.create');
        const destroyUser$ = user$.pipe(
          switchMap((user) => this.userService.destroy(user.id)),
        );

        return forkJoin([destroyUser$]).pipe(
          switchMap(() =>
            of(
              new HttpException(
                this.i18nService.t('exception.internal_server_error'),
                500,
              ),
            ),
          ),
        );
      }),
    );
  }

  update(
    id: string,
    { phones, addresses, bank, ...data }: UpdateCollaboratorDto,
  ) {
    return this.get(id).pipe(
      switchMap((collaborator) => {
        const collaborator$ = from(
          this.collaboratorRepository.update(collaborator, data),
        ).pipe(map(() => collaborator));

        const phones$ = from(this.phoneService.createMany(phones)).pipe(
          switchMap((phones) =>
            this.syncPhones(
              collaborator,
              phones.map((phone) => phone.id),
            ),
          ),
        );

        const addresses$ = from(this.addressService.createMany(addresses)).pipe(
          switchMap((addresses) =>
            this.syncAddresses(
              collaborator,
              addresses.map((address) => address.id),
            ),
          ),
        );

        const bank$ = from(
          this.backService.create({
            ...bank,
            collaborator_id: collaborator.id,
          }),
        ).pipe(map((bank) => this.syncBank(collaborator, bank.id)));

        const user$ = collaborator$.pipe(
          switchMap((collaborator) => {
            return from(
              this.userService.update(collaborator.user_id, data.user),
            ).pipe(map(() => collaborator));
          }),
        );

        return forkJoin([
          collaborator$,
          phones$,
          addresses$,
          bank$,
          user$,
        ]).pipe(switchMap(() => this.get(id)));
      }),
    );
  }

  remove(id: string) {
    return this.get(id).pipe(
      switchMap((collaborator) => {
        return from(
          this.collaboratorRepository.update(collaborator, {
            deleted_at: DateTime.local().toISO(),
          }),
        ).pipe(map(() => collaborator));
      }),
    );
  }

  syncPhones(collaborator: Collaborator, phonesIds: string[]) {
    return from(collaborator.$relatedQuery('phones').unrelate()).pipe(
      switchMap(() =>
        from(collaborator.$relatedQuery('phones').relate(phonesIds)),
      ),
    );
  }

  syncAddresses(collaborator: Collaborator, addressesIds: string[]) {
    return from(collaborator.$relatedQuery('addresses').unrelate()).pipe(
      switchMap(() =>
        from(collaborator.$relatedQuery('addresses').relate(addressesIds)),
      ),
    );
  }

  syncBank(collaborator: Collaborator, bankId: string) {
    return from(collaborator.$relatedQuery('bank').unrelate()).pipe(
      switchMap(() => from(collaborator.$relatedQuery('bank').relate(bankId))),
    );
  }
}
