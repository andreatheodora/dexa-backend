import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsBoolean,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  @IsString()
  @IsNotEmpty()
  division: string;

  @IsNumber()
  @IsNotEmpty()
  salary_gross: number;

  @IsString()
  @IsNotEmpty()
  address_line1: string;

  @IsString()
  @IsOptional()
  address_line2?: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  province: string;

  @IsNumberString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  is_hr: boolean;
}
