import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './modules/config/db.config';
import { ProjectModule } from './modules/projects/project.module';
import { SessionModule } from './modules/typeorm/session.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    ProjectModule,
    AuthModule,
    SessionModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({
      session: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
