import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { jwtConstants } from './utils/constants/constants';
import { SessionSerializer } from './utils/session.serializer';
import { JwtStrategy } from './utils/strategy/jwt.strategy';
import { LocalStrategy } from './utils/strategy/local.strategy';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: {expiresIn: '3600000s'},
        })
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        SessionSerializer,
      ],
      exports: [AuthService],
})
export class AuthModule {}
