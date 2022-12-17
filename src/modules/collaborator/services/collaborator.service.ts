import { Injectable, NotFoundException } from '@nestjs/common';
import { forkJoin, from, map, of, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';
import * as crypto from 'crypto';

import {
  CreateCollaboratorDto,
  UpdateCollaboratorDto,
} from '@modules/collaborator/dto';

import { PaginationObject } from '@lib/pagination';

import { ListOptions } from '@common/interfaces/base-repository.interface';
import { CollaboratorRepository } from '@modules/collaborator/repositories/collaborator.repository';
import { Collaborator } from '@modules/collaborator/entities/collaborator.entity';
import { UserService } from '@modules/user/services/user.service';
import { RoleService } from '@modules/role/services/role.service';
import { PhoneService } from '@modules/phone/services/phone.service';
import { AddressService } from '@modules/address/services/address.service';
import { BankService } from '@modules/bank/services/bank.service';

@Injectable()
export class CollaboratorService {
  constructor(
    private readonly collaboratorRepository: CollaboratorRepository,
    private readonly userService: UserService,
    private readonly rolesService: RoleService,
    private readonly phoneService: PhoneService,
    private readonly addressService: AddressService,
    private readonly backService: BankService,
    private readonly i18nService: I18nService,
  ) {}

  paginate({ page, per_page, sort, order }: ListOptions<Collaborator>) {
    return from(
      this.collaboratorRepository.paginate({
        page,
        per_page,
        sort,
        order,
        context: {
          populate: ['phones', 'addresses', 'user', 'bank'],
        },
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
        context: {
          populate: ['phones', 'addresses', 'user', 'bank'],
        },
      }),
    ).pipe(map((collaborators) => collaborators));
  }

  get(id: string) {
    return from(
      this.collaboratorRepository
        .getBy(['id'], id, {
          populate: ['phones', 'addresses', 'user', 'bank'],
        })
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
    const user$ = from(this.rolesService.getBy(['name'], 'collaborator')).pipe(
      switchMap((role) => {
        return this.userService.create({
          ...user,
          roles: [role.id],
        });
      }),
    );

    const collaborator$ = user$.pipe(
      switchMap((user) => {
        return from(
          this.collaboratorRepository.create({
            ...data,
            user_id: user.id,
            code: crypto.randomBytes(4).toString('hex').toUpperCase(),
          }),
        );
      }),
    );

    const phones$ = from(this.phoneService.createMany(phones));
    const addresses$ = from(this.addressService.createMany(addresses));

    return forkJoin([collaborator$, phones$, addresses$]).pipe(
      switchMap(([collaborator, phones, addresses]) => {
        from(
          this.backService.create({
            ...bank,
            collaborator_id: collaborator.id,
          }),
        ).subscribe();

        from(
          this.syncPhones(
            collaborator.id,
            phones.map((phone) => phone.id),
          ),
        ).subscribe();

        from(
          this.syncAddresses(
            collaborator.id,
            addresses.map((address) => address.id),
          ),
        ).subscribe();

        return of(collaborator);
      }),
    );
  }

  update(
    id: string,
    { phones, addresses, bank, ...data }: UpdateCollaboratorDto,
  ) {
    return this.get(id).pipe(
      switchMap((collaborator) => {
        from(collaborator.$relatedQuery('bank').delete())
          .pipe(
            switchMap(() =>
              this.backService.create({ ...bank, collaborator_id: id }),
            ),
          )
          .subscribe();

        if (phones && phones.length > 0) {
          from(this.phoneService.createMany(phones))
            .pipe(
              switchMap((phones) => {
                return this.syncPhones(
                  collaborator.id,
                  phones.map((phone) => phone.id),
                );
              }),
            )
            .subscribe();
        }

        if (addresses && addresses.length > 0) {
          from(this.addressService.createMany(addresses))
            .pipe(
              switchMap((addresses) => {
                return this.syncAddresses(
                  collaborator.id,
                  addresses.map((address) => address.id),
                );
              }),
            )
            .subscribe();
        }

        return this.collaboratorRepository.update(collaborator.id, {
          ...data,
        });
      }),
    );
  }

  remove(id: string) {
    return from(
      this.collaboratorRepository.update(id, {
        is_deleted: true,
        deleted_at: DateTime.local().toISO(),
      }),
    );
  }

  syncPhones(collaboratorId: string, phonesIds: string[]) {
    return this.get(collaboratorId).pipe(
      switchMap((collaborator) => {
        return from(collaborator.$relatedQuery('phones').delete()).pipe(
          switchMap(() =>
            collaborator.$relatedQuery('phones').relate(phonesIds),
          ),
        );
      }),
    );
  }

  syncAddresses(collaboratorId: string, addressesIds: string[]) {
    return this.get(collaboratorId).pipe(
      switchMap((collaborator) => {
        return from(collaborator.$relatedQuery('addresses').delete()).pipe(
          switchMap(() =>
            collaborator.$relatedQuery('addresses').relate(addressesIds),
          ),
        );
      }),
    );
  }
}
