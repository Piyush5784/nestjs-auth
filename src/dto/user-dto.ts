import { Optional } from '@nestjs/common';
import { IsEmail, IsString, Length, MaxLength } from 'class-validator';

export class registerUserDto {
  @IsEmail()
  @MaxLength(50)
  email: string;

  @IsString()
  @Length(6, 50)
  password: string;

  @IsString()
  @MaxLength(50)
  username: string;
}

export class loginUserDto {
  @IsString()
  @MaxLength(50)
  username: string;

  @IsString()
  @Length(6, 50)
  password: string;
}
