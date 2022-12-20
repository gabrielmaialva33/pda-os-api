import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { PaginationObject } from '@lib/pagination';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';

import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';

import { ListOptions } from '@common/interfaces/base-repository.interface';
import { CreateAddressDto, UpdateAddressDto } from '@modules/address/dto';
import { AddressRepository } from '@modules/address/repositories/address.repository';
import { Address } from '@modules/address/entities/address.entity';

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, sort, order }: ListOptions<Address>) {
    return from(
      this.addressRepository.paginate({
        page,
        per_page,
        sort,
        order,
      }),
    ).pipe(
      map(({ total, results: data }) =>
        PaginationObject<Address>({
          data,
          total,
          page,
          per_page,
          route: '/addresses',
        }),
      ),
    );
  }

  list({ sort, order }: ListOptions<Address>) {
    return from(this.addressRepository.list({ sort, order })).pipe(
      map((addresses) => addresses),
    );
  }

  get(id: string) {
    return from(this.addressRepository.getBy(['id'], id)).pipe(
      map((address) => {
        if (!address)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.address.entity') },
            }),
          );

        return address;
      }),
    );
  }

  create(data: CreateAddressDto) {
    return from(this.addressRepository.create(data)).pipe(
      switchMap((address) => this.get(address.id)),
    );
  }

  createMany(data: CreateAddressDto[]) {
    return from(this.addressRepository.createMany(data)).pipe(
      map((addresses) => addresses),
    );
  }

  update(id: string, data: UpdateAddressDto) {
    return this.get(id).pipe(
      switchMap((address) =>
        from(this.addressRepository.update(address.id, data)).pipe(
          switchMap(() => this.get(id)),
        ),
      ),
    );
  }

  remove(id: string) {
    return this.get(id).pipe(
      switchMap((address) =>
        from(
          this.addressRepository.update(address.id, {
            is_deleted: true,
            deleted_at: DateTime.local().toISO(),
          }),
        ),
      ),
    );
  }
}
