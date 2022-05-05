import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'os';
import { User } from 'src/modules/user/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from '../dto/project.dto';
import { Project } from '../entity/project.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project)
        private projectModel: Repository<Project>
    ) {}

    async getPublicList(){
        return await this.projectModel.find({
            relations: ['userid']
        })
    }

    async getProjects(user: User){
        return await this.projectModel.find({
            where: { userid: user.id }
        });
    }
    
    async getOneProject(id: number){
        return await this.projectModel.findOne({ 
            where: { id: id } 
        });
    }

    async createProject(project: CreateProjectDto, user: User){
        if(
            project.projname.length > 0 &&
            project.projown.length > 0 &&
            project.projlang.length > 0 &&
            project.projurl.length > 0
        ) {
            const findProj = await this.projectModel.findOne({ 
                where: { projurl: project.projurl, userid: user.id }
            });
            if(findProj){
                throw new HttpException({
                    message: 'Project already exists for this user',
                    status: HttpStatus.CONFLICT,
                }, HttpStatus.CONFLICT);
            }
            const newProj = {
                projname: project.projname,
                projown: project.projown,
                projlang: project.projlang,
                projurl: project.projurl,
                userid: user.id
            };
            const prepare = await this.projectModel.create(newProj);
            prepare.save();
            return prepare;
        } else {
            throw new HttpException({
                message: 'Project cant be created, invalid data given',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
    }

    async deleteProject(id: number, user: User){
        try{
            const findProj = await this.projectModel.find({
                where: { userid: user.id },
            });
            if (findProj){
                await this.projectModel
                    .createQueryBuilder()
                    .delete()
                    .from(Project)
                    .where("id = :id", { id: id})
                    .execute();
                return HttpStatus.OK;
            }
            throw new HttpException({
                message: 'Project cant be deleted, or something went wrong',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        } catch(err){
            throw new HttpException({
                message: 'Project cant be deleted, or something went wrong',
                status: HttpStatus.CONFLICT,
            }, HttpStatus.CONFLICT);
        }
    }
}
