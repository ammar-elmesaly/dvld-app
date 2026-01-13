import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';
import { Person } from './Person';

@Entity()
export class Country extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ unique: true })
    country_name: string;

    @OneToMany(
        () => Person,
        person => person.national_country
    )
    persons: Person[]
}