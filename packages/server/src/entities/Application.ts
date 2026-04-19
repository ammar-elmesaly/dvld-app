import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    OneToOne
} from 'typeorm';

import type { Person } from './Person.js';
import type { ApplicationType } from './ApplicationType.js';
import type { User } from './User.js';
import { ApplicationStatus } from '@dvld/shared';
import type { LocalDrivingLicenseApplication } from './LocalDrivingLicenseApplication.js';
import type { TestAppointment } from './TestAppointment.js';
import type { License } from './License.js';
import type { InternationalLicense } from './InternationalLicense.js';
import type { DetainedLicense } from './DetainedLicense.js';
@Entity()
export class Application extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        'Person',
        (person: Person) => person.applications,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @ManyToOne(
        'ApplicationType',
        (application_type: ApplicationType) => application_type.applications,
        { onDelete: 'RESTRICT', nullable: false }
    )
    @JoinColumn({ name: 'type_id' })
    application_type: ApplicationType;

    @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.New })
    application_status: ApplicationStatus

    @ManyToOne(
        'User',
        (user: User) => user.applications,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id'})
    created_by_user: User;

    @OneToOne(
        'LocalDrivingLicenseApplication',
        (local_driving_license_application: LocalDrivingLicenseApplication) => local_driving_license_application.application
    )
    local_driving_license_application: LocalDrivingLicenseApplication;

    @OneToOne(
        'TestAppointment',
        (test_appointment: TestAppointment) => test_appointment.retake_test_application,
    )
    test_appointment: TestAppointment;

    @OneToOne(
        'License',
        (license: License) => license.application
    )
    license: License;

    @OneToOne(
        'InternationalLicense',
        (intLicense: InternationalLicense) => intLicense.application
    )
    international_license: InternationalLicense;

    @OneToOne(
        'DetainedLicense',
        (detained_license: DetainedLicense) => detained_license.release_application
    )
    detained_license: DetainedLicense;

    @Column({ type: 'numeric' })
    paid_fees: number;

    @Column({ type: 'date' })
    last_status_date: Date;

    @CreateDateColumn({ type: 'timestamp' })
    application_date: Date;
}