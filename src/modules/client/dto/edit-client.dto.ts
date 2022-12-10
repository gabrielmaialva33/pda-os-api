import { PartialType } from '@nestjs/mapped-types';
import { StoreClientDto } from './store-client.dto';

export class EditClientDto extends PartialType(StoreClientDto) {}
