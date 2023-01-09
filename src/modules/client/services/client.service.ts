import { Injectable, NotFoundException } from '@nestjs/common';
import { forkJoin, from, map, switchMap } from 'rxjs';
import { DateTime } from 'luxon';
import { I18nService } from 'nestjs-i18n';

import { PaginationObject } from '@lib/pagination';
import { ListOptions } from '@common/interfaces/base-repository.interface';
import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';

import { ClientRepository } from '@modules/client/repositories/client.repository';
import { CreateClientDto, UpdateClientDto } from '@modules/client/dto';
import { Client } from '@modules/client/entities/client.entity';
import { RoleService } from '@modules/role/services/role.service';
import { UserService } from '@modules/user/services/user.service';
import { PhoneService } from '@modules/phone/services/phone.service';
import { AddressService } from '@modules/address/services/address.service';

@Injectable()
export class ClientService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
    private readonly phoneService: PhoneService,
    private readonly addressService: AddressService,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, sort, order }: ListOptions<Client>) {
    return from(
      this.clientRepository
        .paginate({
          page,
          per_page,
          sort,
          order,
          context: { populate: '[phones, addresses]' },
        })
        .pipe(
          map(({ total, results: data }) =>
            PaginationObject<Client>({
              data,
              total,
              page,
              per_page,
              route: '/clients',
            }),
          ),
        ),
    );
  }

  list({ sort, order }: ListOptions<Client>) {
    return from(
      this.clientRepository.list({
        sort,
        order,
        context: { populate: '[phones, addresses]' },
      }),
    ).pipe(map((clients) => clients));
  }

  get(id: string) {
    return from(
      this.clientRepository.getBy(['id'], id, {
        populate: '[phones, addresses]',
      }),
    ).pipe(
      map((client) => {
        if (!client)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: {
                entity: this.i18nService.t('model.client.entity'),
              },
            }),
          );

        return client;
      }),
    );
  }

  create({ phones, addresses, ...data }: CreateClientDto) {
    const client$ = from(this.clientRepository.create(data));

    const phones$ = from(this.phoneService.createMany(phones));
    const addresses$ = from(this.addressService.createMany(addresses));

    return forkJoin([client$, phones$, addresses$]).pipe(
      switchMap(([client, phones, addresses]) => {
        return forkJoin([
          this.syncPhones(
            client,
            phones.map((phone) => phone.id),
          ),
          this.syncAddresses(
            client,
            addresses.map((address) => address.id),
          ),
        ]).pipe(switchMap(() => this.get(client.id)));
      }),
    );
  }

  update(id: string, { phones, addresses, ...data }: UpdateClientDto) {
    return this.get(id).pipe(
      switchMap((client) => {
        const phones$ = from(this.phoneService.createMany(phones));
        const addresses$ = from(this.addressService.createMany(addresses));

        return forkJoin([phones$, addresses$]).pipe(
          switchMap(([phones, addresses]) => {
            return forkJoin([
              from(
                this.clientRepository.update(client, {
                  ...data,
                }),
              ),
              this.syncPhones(
                client,
                phones.map((phone) => phone.id),
              ),
              this.syncAddresses(
                client,
                addresses.map((address) => address.id),
              ),
            ]).pipe(switchMap(() => this.get(client.id)));
          }),
        );
      }),
    );
  }

  remove(id: string) {
    return this.get(id).pipe(
      switchMap((client) => {
        return from(
          this.clientRepository.update(client, {
            is_deleted: true,
            deleted_at: DateTime.local().toISO(),
          }),
        ).pipe(map((client) => client));
      }),
    );
  }

  syncPhones(client: Client, phonesIds: string[]) {
    return from(client.$relatedQuery('phones').delete()).pipe(
      switchMap(() => {
        return from(client.$relatedQuery('phones').relate(phonesIds));
      }),
    );
  }

  syncAddresses(client: Client, addressesIds: string[]) {
    return from(client.$relatedQuery('addresses').delete()).pipe(
      switchMap(() => {
        return from(client.$relatedQuery('addresses').relate(addressesIds));
      }),
    );
  }
}
