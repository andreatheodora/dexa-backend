import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsNumberString,
  MinLength,
  IsDateString,
  IsBoolean,
} from 'class-validator';

import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  position?: string;

  @IsOptional()
  @IsString()
  division?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  salary_gross?: number;

  @IsOptional()
  @IsString()
  address_line1?: string;

  @IsOptional()
  @IsString()
  address_line2?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsNumberString()
  postal_code?: string;

  @IsOptional()
  @IsBoolean()
  is_hr?: boolean;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
