import { Sequelize } from "sequelize-typescript"
import { Project } from "../projects/entity/project.entity";
import { SessionEntity } from "../typeorm/session.entity";
import { User } from "../user/entity/user.entity";


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'mash',
                database: 'foxprojects',
            });
            sequelize.addModels([
                // User,
                // SessionEntity,
                // Project
            ]);
            await sequelize.sync();
            return sequelize;
        }
    }
]