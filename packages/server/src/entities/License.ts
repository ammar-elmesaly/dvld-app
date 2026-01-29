import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne
} from 'typeorm';

import { Application } from './Application';
import { Driver } from './Driver';
import { LicenseClass } from './LicenseClass';
import { User } from './User';

@Entity()
export class License extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => Application,
        application => application.license,
    )
    @JoinColumn({ name: 'application_id' })
    application: Application;

    @ManyToOne(
        () => Driver,
        driver => driver.licenses,
        { onDelete: 'RESTRICT' }
    )
    @JoinColumn({ name: 'driver_id '})
    driver: Driver;

    @ManyToOne(
        () => LicenseClass,
        license_class => license_class.licenses,
        { onDelete: 'RESTRICT' }
    )
    @JoinColumn({ name: 'license_class_id '})
    license_class: LicenseClass;

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
        user => user.licenses
    )
    @JoinColumn({ name: 'created_by_user_id '})
    user: User;
}