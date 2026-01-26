import { TestResult } from "@dvld/shared/src/types/test";
import { LocalDrivingLicenseApplication } from "../entities/LocalDrivingLicenseApplication";
import { TestAppointment } from "../entities/TestAppointment";
import { TestType } from "../entities/TestType";
import { User } from "../entities/User";
import { AppError } from "../types/errors";

export async function getTestAppointments(localDrivingLicenseApplicationId: number) {
    const ldla = await LocalDrivingLicenseApplication.findOneBy({ id: localDrivingLicenseApplicationId });
    if (!ldla)
        throw new AppError('Local driving license application not found', 404);

    return TestAppointment.findBy({ local_driving_license_application: ldla });
}

export async function createTestAppointment(testTypeId: number, localDrivingLicenseApplicationId: number, appointmentDate: Date, createdByUserId: number) {
    const pastAppointments = await TestAppointment.find({
        where: {
            local_driving_license_application: { id: localDrivingLicenseApplicationId },
        },
        relations: {
            local_driving_license_application: true,
            test: true
        },
        order: {
            appointment_date: 'DESC'
        },
    });

    const lastAppointment = pastAppointments[pastAppointments.length - 1];
    if (lastAppointment) {
        if (lastAppointment.test && lastAppointment.test.test_status === TestResult.Failed) {
            // Make a new retake test application and then link it to the new test appointment
            // Retake test logic
        } else if (lastAppointment.test && lastAppointment.test.test_status === TestResult.Success) {
            throw new AppError("New appointments are unavailable for tests with an existing passing status.", 400);
        } else {
            throw new AppError("Cannot have 2 active (unlocked) test appointments at the same time.", 400);
        }
    }
    
    const testType = await TestType.findOneBy({ id: testTypeId });
    if (!testType)
        throw new AppError('Test Type not found', 404);

    const ldla = await LocalDrivingLicenseApplication.findOneBy({ id: localDrivingLicenseApplicationId });
    if (!ldla)
        throw new AppError('Local driving license application not found', 404);

    const createdByUser = await User.findOneBy({ id: createdByUserId });
    if (!createdByUser)
        throw new AppError('User not found', 404);

    const testAppointment = await TestAppointment.create({
        test_type: testType,
        local_driving_license_application: ldla,
        is_locked: false,
        paid_fees: testType.type_fees,  // should also add retake test fees
        appointment_date: appointmentDate
    }).save();

    return testAppointment.id;
}