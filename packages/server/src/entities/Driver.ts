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
import { License } from './License';
import { User } from './User';
import { Person } from './Person';
import { InternationalLicense } from './InternationalLicense';

@Entity()
export class Driver extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(
        () => User,
        user => user.drivers,
    )
    @JoinColumn({ name: 'created_by_user_id '})
    user: User;
    
    @OneToOne(
        () => Person,
        person => person.driver,
        { onDelete: 'CASCADE' }
    )
    @JoinColumn({ name: 'person_id' })
    person: Person;

    @OneToMany(
        () => License,
        license => license.driver
    )
    licenses: License[];

    @OneToOne(
        () => InternationalLicense,
        intLicense => intLicense.driver
    )
    international_license: InternationalLicense;

    @VirtualColumn({
        query: (alias) => `
            SELECT COUNT(*)
            FROM license
            WHERE driver_id = ${alias}.id
            AND is_active = true
        `
    })
    active_licenses: number;
}