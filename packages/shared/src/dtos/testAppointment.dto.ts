import { TestResult } from "../types/test";

export interface TestAppointmentDTO {
    id: number;
    appointment_date: string;
    paid_fees: number;
    is_locked: boolean;
    retake_test_fees?: number;
    test_status: TestResult;
}