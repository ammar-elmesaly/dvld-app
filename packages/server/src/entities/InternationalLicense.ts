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
import { User } from './User';

@Entity()
export class InternationalLicense extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => Application,
        application => application.internationalLicense,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'application_id' })
    application: Application;


    @OneToOne(
        () => Driver,
        driver => driver.internationalLicense,
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
    @JoinColumn({ name: 'created_by_user_id '})
    user: User;
}