import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
    Unique
} from 'typeorm';
import { User } from './User';
import { Country } from './Country';
import { Application } from './Application';
import { Gender } from '@dvld/shared/src/types/person';
import { Driver } from './Driver';

@Unique('UQ_full_name', ['first_name', 'second_name', 'third_name', 'last_name'])
@Entity()
export class Person extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => User,
        user => user.person
    )
    user: User

    @Column()
    first_name: string;

    @Column()
    second_name: string;

    @Column()
    third_name: string;
    
    @Column()
    last_name: string;

    get full_name() {
        return `${this.first_name} ${this.second_name} ${this.third_name} ${this.last_name}`;
    }

    @Column({ unique: true, length: 4 })  // length 4 for development
    national_id: string;

    @Column()
    date_of_birth: Date;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;

    @Column()
    address: string;

    @Column({ length: 11, unique: true })
    phone_number: string;

    @Column({ unique: true})
    email: string;

    @ManyToOne(
        () => Country,
        country => country.persons,
        { onDelete: 'RESTRICT', nullable: false }
    )
    @JoinColumn({ name: 'country_id' })
    national_country: Country;

    @Column({ nullable: true })
    personal_photo: string;

    @OneToMany(
        () => Application,
        application => application.person
    )
    applications: Application[];

    @OneToOne(
        () => Driver,
        driver => driver.person
    )
    driver: Driver;
}