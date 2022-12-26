import * as argon2 from 'argon2';
import { from, map } from 'rxjs';

export const Argon2Utils = {
  hash: async (password: string): Promise<string> => {
    return await argon2.hash(password, { saltLength: 32 });
  },

  verify: (hash: string, password: string) => {
    return from(argon2.verify(hash, password)).pipe(map((isValid) => isValid));
  },
};
