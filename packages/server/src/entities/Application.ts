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

import { Person } from './Person';
import { ApplicationType } from './ApplicationType';
import { User } from './User';
import { ApplicationStatus } from '@dvld/shared/src/types/application';
import { LocalDrivingLicenseApplication } from './LocalDrivingLicenseApplication';
import { TestAppointment } from './TestAppointment';
import { License } from './License';
import { InternationalLicense } from './InternationalLicense';
import { DetainedLicense } from './DetainedLicense';
@Entity()
export class Application extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        () => Person,
        person => person.applications,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @ManyToOne(
        () => ApplicationType,
        application_type => application_type.applications,
        { onDelete: 'RESTRICT', nullable: false }
    )
    @JoinColumn({ name: 'type_id' })
    application_type: ApplicationType;

    @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.New })
    application_status: ApplicationStatus

    @ManyToOne(
        () => User,
        user => user.applications,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id'})
    created_by_user: User;

    @OneToOne(
        () => LocalDrivingLicenseApplication,
        local_driving_license_application => local_driving_license_application.application
    )
    local_driving_license_application: LocalDrivingLicenseApplication;

    @OneToOne(
        () => TestAppointment,
        test_appointment => test_appointment.retake_test_application,
    )
    test_appointment: TestAppointment;

    @OneToOne(
        () => License,
        license => license.application
    )
    license: License;

    @OneToOne(
        () => InternationalLicense,
        intLicense => intLicense.application
    )
    international_license: InternationalLicense;

    @OneToOne(
        () => DetainedLicense,
        detained_license => detained_license.release_application
    )
    detained_license: DetainedLicense;

    @Column({ type: 'numeric' })
    paid_fees: number;

    @Column()
    last_status_date: Date;

    @CreateDateColumn()
    application_date: Date;
}