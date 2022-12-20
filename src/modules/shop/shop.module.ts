import { Module } from '@nestjs/common';
import { OrmModule } from '@lib/orm/orm.module';

import { ShopService } from '@modules/shop/services/shop.service';
import { ShopController } from '@modules/shop/controllers/shop.controller';
import { ShopRepository } from '@modules/shop/repositories/shop.repository';

@Module({
  imports: [OrmModule],
  controllers: [ShopController],
  providers: [ShopService, ShopRepository],
})
export class ShopModule {}
