import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Application } from './Application';

@Entity()
export class ApplicationType extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    system_name: string;

    @Column()
    type_name: string;

    @Column({ type: 'numeric' })
    type_fees: number;

    @OneToMany(
        () => Application,
        application => application.application_type
    )
    applications: Application[]
}