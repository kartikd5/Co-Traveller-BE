import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, ValidateIf } from 'class-validator';

export class SendOtpDto {
  @ApiProperty({ enum: ['email', 'phone'], description: 'Type of identifier' })
  @IsEnum(['email', 'phone'])
  @IsNotEmpty()
  type: 'email' | 'phone';

  @ApiProperty({ description: 'Email address or Phone number based on type' })
  @ValidateIf(o => o.type === 'email')
  @IsEmail()
  @IsNotEmpty()
  @ValidateIf(o => o.type === 'phone')
  @IsPhoneNumber()
  @IsNotEmpty()
  identifier: string;
}

export class VerifyOtpDto {
  @ApiProperty({ enum: ['email', 'phone'] })
  @IsEnum(['email', 'phone'])
  @IsNotEmpty()
  type: 'email' | 'phone';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  identifier: string;

  @ApiProperty({ description: '6 digit OTP' })
  @IsString()
  @IsNotEmpty()
  otp: string;

  @ApiProperty({ description: 'Provide name during signup if User is new', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}
