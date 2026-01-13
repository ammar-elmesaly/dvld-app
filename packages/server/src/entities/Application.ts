import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    JoinColumn,
    ManyToOne,
    CreateDateColumn
} from 'typeorm';

import { Person } from './Person';
import { ApplicationType } from './ApplicationType';
import { User } from './User';
import { ApplicationStatus } from '../types/application';

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

    @Column({ type: 'numeric' })
    paid_fees: number;

    @Column()
    last_status_date: Date;

    @CreateDateColumn()
    application_date: Date;
}