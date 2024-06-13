import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';
export class CreateCustomersDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @IsPhoneNumber()
  readonly phone: string;
}
export class UpdateCustomerDto extends PartialType(CreateCustomersDto) {}
