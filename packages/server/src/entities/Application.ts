import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    CreateDateColumn,
    OneToOne,
    VirtualColumn
} from 'typeorm';

import { Person } from './Person';
import { ApplicationType } from './ApplicationType';
import { User } from './User';
import { ApplicationStatus } from '@dvld/shared/src/types/application';
import { LocalDrivingLicenseApplication } from './LocalDrivingLicenseApplication';
import { TestAppointment } from './TestAppointment';
@Entity()
export class Application extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        () => Person,
        person => person.applications,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @ManyToOne(
        () => ApplicationType,
        application_type => application_type.applications,
        { onDelete: 'RESTRICT' }
    )
    @JoinColumn({ name: 'type_id' })
    application_type: ApplicationType;

    @Column({ type: 'enum', enum: ApplicationStatus, default: ApplicationStatus.New })
    application_status: ApplicationStatus

    @ManyToOne(
        () => User,
        user => user.applications,
        { onDelete: 'CASCADE' }
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

    @Column({ type: 'numeric' })
    paid_fees: number;

    @Column()
    last_status_date: Date;

    @CreateDateColumn()
    application_date: Date;

    @VirtualColumn({
        query: (_alias) => `
            SELECT type_fees 
            FROM application_type
            WHERE application_type.id = 7
        `
    })
    retake_test_fees: number;
}