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
import { User } from './User';
import { License } from './License';

@Entity()
@Index("UQ_active_driver_license", ["driver"], { unique: true, where: "is_active = true" })
export class InternationalLicense extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => License,
        license => license.international_license,
        { nullable: false }
    )
    @JoinColumn({ name: 'local_license_id'})
    local_license: License;

    @OneToOne(
        () => Application,
        application => application.international_license,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'application_id' })
    application: Application;


    @OneToOne(
        () => Driver,
        driver => driver.international_license,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'driver_id' })
    driver: Driver;

    @Column()
    is_active: boolean;
    
    @Column()
    issue_date: Date;

    @Column()
    expiration_date: Date;

    @Column({ nullable: true })
    notes: string;

    @Column({ type: 'numeric' })
    paid_fees: number;

    @ManyToOne(
        () => User,
        user => user.internationalLicenses
    )
    @JoinColumn({ name: 'created_by_user_id'})
    user: User;
}