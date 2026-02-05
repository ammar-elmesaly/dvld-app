import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    Index
} from 'typeorm';

import { Application } from './Application';
import { Driver } from './Driver';
import { LicenseClass } from './LicenseClass';
import { User } from './User';
import { InternationalLicense } from './InternationalLicense';
import { IssueReason } from '@dvld/shared/src/types/license';

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
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'application_id' })
    application: Application;

    @ManyToOne(
        () => Driver,
        driver => driver.licenses,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'driver_id'})
    driver: Driver;

    @ManyToOne(
        () => LicenseClass,
        license_class => license_class.licenses,
        { onDelete: 'RESTRICT' }
    )
    @JoinColumn({ name: 'license_class_id '})
    license_class: LicenseClass;

    @Column()
    is_active: boolean;
    
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
        user => user.licenses
    )
    @JoinColumn({ name: 'created_by_user_id '})
    user: User;
}