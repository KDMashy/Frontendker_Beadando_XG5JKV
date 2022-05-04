import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { SessionSerializer } from './utils/session.serializer';
import { LocalStrategy } from './utils/strategy/local.strategy';

@Module({
    imports: [
        UserModule,
      ],
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        SessionSerializer,
      ],
      exports: [AuthService],
})
export class AuthModule {}
