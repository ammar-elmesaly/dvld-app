import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    CreateDateColumn
} from 'typeorm';
import { TestType } from './TestType.js';
import { LocalDrivingLicenseApplication } from './LocalDrivingLicenseApplication.js';
import { User } from './User.js';
import { Application } from './Application.js';
import { Test } from './Test.js';

@Entity()
export class TestAppointment extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        () => TestType,
        test_type => test_type.test_appointments,
        { onDelete: 'RESTRICT', nullable: false }
    )
    @JoinColumn({ name: 'test_type_id' })
    test_type: TestType;

    @ManyToOne(
        () => LocalDrivingLicenseApplication,
        ldla => ldla.test_appointments,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'local_driving_license_application_id' })
    local_driving_license_application: LocalDrivingLicenseApplication;

    @Column({ type: 'date' })
    appointment_date: Date

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @Column({ type: 'numeric' })
    paid_fees: number;

    @ManyToOne(
        () => User,
        user => user.test_appointments,
        { nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id' })
    user: User;

    @Column({ type: 'boolean' })
    is_locked: boolean;

    @OneToOne(
        () => Application,
        application => application.test_appointment,
        { nullable: true, onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'retake_test_application_id' })
    retake_test_application?: Application;
    
    @OneToOne(
        () => Test,
        test => test.test_appointment,
    )
    test: Test;
}