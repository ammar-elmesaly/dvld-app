import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    Index,
    OneToMany,
    VirtualColumn
} from 'typeorm';

import type { Application } from './Application.js';
import type { Driver } from './Driver.js';
import type { LicenseClass } from './LicenseClass.js';
import type { User } from './User.js';
import type { InternationalLicense } from './InternationalLicense.js';
import { IssueReason } from '@dvld/shared';
import type { DetainedLicense } from './DetainedLicense.js';

@Index(["driver", "license_class"], { unique: true, where: '"is_active" = true' })
@Entity()
export class License extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        'InternationalLicense',
        (intLicense: InternationalLicense) => intLicense.local_license
    )
    international_license: InternationalLicense;
    
    @OneToOne(
        'Application',
        (application: Application) => application.license,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'application_id' })
    application: Application;

    @ManyToOne(
        'Driver',
        (driver: Driver) => driver.licenses,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'driver_id'})
    driver: Driver;

    @ManyToOne(
        'LicenseClass',
        (license_class: LicenseClass) => license_class.licenses,
        { onDelete: 'RESTRICT', nullable: false }
    )
    @JoinColumn({ name: 'license_class_id' })
    license_class: LicenseClass;

    @OneToMany(
        'DetainedLicense',
        (detained_license: DetainedLicense) => detained_license.license
    )
    detained_licenses: DetainedLicense[];
    
    @Column({ type: 'boolean' })
    is_active: boolean;
    
    @VirtualColumn({
        type: 'boolean',
        query: (alias) => `
            SELECT EXISTS (
                SELECT 1 
                FROM detained_license 
                WHERE license_id = ${alias}.id 
                AND release_date IS NULL
            )
        `
    })
    is_detained: boolean;

    @Column({ type: 'date' })
    issue_date: Date;

    @Column({ type: 'date' })
    expiration_date: Date;

    @Column({ type: 'varchar', nullable: true })
    notes: string;

    @Column({ type: 'enum', enum: IssueReason })
    issue_reason: IssueReason;

    @Column({ type: 'numeric' })
    paid_fees: number;

    @ManyToOne(
        'User',
        (user: User) => user.licenses,
        { nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id'})
    user: User;
}