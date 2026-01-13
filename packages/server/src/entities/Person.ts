import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { User } from './User';
import { Country } from './Country';
import { Application } from './Application';
import { Gender } from '@dvld/shared/src/types/person';

@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => User,
        user => user.person,
        { onDelete: 'SET NULL', nullable: true }
    )
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column()
    first_name: string;

    @Column()
    second_name: string;

    @Column()
    third_name: string;
    
    @Column()
    last_name: string;

    @Column({ unique: true, length: 4 })  // length 4 for development
    national_id: string;

    @Column()
    date_of_birth: Date;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;

    @Column()
    address: string;

    @Column({ length: 11 })
    phone_number: string;

    @Column()
    email: string;

    @ManyToOne(
        () => Country,
        country => country.persons,
        { onDelete: 'RESTRICT' }
    )
    @JoinColumn({ name: 'country_id' })
    national_country: Country;

    @Column({ nullable: true })
    personal_photo: string;

    @OneToMany(
        () => Application,
        application => application.person
    )
    applications: Application[]
}