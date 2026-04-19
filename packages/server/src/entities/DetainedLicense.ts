import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    OneToOne
} from 'typeorm';
import type { License } from './License.js';
import type { User } from './User.js';
import type { Application } from './Application.js';

@Entity()
export class DetainedLicense extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(
        'License',
        (license: License) => license.detained_licenses,  // one license can be detained multiple times,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'license_id' })
    license: License;

    @Column({ type: 'date' })
    detain_date: Date;

    @Column({ type: 'date', nullable: true })
    release_date: Date;

    @Column({ type: 'numeric' })
    fine_fees: number;

    @ManyToOne(
        'User',
        (user: User) => user.detained_licenses,
        { nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id' })
    created_by_user: User;

    @ManyToOne(
        'User',
        (user: User) => user.released_licenses,
        { nullable: true }
    )
    @JoinColumn({ name: 'released_by_user_id' })
    released_by_user: User;

    @OneToOne(
        'Application',
        (application: Application) => application.detained_license,
        { nullable: true }
    )
    @JoinColumn({ name: 'release_application_id' })
    release_application: Application;
}