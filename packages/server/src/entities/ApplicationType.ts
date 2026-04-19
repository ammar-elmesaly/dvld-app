import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import type { Application } from './Application.js';

import { ApplicationTypeSystemName } from '@dvld/shared';

@Entity()
export class ApplicationType extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'enum', enum: ApplicationTypeSystemName })
    system_name: ApplicationTypeSystemName;

    @Column({ type: 'varchar' })
    type_name: string;

    @Column({ type: 'numeric' })
    type_fees: number;

    @Column({ type: 'smallint', nullable: true })
    default_validity_length: number;

    @OneToMany(
        'Application',
        (application: Application) => application.application_type
    )
    applications: Application[]
}