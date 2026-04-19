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

import type { Application } from './Application.js';
import type { Driver } from './Driver.js';
import type { User } from './User.js';
import type { License } from './License.js';

@Entity()
@Index("UQ_active_driver_license", ["driver"], { unique: true, where: "is_active = true" })
export class InternationalLicense extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        'License',
        (license: License) => license.international_license,
        { nullable: false }
    )
    @JoinColumn({ name: 'local_license_id'})
    local_license: License;

    @OneToOne(
        'Application',
        (application: Application) => application.international_license,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'application_id' })
    application: Application;


    @OneToOne(
        'Driver',
        (driver: Driver) => driver.international_license,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'driver_id' })
    driver: Driver;

    @Column({ type: 'boolean' })
    is_active: boolean;
    
    @Column({ type: 'date' })
    issue_date: Date;

    @Column({ type: 'date' })
    expiration_date: Date;

    @Column({ type: 'varchar', nullable: true })
    notes: string;

    @Column({ type: 'numeric' })
    paid_fees: number;

    @ManyToOne(
        'User',
        (user: User) => user.internationalLicenses,
        { nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id'})
    user: User;
}