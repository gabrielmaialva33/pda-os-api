import { BaseRepository } from '@common/repositories/base.repository';
import { Shop } from '@modules/shop/entities/shop.entity';

export class ShopRepository extends BaseRepository<Shop> {
  constructor() {
    super(Shop);
  }
}
