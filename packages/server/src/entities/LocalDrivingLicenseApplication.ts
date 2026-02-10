import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
    OneToMany,
    VirtualColumn
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
        { onDelete: 'CASCADE', nullable: false }        
    )
    @JoinColumn({ name: 'application_id'})
    application: Application;

    @ManyToOne(
        () => LicenseClass,
        license_class => license_class.local_driving_license_application,
        { onDelete: 'RESTRICT' }
    )
    license_class: LicenseClass;

    @OneToMany(
        () => TestAppointment,
        test_appointment => test_appointment.local_driving_license_application
    )
    test_appointments: TestAppointment[];

    @VirtualColumn({
        query: (alias) => `
            SELECT COUNT(DISTINCT ta.test_type_id) 
            FROM test t 
            INNER JOIN test_appointment ta ON t.test_appointment_id = ta.id 
            WHERE ta.local_driving_license_application_id = ${alias}.id 
            AND t.test_status = '1'
        `
    })
    passed_tests: number;
}