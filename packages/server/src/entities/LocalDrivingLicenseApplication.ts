import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany
} from 'typeorm';
import { Application } from './Application';
import { LicenseClass } from './LicenseClass';
import { TestAppointment } from './TestAppointment';

@Entity()
export class LocalDrivingLicenseApplication extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(
        () => Application,
        application => application.local_driving_license_application,
        { onDelete: 'CASCADE' }        
    )
    @JoinColumn({ name: 'application_id '})
    application: Application;

    @ManyToOne(
        () => LicenseClass,
        license_class => license_class.local_driving_license_application,
        { onDelete: 'RESTRICT' }
    )
    license_class: LicenseClass

    @OneToMany(
        () => TestAppointment,
        test_appointment => test_appointment.local_driving_license_application
    )
    test_appointments: TestAppointment[]
}