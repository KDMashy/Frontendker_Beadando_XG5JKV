import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/utils/guards/jwt.guard';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateProjectDto } from '../dto/project.dto';
import { ProjectService } from '../service/project.service';

@Controller('project')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
    ) {}
    
    @UseGuards(JwtAuthGuard)
    @Get('myprojects')
    @HttpCode(200)
    GetAllProjects(@Req() req){
        return this.projectService.getProjects(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    @HttpCode(202)
    CreateProject(
        @Body() project: CreateProjectDto,
        @Req() req){
        return this.projectService.createProject(project, req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('remove/:name')
    @HttpCode(200)
    DeleteProject(
        @Param('name') name: string,
        @Req() req){
        return this.projectService.deleteProject(name, req.user);
    }
}
