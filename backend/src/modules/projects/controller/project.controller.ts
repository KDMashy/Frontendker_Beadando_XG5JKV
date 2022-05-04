import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateProjectDto } from '../dto/project.dto';
import { ProjectService } from '../service/project.service';

@Controller('project')
export class ProjectController {
    constructor(
        private readonly projectService: ProjectService,
    ) {}

    @UseGuards(AuthenticatedGuard)
    @Get('projects')
    @HttpCode(200)
    GetAllProjects(@Req() req){
        return this.projectService.getProjects(req.user);
    }

    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    @HttpCode(200)
    GetOneProject(@Param('id', ParseIntPipe) id:number){
        return this.projectService.getOneProject(id);
    }

    @UseGuards(AuthenticatedGuard)
    @Post('create')
    @HttpCode(202)
    CreateProject(
        @Body() project: CreateProjectDto,
        @Req() req){
        return this.projectService.createProject(project, req.user);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('remove/:id')
    @HttpCode(200)
    DeleteProject(
        @Param('id', ParseIntPipe) id: number,
        @Req() req){
        return this.projectService.deleteProject(id, req.user);
    }
}
