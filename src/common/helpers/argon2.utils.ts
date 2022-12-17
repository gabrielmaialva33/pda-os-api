import * as argon2 from 'argon2';
import { from, Observable } from 'rxjs';

export const Argon2Utils = {
  hash: async (password: string): Promise<string> => {
    return await argon2.hash(password, { saltLength: 32 });
  },

  verify: (hash: string, password: string): Observable<boolean> => {
    return from(argon2.verify(hash, password));
  },
};
