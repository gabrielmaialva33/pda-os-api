import { Injectable, NotFoundException } from '@nestjs/common';
import { from, map, switchMap } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { DateTime } from 'luxon';

import { PaginationObject } from '@lib/pagination';
import { ListOptions } from '@common/interfaces/base-repository.interface';

import { CreateSignatureDto, UpdateSignatureDto } from '@modules/signature/dto';
import { SignatureRepository } from '@modules/signature/repositories/signature.repository';
import { Signature } from '@modules/signature/entities/signature.entity';

@Injectable()
export class SignatureService {
  constructor(
    private readonly signatureRepository: SignatureRepository,
    private readonly i18nService: I18nService,
  ) {}

  paginate({ page, per_page, search, sort, order }: ListOptions<Signature>) {
    return from(
      this.signatureRepository
        .paginate({
          page,
          per_page,
          search,
          sort,
          order,
        })
        .pipe(
          map(({ total, results: data }) =>
            PaginationObject<Signature>({
              total,
              data,
              page,
              per_page,
              route: '/signatures',
            }),
          ),
        ),
    );
  }

  get(id: string) {
    return from(this.signatureRepository.getBy(['id'], id)).pipe(
      map((signature) => {
        if (!signature)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.signature.entity') },
            }),
          );

        return signature;
      }),
    );
  }

  create(data: CreateSignatureDto) {
    return from(this.signatureRepository.create(data)).pipe(
      map((signature) => signature),
    );
  }

  update(id: string, data: UpdateSignatureDto) {
    return this.get(id).pipe(
      switchMap((signature) => {
        if (!signature)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.signature.entity') },
            }),
          );

        return from(this.signatureRepository.update(signature, data)).pipe(
          map((signature) => signature),
        );
      }),
    );
  }

  remove(id: string) {
    return this.get(id).pipe(
      switchMap((signature) => {
        if (!signature)
          throw new NotFoundException(
            this.i18nService.t('exception.not_found', {
              args: { entity: this.i18nService.t('model.signature.entity') },
            }),
          );

        return from(
          this.signatureRepository.update(signature, {
            is_deleted: true,
            deleted_at: DateTime.local().toISO(),
          }),
        ).pipe(map((signature) => signature));
      }),
    );
  }
}
