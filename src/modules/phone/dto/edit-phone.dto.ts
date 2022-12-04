import { PartialType } from '@nestjs/mapped-types';
import { StorePhoneDto } from '@phone/dto/store-phone.dto';

export class EditPhoneDto extends PartialType(StorePhoneDto) {}
