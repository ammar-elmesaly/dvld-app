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

import { Application } from './Application';
import { Driver } from './Driver';
import { LicenseClass } from './LicenseClass';
import { User } from './User';
import { InternationalLicense } from './InternationalLicense';
import { IssueReason } from '@dvld/shared/src/types/license';
import { DetainedLicense } from './DetainedLicense';

@Index(["driver", "license_class"], { unique: true, where: '"is_active" = true' })
@Entity()
export class License extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => InternationalLicense,
        intLicense => intLicense.local_license
    )
    international_license: InternationalLicense;
    
    @OneToOne(
        () => Application,
        application => application.license,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'application_id' })
    application: Application;

    @ManyToOne(
        () => Driver,
        driver => driver.licenses,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'driver_id'})
    driver: Driver;

    @ManyToOne(
        () => LicenseClass,
        license_class => license_class.licenses,
        { onDelete: 'RESTRICT', nullable: false }
    )
    @JoinColumn({ name: 'license_class_id' })
    license_class: LicenseClass;

    @OneToMany(
        () => DetainedLicense,
        detained_license => detained_license.license
    )
    detained_licenses: DetainedLicense[];
    
    @Column()
    is_active: boolean;
    
    @VirtualColumn({
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

    @Column()
    issue_date: Date;

    @Column()
    expiration_date: Date;

    @Column({ nullable: true })
    notes: string;

    @Column({ type: 'enum', enum: IssueReason })
    issue_reason: IssueReason;

    @Column({ type: 'numeric' })
    paid_fees: number;

    @ManyToOne(
        () => User,
        user => user.licenses,
        { nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id'})
    user: User;
}