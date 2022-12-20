import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';

import { PaginationObject } from '@lib/pagination';
import { I18nTranslations } from '@/resources/i18n/generated/i18n.generated';

import { CreateBankDto, UpdateBankDto } from '@modules/bank/dto';
import { BankRepository } from '@modules/bank/repositories/bank.repository';
import { ListOptions } from '@common/interfaces/base-repository.interface';
import { Bank } from '@modules/bank/entities/bank.entity';
import { DateTime } from 'luxon';

@Injectable()
export class BankService {
  constructor(
    private readonly bankRepository: BankRepository,
    private readonly i18nService: I18nService<I18nTranslations>,
  ) {}

  paginate({ page, per_page, sort, order }: ListOptions<Bank>) {
    return from(
      this.bankRepository.paginate({ page, per_page, sort, order }),
    ).pipe(
      map(({ total, results: data }) =>
        PaginationObject<Bank>({
          data,
          total,
          page,
          per_page,
          route: '/banks',
        }),
      ),
    );
  }

  list({ sort, order }: ListOptions<Bank>) {
    return from(this.bankRepository.list({ sort, order })).pipe(
      map((banks) => banks),
    );
  }

  get(id: string) {
    return from(this.bankRepository.getBy(['id'], id)).pipe(
      map((bank) => {
        if (!bank)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.bank.entity') },
            }),
          );

        return bank;
      }),
    );
  }

  create(data: CreateBankDto) {
    return from(this.bankRepository.create(data)).pipe(map((bank) => bank));
  }

  update(id: string, data: UpdateBankDto) {
    return this.get(id).pipe(
      switchMap((bank) => from(this.bankRepository.update(bank.id, data))),
    );
  }

  remove(id: string) {
    return this.get(id).pipe(
      switchMap((bank) =>
        from(
          this.bankRepository.update(bank.id, {
            is_deleted: true,
            deleted_at: DateTime.local().toISO(),
          }),
        ),
      ),
    );
  }
}
