import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm';
import { TestAppointment } from './TestAppointment';
import { TestResult } from "@dvld/shared/src/types/test";
import { User } from './User';

@Entity()
export class Test extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => TestAppointment,
        test_appointment => test_appointment.test,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: "test_appointment_id" })
    test_appointment: TestAppointment

    @Column({ type: 'enum', enum: TestResult })
    test_status: TestResult;

    @Column({ nullable: true })
    notes: string;

    @ManyToOne(
        () => User,
        user => user.tests,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'created_by_user_id' })
    user: User;
}