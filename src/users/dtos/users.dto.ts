import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';
export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User email' })
  readonly email: string;

  @IsString()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  readonly role: string;
}
export class UpdateUserDto extends PartialType(CreateUsersDto) {}
