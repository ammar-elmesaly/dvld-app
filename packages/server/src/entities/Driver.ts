import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    VirtualColumn
} from 'typeorm';
import type { License } from './License.js';
import type { User } from './User.js';
import type { Person } from './Person.js';
import type { InternationalLicense } from './InternationalLicense.js';

@Entity()
export class Driver extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(
        'User',
        (user: User) => user.drivers,
        { nullable: false }
    )
    @JoinColumn({ name: 'created_by_user_id'})
    user: User;
    
    @OneToOne(
        'Person',
        (person: Person) => person.driver,
        { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @OneToMany(
        'License',
        (license: License) => license.driver
    )
    licenses: License[];

    @OneToOne(
        'InternationalLicense',
        (intLicense: InternationalLicense) => intLicense.driver
    )
    international_license: InternationalLicense;

    @VirtualColumn({
        type: 'integer',
        query: (alias) => `
            SELECT COUNT(*)::integer
            FROM license
            WHERE driver_id = ${alias}.id
            AND is_active = true
        `
    })
    active_licenses: number;
}