import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from '../core/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../core/strategies/jwt.strategy';
import { GoogleStrategy } from '../core/strategies/google.strategy';
import { FacebookStrategy } from '../core/strategies/facebook.strategy';

@Module({
  imports: [
    PassportModule, 
    UsersModule,
    JwtModule.register({
      secret: process.env.JWTKEY,
      signOptions: {expiresIn: process.env.TOKEN_EXPIRATION}
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy, FacebookStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
