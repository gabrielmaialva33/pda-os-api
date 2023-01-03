import { Observable } from 'rxjs';

import { IBaseRepository } from '@common/interfaces/base-repository.interface';

import { Token } from '@modules/token/entities/token.entity';
import { TokenType } from '@modules/token/enum/token-type.enum';
import { User } from '@modules/user/entities/user.entity';

export interface ITokenRepository extends IBaseRepository<Token> {
  revoke(user: User, type: TokenType): Observable<boolean>;

  validate(token: string, type: TokenType): Observable<Token>;
}
