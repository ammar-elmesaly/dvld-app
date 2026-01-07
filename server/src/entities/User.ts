import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';
import { Person } from './Person';
import { Application } from './Application';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => Person,
        person => person.user
    )
    person: Person;
    
    @OneToMany(
        () => Application,
        application => application.created_by_user
    )
    applications: Application[]
    
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    is_active: boolean;
}