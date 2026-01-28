import { AppDataSource } from "../dataSource";
import { TestAppointment } from "../entities/TestAppointment";

export const TestAppointmentRepo = AppDataSource.getRepository(TestAppointment).extend({
    getAllTestAppointments(ldlaId: number) {
        return TestAppointmentRepo.createQueryBuilder('test_appointment')
            .where('test_appointment.local_driving_license_application = :ldlaId', { ldlaId })
            .leftJoinAndSelect('test_appointment.test', 'test')
            .leftJoinAndSelect('test_appointment.retake_test_application', 'rta')
            .leftJoinAndSelect('rta.application_type', 'application_type')
            .getMany();
    }
});