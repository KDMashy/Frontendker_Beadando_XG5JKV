import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../config/database.module';
import { ProjectController } from './controller/project.controller';
import { Project } from './entity/project.entity';
import { ProjectService } from './service/project.service';

@Module({
    imports: [TypeOrmModule.forFeature([Project])],
    providers: [ProjectService],
    controllers: [ProjectController],
    exports: [ProjectService],
})
export class ProjectModule {}
