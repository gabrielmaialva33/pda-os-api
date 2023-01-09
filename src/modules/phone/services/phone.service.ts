import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';

import { PaginationObject } from '@lib/pagination';
import { ListOptions } from '@common/interfaces/base-repository.interface';
import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';

import { CreatePhoneDto, UpdatePhoneDto } from '@modules/phone/dto';
import { Phone } from '@modules/phone/entities/phone.entity';
import { PhoneRepository } from '@modules/phone/repositories/phone.repository';

@Injectable()
export class PhoneService {
  constructor(
    private readonly phoneRepository: PhoneRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, order, sort }: ListOptions<Phone>) {
    return from(
      this.phoneRepository.paginate({ page, per_page, order, sort }),
    ).pipe(
      map(({ total, results }) =>
        PaginationObject<Phone>({
          data: results,
          total,
          page,
          per_page,
          route: '/phones',
        }),
      ),
    );
  }

  list({ sort, order }: ListOptions<Phone>) {
    return from(this.phoneRepository.list({ sort, order })).pipe(
      map((phones) => phones),
    );
  }

  get(id: string) {
    return from(
      this.phoneRepository.getBy(['id'], id, {
        populate: '[collaborators]',
      }),
    ).pipe(
      map((phone) => {
        if (!phone)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.phone.entity') },
            }),
          );

        return phone;
      }),
    );
  }

  create(data: CreatePhoneDto) {
    return from(this.phoneRepository.create(data)).pipe(map((phone) => phone));
  }

  createMany(data: CreatePhoneDto[]) {
    return from(this.phoneRepository.createMany(data)).pipe(
      map((phones) => phones),
    );
  }

  update(id: string, data: UpdatePhoneDto) {
    return this.get(id).pipe(
      switchMap((phone) =>
        from(this.phoneRepository.update(phone, data)).pipe(map(() => phone)),
      ),
    );
  }

  remove(id: string) {
    return this.get(id).pipe(
      switchMap((phone) =>
        from(
          this.phoneRepository.update(phone, {
            is_deleted: true,
            deleted_at: DateTime.local().toISO(),
          }),
        ).pipe(map(() => phone)),
      ),
    );
  }
}
