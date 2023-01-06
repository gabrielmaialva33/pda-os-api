import { PartialType } from '@nestjs/mapped-types';
import { CreateSignatureDto } from './create-signature.dto';

export class UpdateSignatureDto extends PartialType(CreateSignatureDto) {}
