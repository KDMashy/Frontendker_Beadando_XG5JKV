import { IsNotEmpty } from 'class-validator';

export class CreateProjectDto {

    id?: number;

    @IsNotEmpty()
    projname: string;

    @IsNotEmpty()
    projown: string;

    @IsNotEmpty()
    projlang: string;

    @IsNotEmpty()
    projurl: string;

    userid?: number;
}