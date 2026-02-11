import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Person } from './Person';
import { Application } from './Application';
import { TestAppointment } from './TestAppointment';
import { Test } from './Test';
import { License } from './License';
import { Driver } from './Driver';
import { InternationalLicense } from './InternationalLicense';
import { DetainedLicense } from './DetainedLicense';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => Person,
        person => person.user,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'person_id' })
    person: Person;
    
    @OneToMany(
        () => Application,
        application => application.created_by_user
    )
    applications: Application[]
    
    @OneToMany(
        () => TestAppointment,
        test_appointment => test_appointment.user
    )
    test_appointments: TestAppointment[]

    @OneToMany(
        () => Test,
        test => test.user
    )
    tests: Test[];

    @OneToMany(
        () => License,
        license => license.user
    )
    licenses: License[];

    @OneToMany(
        () => InternationalLicense,
        intLicense => intLicense.user
    )
    internationalLicenses: InternationalLicense[];
    
    @OneToMany(
        () => Driver,
        driver => driver.user
    )
    drivers: Driver[];

    @OneToMany(
        () => DetainedLicense,
        detained_license => detained_license.created_by_user
    )
    detained_licenses: DetainedLicense[];

    @OneToMany(
        () => DetainedLicense,
        detained_license => detained_license.released_by_user
    )
    released_licenses: DetainedLicense[];
    
    @Column({ unique: true })
    username: string;

    @Column()
    password: string;

    @Column()
    is_active: boolean;
}