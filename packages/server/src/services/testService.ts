import { TestResult } from "@dvld/shared/src/types/test";
import { TestAppointmentRepo } from "../repositories/TestAppointmentRepo";
import { AppError } from "../types/errors";
import { UserRepo } from "../repositories/UserRepo";
import { Test } from "../entities/Test";

export async function createNewTest(
    testAppointmentId: number,
    createdByUserId: number,
    testStatus: TestResult,
    testNotes: string
) {
    const [user, testAppointment] = await Promise.all([
        UserRepo.findOneBy({ id: createdByUserId }),
        TestAppointmentRepo.findOne({
            where: { id: testAppointmentId },
            relations: { test: true }
        })
    ]);

    if (!user)
        throw new AppError('User not found', 404);

    if (!testAppointment)
        throw new AppError('Test appointment not found', 404);

    if (testAppointment.is_locked || testAppointment.test)
        throw new AppError('Test appointment already locked or completed', 400)

    const today = new Date();
    today.setHours(0, 0, 0, 0);  // remove hours for accuracy comparison
    
    const appointmentDate = new Date(testAppointment.appointment_date);
    appointmentDate.setHours(0, 0, 0, 0);

    if (appointmentDate > today)
        throw new AppError('Test appointment date is in the future. Come back later!', 400);

    if (appointmentDate < today) {
        testAppointment.is_locked = true;
        await TestAppointmentRepo.save(testAppointment);  // lock the appointment
        throw new AppError('This appointment was missed and is now expired.', 400);
    }

    return TestAppointmentRepo.manager.transaction(async (manager) => {
        testAppointment.is_locked = true;
        await manager.save(testAppointment);

        const newTest = manager.create(Test, {
            test_appointment: testAppointment,
            user,
            test_status: testStatus,
            notes: testNotes
        });

        const newTestSaved = await manager.save(newTest);
        
        return newTestSaved.id;
    });
}