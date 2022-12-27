import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateUserDto {
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
