import { User } from "src/modules/user/entity/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('projects')
export class Project extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    projname: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    projown: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    projlang: string;

    @Column({
        type: 'varchar',
        nullable: false,
    })
    projurl: string;

    @ManyToOne(() => User, (user) => user.projects)
    userid: number;
}