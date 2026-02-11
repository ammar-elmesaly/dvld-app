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

    @Column()
    appointment_date: Date

    @CreateDateColumn()
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

    @Column()
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