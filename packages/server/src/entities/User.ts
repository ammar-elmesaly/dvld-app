import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { Person } from './Person.js';
import { Application } from './Application.js';
import { TestAppointment } from './TestAppointment.js';
import { Test } from './Test.js';
import { License } from './License.js';
import { Driver } from './Driver.js';
import { InternationalLicense } from './InternationalLicense.js';
import { DetainedLicense } from './DetainedLicense.js';

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