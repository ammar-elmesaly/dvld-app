import { RequestHandler } from "express";
import * as testService from "../services/testService";

export const addNewTestHandler: RequestHandler = async (req, res) => {
    const {
        testAppointmentId,
        createdByUserId,
        testStatus,
        testNotes
    } = req.body;

    const testId = await testService.createNewTest(testAppointmentId, createdByUserId, testStatus, testNotes);

    res.status(201).json(testId);
}