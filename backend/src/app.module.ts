import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './modules/config/db.config';
import { ProjectModule } from './modules/projects/project.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    AuthModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    PassportModule.register({
      session: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
