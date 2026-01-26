import { RequestHandler } from "express";
import * as testAppointmentService from "../services/testAppointmentService";
import { toTestAppointmentDTO } from "../mappers/testAppointmentMapper";

export const getAllTestAppointmentsHandler: RequestHandler = async (req, res) => {
    const { localDrivingLicenseApplicationId } = req.params;
    
    const testAppointments = await testAppointmentService.getTestAppointments(Number(localDrivingLicenseApplicationId));
    const testAppointmentsMapped = testAppointments.map(ta => toTestAppointmentDTO(ta));
    
    res.json(testAppointmentsMapped);
}

export const newTestAppointmentHandler: RequestHandler = async (req, res) => {
    const {
        testTypeId,
        localDrivingLicenseApplicationId,
        appointmentDate,
        createdByUserId
    } = req.body;

    const testAppointmentId = await testAppointmentService.createTestAppointment(testTypeId, localDrivingLicenseApplicationId, appointmentDate, createdByUserId);
    
    res.status(201).json(testAppointmentId);
}