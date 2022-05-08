import { Body, Controller, Delete, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { serializeUser } from 'passport';
import { JwtAuthGuard } from 'src/modules/auth/utils/guards/jwt.guard';
import { AuthenticatedGuard } from 'src/modules/auth/utils/guards/local.guard';
import { CreateUserDto } from '../dto/user.dto';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {}

    @Post('register')
    @HttpCode(201)
    CreateUser(@Body() user: CreateUserDto){
        return this.userService.CreateUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @HttpCode(200)
    GetUserProfile(@Req() req) {
        return this.userService.GetProfile(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    @HttpCode(202)
    DeleteUserById(@Req() req) {
        return this.userService.DeleteUser(req.user.id);
    }
}