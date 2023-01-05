import { from, map, Observable } from 'rxjs';

import { BaseRepository } from '@common/repositories/base.repository';

import { ITokenRepository } from '@modules/token/interfaces/token.interface';
import { User } from '@modules/user/entities/user.entity';
import { Token } from '@modules/token/entities/token.entity';
import { TokenType } from '@modules/token/enum/token-type.enum';
import { DateTime } from 'luxon';

export class TokenRepository
  extends BaseRepository<Token>
  implements ITokenRepository
{
  constructor() {
    super(Token);
  }

  revoke(user: User, type: TokenType): Observable<boolean> {
    return from(
      this.orm
        .query()
        .where({ user_id: user.id, type })
        .update({
          is_revoked: true,
        } as Partial<Token>),
    ).pipe(map((result) => result > 0));
  }

  validate(token: string, type: TokenType): Observable<Token> {
    return from(
      this.orm
        .query()
        .where({ token, type })
        .andWhere('expires_at', '>', DateTime.local().toISO())
        .andWhere('is_revoked', false)
        .first(),
    ).pipe(map((result) => result as Token));
  }
}
