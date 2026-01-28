import { TestResult } from "@dvld/shared/src/types/test";
import { TestAppointmentRepo } from "../repositories/TestAppointmentRepo";
import { AppError } from "../types/errors";
import { isToday } from "../utils/dateUtil";
import { UserRepo } from "../repositories/UserRepo";
import { TestRepo } from "../repositories/TestRepo";

export async function createNewTest(
    testAppointmentId: number,
    createdByUserId: number,
    testStatus: TestResult,
    testNotes: string
) {
    const testAppointment = await TestAppointmentRepo.findOneBy({ id: testAppointmentId });
    if (!testAppointment)
        throw new AppError('Test appointment not found', 404);

    const appointmentToday = isToday(testAppointment.appointment_date);

    if (!appointmentToday) {
        throw new AppError('Test appointment date is not due today', 400);
    }

    const user = await UserRepo.findOneBy({ id: createdByUserId });
    if (!user)
        throw new AppError('User not found', 404);

    testAppointment.is_locked = true;

    await TestAppointmentRepo.save(testAppointment);

    const newTest = await TestRepo.create({
        test_appointment: testAppointment,
        user,
        test_status: testStatus,
        notes: testNotes
    }).save();
    
    return newTest.id;
}