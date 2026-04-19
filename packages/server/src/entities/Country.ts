import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import type { Person } from './Person.js';

@Entity()
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true })
    country_name: string;

    @OneToMany(
        'Person',
        (person: Person) => person.national_country
    )
    persons: Person[]
}