import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
    IsDateString,
    IsEnum,
    IsNumber,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class SearchQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fromCountry?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fromCity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fromArea?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toCountry?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toCity?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toArea?: string;

  @ApiPropertyOptional({ description: 'Filter by specific date' })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiPropertyOptional({ enum: ['car', 'bus', 'train', 'flight'] })
  @IsOptional()
  @IsEnum(['car', 'bus', 'train', 'flight'])
  transportPreference?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ description: 'Sort criteria. Example: -createdAt' })
  @IsOptional()
  @IsString()
  sort?: string = '-createdAt';
}
