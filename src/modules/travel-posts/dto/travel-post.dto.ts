import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTravelPostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fromLocation: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  toLocation: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  area?: string;

  @ApiPropertyOptional({ description: 'Longitude' })
  @IsOptional()
  @IsNumber()
  longitude?: number;

  @ApiPropertyOptional({ description: 'Latitude' })
  @IsOptional()
  @IsNumber()
  latitude?: number;

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
  fromDate: string;

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
