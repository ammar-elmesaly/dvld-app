import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { TestAppointment } from './TestAppointment';

@Entity()
export class TestType extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    sequence_order: number;

    @Column()
    system_name: string; // TODO make it an enum

    @Column()
    type_name: string;

    @Column()
    type_description: string;

    @Column({ type: 'numeric' })
    type_fees: number;

    @OneToMany(
        () => TestAppointment,
        test_appointment => test_appointment.test_type
    )
    test_appointments: TestAppointment[]
}