import { TestAppointmentDTO } from '@dvld/shared/src/dtos/testAppointment.dto';
import { TestAppointment } from '../entities/TestAppointment';

export const toTestAppointmentDTO = (testAppointment: TestAppointment): TestAppointmentDTO => {
    
    return {
        id: testAppointment.id,
        appointment_date: testAppointment.appointment_date.toDateString(),
        is_locked: testAppointment.is_locked,
        paid_fees: testAppointment.paid_fees,
        retake_test_fees: testAppointment.retake_test_application?.application_type.type_fees,
        test_status: testAppointment.test?.test_status
    };
};
