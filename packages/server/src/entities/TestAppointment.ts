import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm';
import { TestType } from './TestType';
import { LocalDrivingLicenseApplication } from './LocalDrivingLicenseApplication';
import { User } from './User';
import { Application } from './Application';
import { Test } from './Test';

@Entity()
export class TestAppointment extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        () => TestType,
        test_type => test_type.test_appointments
    )
    @JoinColumn({ name: 'test_type_id' })
    test_type: TestType;

    @ManyToOne(
        () => LocalDrivingLicenseApplication,
        ldla => ldla.test_appointments,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'local_driving_license_application_id' })
    local_driving_license_application: LocalDrivingLicenseApplication;

    @Column()
    appointment_date: Date

    @Column({ type: 'numeric' })
    paid_fees: number;

    @ManyToOne(
        () => User,
        user => user.test_appointments,
    )
    @JoinColumn({ name: 'created_by_user_id' })
    user: User;

    @Column()
    is_locked: boolean;

    @OneToOne(
        () => Application,
        application => application.test_appointment,
        { nullable: true }
    )
    @JoinColumn({ name: 'retake_test_application_id' })
    retake_test_application: Application;

    @OneToOne(
        () => Test,
        test => test.test_appointment,
    )
    test: Test;
}