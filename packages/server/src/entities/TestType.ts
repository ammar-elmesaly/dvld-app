import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TestType extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    type_name: string;

    @Column()
    type_description: string;

    @Column({ type: 'numeric' })
    type_fees: number;
}