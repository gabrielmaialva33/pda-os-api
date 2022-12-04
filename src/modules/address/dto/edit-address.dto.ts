import { PartialType } from '@nestjs/mapped-types';

import { StoreAddressDto } from '@address/dto/store-address.dto';

export class EditAddressDto extends PartialType(StoreAddressDto) {}
