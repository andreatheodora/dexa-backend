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
  @IsOptional()
  position: string;

  @IsString()
  @IsOptional()
  division: string;

  @IsNumber()
  @IsOptional()
  salary_gross: number;

  @IsString()
  @IsOptional()
  address_line1: string;

  @IsString()
  @IsOptional()
  address_line2?: string;

  @IsString()
  @IsOptional()
  city: string;

  @IsString()
  @IsOptional()
  province: string;

  @IsNumberString()
  @IsOptional()
  postal_code: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsBoolean()
  @IsNotEmpty()
  is_hr: boolean;
}
