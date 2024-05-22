import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
export class UpdateUserDto extends PartialType(CreateUsersDto) {}
