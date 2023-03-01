import { IsEmail, IsNotEmpty } from 'class-validator';

export class AddAccountDto {
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
