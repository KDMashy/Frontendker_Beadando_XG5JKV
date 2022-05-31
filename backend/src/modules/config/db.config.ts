import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: true

    // type: 'mysql',
    // host: 'localhost',
    // port: 3306,
    // username: 'root',
    // password: 'mash',
    // database: 'foxprojects',
    // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    // synchronize: true,
}