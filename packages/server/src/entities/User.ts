import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import type { Person } from './Person.js';
import type { Application } from './Application.js';
import type { TestAppointment } from './TestAppointment.js';
import type { Test } from './Test.js';
import type { License } from './License.js';
import type { Driver } from './Driver.js';
import type { InternationalLicense } from './InternationalLicense.js';
import type { DetainedLicense } from './DetainedLicense.js';

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        'Person',
        (person: Person) => person.user,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'person_id' })
    person: Person;
    
    @OneToMany(
        'Application',
        (application: Application) => application.created_by_user
    )
    applications: Application[]
    
    @OneToMany(
        'TestAppointment',
        (test_appointment: TestAppointment) => test_appointment.user
    )
    test_appointments: TestAppointment[]

    @OneToMany(
        'Test',
        (test: Test) => test.user
    )
    tests: Test[];

    @OneToMany(
        'License',
        (license: License) => license.user
    )
    licenses: License[];

    @OneToMany(
        'InternationalLicense',
        (intLicense: InternationalLicense) => intLicense.user
    )
    internationalLicenses: InternationalLicense[];
    
    @OneToMany(
        'Driver',
        (driver: Driver) => driver.user
    )
    drivers: Driver[];

    @OneToMany(
        'DetainedLicense',
        (detained_license: DetainedLicense) => detained_license.created_by_user
    )
    detained_licenses: DetainedLicense[];

    @OneToMany(
        'DetainedLicense',
        (detained_license: DetainedLicense) => detained_license.released_by_user
    )
    released_licenses: DetainedLicense[];
    
    @Column({ type: 'varchar', unique: true })
    username: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'boolean' })
    is_active: boolean;
}