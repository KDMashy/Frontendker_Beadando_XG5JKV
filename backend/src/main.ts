import { NestFactory } from '@nestjs/core';
import { TypeormStore } from 'connect-typeorm/out';
import * as passport from 'passport';
import * as session from 'express-session';
import { getRepository } from 'typeorm';
import { AppModule } from './app.module';
import { SessionEntity } from './modules/typeorm/session.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = getRepository(SessionEntity);
  app.use(session({
    name: 'FOX_PROJECTS',
    secret: 'DefinietlyNotForFoxesAndProjectsSavedFromGitHub',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 6000000,
    },
    store: new TypeormStore().connect(sessionRepository),
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors();
  await app.listen(3069);
}
bootstrap();
