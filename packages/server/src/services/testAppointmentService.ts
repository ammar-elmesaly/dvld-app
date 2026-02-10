import { TestResult } from "@dvld/shared/src/types/test";
import { LocalDrivingLicenseApplication } from "../entities/LocalDrivingLicenseApplication";
import { TestAppointmentRepo } from "../repositories/TestAppointmentRepo";
import { TestType } from "../entities/TestType";
import { User } from "../entities/User";
import { AppError } from "../types/errors";
import { newApplication } from "./applicationService";
import { getApplicationTypeByName } from "./applicationTypeService";


export async function getTestAppointments(localDrivingLicenseApplicationId: number) {
    const ldlaExists = await LocalDrivingLicenseApplication.existsBy({ id: localDrivingLicenseApplicationId });
    if (!ldlaExists)
        throw new AppError('Local driving license application not found', 404);

    return TestAppointmentRepo.getAllTestAppointments(localDrivingLicenseApplicationId);
}

export async function createTestAppointment(testTypeId: number, localDrivingLicenseApplicationId: number, appointmentDate: Date, createdByUserId: number) {
    const lastAppointment = await TestAppointmentRepo.findOne({
        where: {
            local_driving_license_application: { id: localDrivingLicenseApplicationId },
            test_type: { id: testTypeId }
        },
        relations: {
            local_driving_license_application: true,
            test: true,
            test_type: true
        },
        order: {
            created_at: 'DESC'
        },
    });
    
    const ldla = await LocalDrivingLicenseApplication.findOne({
        where: { id: localDrivingLicenseApplicationId},
        relations: { application: { person: true } }
    });

    if (!ldla)
        throw new AppError('Local driving license application not found', 404);

    let retakeTestApplicationId;

    if (lastAppointment) {
        if (!lastAppointment.is_locked) {
            throw new AppError("Cannot have 2 active (unlocked) test appointments at the same time.", 400);

        } else if (lastAppointment.test && lastAppointment.test.test_status === TestResult.Fail) {
            // If an applicant fails a test, and wants to retake it, we make a retake test application
            // and assign it to the testAppointment

            retakeTestApplicationId = await newApplication(ldla.application.person.id, 'RETAKE_TEST_SERVICE', createdByUserId);
        } else if (lastAppointment.test && lastAppointment.test.test_status === TestResult.Success) {
            throw new AppError("New appointments are unavailable for tests with an existing passing status.", 400);
        }
    }
    
    const testType = await TestType.findOneBy({ id: testTypeId });
    if (!testType)
        throw new AppError('Test Type not found', 404);

    const passedTestCount = ldla.passed_tests;
    // This checks if applying for a test which passed already or skipping a one (TODO IMPROVE LOGIC)
    if (testTypeId !== passedTestCount + 1)
        throw new AppError("Can't make a test appointment without passing or already passing other tests.", 400);
    
    const createdByUser = await User.findOneBy({ id: createdByUserId });
    if (!createdByUser)
        throw new AppError('User not found', 404);

    const retakeTestApplicationType = await getApplicationTypeByName('RETAKE_TEST_SERVICE');

    const testFees = Number(testType.type_fees);
    const retakeTestFees =
        retakeTestApplicationId
        ? Number(retakeTestApplicationType?.type_fees)
        : 0;

    const totalPaidFees = testFees + retakeTestFees;
    const testAppointment = await TestAppointmentRepo.create({
        test_type: testType,
        local_driving_license_application: { id: ldla.id },
        is_locked: false,
        paid_fees: totalPaidFees,
        appointment_date: appointmentDate,
        user: createdByUser,
        retake_test_application: retakeTestApplicationId 
            ? { id: retakeTestApplicationId } 
            : undefined
    }).save();

    return testAppointment.id;
}

export async function updateTestAppointment(testAppointmentId: number, appointmentDate: Date) {
    const appointment = await TestAppointmentRepo.findOne({
        where: {
            id: testAppointmentId
        }
    });

    if (!appointment)
        throw new AppError('Test Appointment not found', 404);

    if (appointment.is_locked)
        throw new AppError('Cannot edit a locked appointment', 400);

    appointment.appointment_date = appointmentDate;

    const newTestAppointment = await TestAppointmentRepo.save(appointment);
    
    return newTestAppointment.id;
}

export async function getTrialNumber(testTypeId: number, localDrivingLicenseApplicationId: number) {
    const trialNumber = await TestAppointmentRepo.count({
        where: {
            test_type: { id: testTypeId },
            test: {
                test_status: TestResult.Fail
            },
            local_driving_license_application: { id: localDrivingLicenseApplicationId }
        },
        relations: {
            test: true
        }
    });

    return trialNumber;
}