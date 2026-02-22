import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    ArrayMinSize,
    IsArray,
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateTravelPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fromCountry: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fromCity: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fromArea?: string;

  @ApiPropertyOptional({ description: 'Longitude' })
  @IsOptional()
  @IsNumber()
  fromLongitude?: number;

  @ApiPropertyOptional({ description: 'Latitude' })
  @IsOptional()
  @IsNumber()
  fromLatitude?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  toCountry: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  toCity: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  toArea?: string;

  @ApiPropertyOptional({ description: 'Longitude' })
  @IsOptional()
  @IsNumber()
  toLongitude?: number;

  @ApiPropertyOptional({ description: 'Latitude' })
  @IsOptional()
  @IsNumber()
  toLatitude?: number;

  @ApiProperty({ enum: ['car', 'bus', 'train', 'flight'] })
  @IsEnum(['car', 'bus', 'train', 'flight'])
  @IsNotEmpty()
  transportPreference: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  preferredGender?: string;

  @ApiProperty({ description: 'ISO string of the date of travel' })
  @IsDateString()
  @IsNotEmpty()
  travelDate: string;

  @ApiPropertyOptional({ description: 'Time in HH:mm format' })
  @IsOptional()
  @IsString()
  timeRangeStart?: string;

  @ApiPropertyOptional({ description: 'Time in HH:mm format' })
  @IsOptional()
  @IsString()
  timeRangeEnd?: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  interests: string[];

  @ApiProperty({ description: 'Reason for travel/searching for a companion' })
  @IsNotEmpty()
  @IsString()
  reason: string;
}
