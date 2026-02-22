import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { VerifyOtpDto } from '../otp/dto/otp.dto';
import { OtpService } from '../otp/otp.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly otpService: OtpService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async verifyOtpAndLogin(verifyOtpDto: VerifyOtpDto) {
    const { type, identifier, otp, name } = verifyOtpDto;

    try {
      // 1. Verify OTP
      await this.otpService.verifyOtp(type, identifier, otp);

      // 2. Find or Create User
      let user = await this.usersService.findByIdentifier(type, identifier);

      if (!user) {
        if (!name) {
          throw new BadRequestException(
            'Name is required for new user registration',
          );
        }
        user = await this.usersService.createUser({ type, identifier, name });
      }

      // Update last activity
      await this.usersService.updateLastActive(user._id.toString());

      // 3. Generate Tokens
      return this.generateTokens(user);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('[verifyOtpAndLogin Error]', error);
      throw error;
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const secret = this.configService.get<string>('JWT_REFRESH_SECRET');
      const payload = this.jwtService.verify(refreshToken, { secret });

      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      await this.usersService.updateLastActive(user._id.toString());
      return this.generateTokens(user);
    } catch (e) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  private async generateTokens(user: any) {
    const payload = { sub: user._id, email: user.email, phone: user.phone };

    // We get expiration times from .env but also need them directly for different secrets
    const accessTokenOptions = {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_ACCESS_EXPIRATION',
        '5m',
      ) as any,
    };

    const refreshTokenOptions = {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get<string>(
        'JWT_REFRESH_EXPIRATION',
        '7d',
      ) as any,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, accessTokenOptions),
      this.jwtService.signAsync(payload, refreshTokenOptions),
    ]);

    // Returning user without sensitive internal mongo fields using lean simulation
    const userToReturn = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
    };

    return {
      accessToken,
      refreshToken,
      user: userToReturn,
    };
  }
}
