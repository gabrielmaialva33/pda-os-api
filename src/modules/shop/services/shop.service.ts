import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';
import * as crypto from 'crypto';

import { ListOptions } from '@common/interfaces/base-repository.interface';
import { PaginationObject } from '@lib/pagination';

import { CreateShopDto, UpdateShopDto } from '@modules/shop/dto';
import { ShopRepository } from '@modules/shop/repositories/shop.repository';
import { Shop } from '@modules/shop/entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepository: ShopRepository,
    private readonly i18nService: I18nService,
  ) {}

  paginate({ page, per_page, search, sort, order }: ListOptions<Shop>) {
    return from(
      this.shopRepository.paginate({
        page,
        per_page,
        search,
        sort,
        order,
      }),
    ).pipe(
      map(({ total, results: data }) =>
        PaginationObject<Shop>({
          data,
          total,
          page,
          per_page,
          route: '/shops',
        }),
      ),
    );
  }

  list({ sort, order }: ListOptions<Shop>) {
    return from(this.shopRepository.list({ sort, order })).pipe(
      map((shops) => shops),
    );
  }

  get(id: string) {
    return from(this.shopRepository.getBy(['id'], id)).pipe(
      map((shop) => {
        if (!shop)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: {
                entity: this.i18nService.t('model.shop.entity'),
              },
            }),
          );

        return shop;
      }),
    );
  }

  create(data: CreateShopDto) {
    return from(
      this.shopRepository.create({
        ...data,
        code: crypto.randomBytes(4).toString('hex').toUpperCase(),
      }),
    ).pipe(switchMap((shop) => this.get(shop.id)));
  }

  update(id: string, data: UpdateShopDto) {
    return this.get(id).pipe(
      switchMap((shop) => shop.$query().patchAndFetch(data)),
    );
  }

  remove(id: string) {
    return this.get(id).pipe(
      switchMap((shop) =>
        shop.$query().patchAndFetch({
          is_deleted: true,
          deleted_at: DateTime.local().toISO(),
        }),
      ),
    );
  }
}
