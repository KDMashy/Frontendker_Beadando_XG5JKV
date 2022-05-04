import { Project } from "src/modules/projects/entity/project.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    username: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    email: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    password: string;

    @OneToMany(() => Project, (project) => project.userid)
    projects: Project[];
}