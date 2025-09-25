import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class FetchAttendanceDto {
  @IsOptional()
  @IsString()
  user_document_no?: string;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsInt()
  month?: number;

  @IsOptional()
  @IsInt()
  day?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  count?: number;
}
