import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm';
import { License } from './License';
import { User } from './User';
import { Application } from './Application';

@Entity()
export class DetainedLicense extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        () => License,
        license => license.detained_licenses,  // one license can be detained multiple times,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'license_id' })
    license: License;

    @Column()
    detain_date: Date;

    @Column({ nullable: true })
    release_date: Date;

    @Column({ type: 'numeric' })
    fine_fees: number;

    @ManyToOne(
        () => User,
        user => user.detained_licenses,
        { nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id' })
    created_by_user: User;

    @ManyToOne(
        () => User,
        user => user.released_licenses,
        { nullable: true }
    )
    @JoinColumn({ name: 'released_by_user_id' })
    released_by_user: User;

    @OneToOne(
        () => Application,
        application => application.detained_license,
        { nullable: true }
    )
    @JoinColumn({ name: 'release_application_id' })
    release_application: Application;
}