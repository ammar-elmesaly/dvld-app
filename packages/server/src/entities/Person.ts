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
import { User } from './User.js';
import { Country } from './Country.js';
import { Application } from './Application.js';
import { Gender } from '@dvld/shared';
import { Driver } from './Driver.js';

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

    @Column({ type: 'varchar' })
    first_name: string;

    @Column({ type: 'varchar' })
    second_name: string;

    @Column({ type: 'varchar' })
    third_name: string;
    
    @Column({ type: 'varchar' })
    last_name: string;

    get full_name() {
        return `${this.first_name} ${this.second_name} ${this.third_name} ${this.last_name}`;
    }

    @Column({ type: 'varchar', unique: true, length: 4 })  // length 4 for development
    national_id: string;

    @Column({ type: 'date' })
    date_of_birth: Date;

    @Column({ type: 'enum', enum: Gender })
    gender: Gender;

    @Column({ type: 'varchar' })
    address: string;

    @Column({ type: 'varchar', length: 11, unique: true })
    phone_number: string;

    @Column({ type: 'varchar', unique: true, nullable: true })
    email?: string;

    @ManyToOne(
        () => Country,
        country => country.persons,
        { onDelete: 'RESTRICT', nullable: false }
    )
    @JoinColumn({ name: 'country_id' })
    national_country: Country;

    @Column({ type: 'varchar', nullable: true })
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