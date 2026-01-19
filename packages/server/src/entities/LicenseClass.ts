import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { LocalDrivingLicenseApplication } from './LocalDrivingLicenseApplication';

@Entity()
export class LicenseClass extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    class_name: string;

    @Column()
    class_description: string;

    @Column({ type: 'numeric' })
    class_fees: number;

    @Column({ type: 'smallint' })
    minimum_allowed_age: number;

    @Column({ type: 'smallint' })
    default_validity_length: number;

    @OneToMany(
        () => LocalDrivingLicenseApplication,
        local_driving_license_application => local_driving_license_application.license_class,
    )
    local_driving_license_application: LocalDrivingLicenseApplication;
}