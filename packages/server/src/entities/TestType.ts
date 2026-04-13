import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { TestAppointment } from './TestAppointment.js';
import { TestTypeSystemName } from '@dvld/shared';

@Entity()
export class TestType extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'smallint', unique: true })
    sequence_order: number;

    @Column({ type: 'enum', enum: TestTypeSystemName })
    system_name: TestTypeSystemName;

    @Column({ type: 'varchar' })
    type_name: string;

    @Column({ type: 'varchar' })
    type_description: string;

    @Column({ type: 'numeric' })
    type_fees: number;

    @OneToMany(
        () => TestAppointment,
        test_appointment => test_appointment.test_type
    )
    test_appointments: TestAppointment[]
}