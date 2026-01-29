import express from "express";
import personRouter from "./routes/personRouter";
import userRouter from "./routes/userRouter";
import countryRouter from "./routes/countryRouter";
import applicationTypeRouter from "./routes/applicationTypeRouter";
import testTypeRouter from "./routes/testTypeRouter";

import licenseClassRouter from "./routes/licenseClassRouter";
import licenseRouter from "./routes/licenseRouter";

import applicationRouter from "./routes/applicationRouter";

import loginRouter from "./routes/loginRoute";
import logoutRouter from "./routes/logoutRoute";

import testAppointmentRouter from "./routes/testAppointmentRouter";
import testRouter from "./routes/testRouter";

import meRouter from "./routes/meRoute";

const router = express.Router();

router.use('/person', personRouter);
router.use('/user', userRouter);
router.use('/country', countryRouter);
router.use('/applicationType', applicationTypeRouter);
router.use('/testType', testTypeRouter);

router.use('/licenseClass', licenseClassRouter);
router.use('/license', licenseRouter);

router.use('/application', applicationRouter);

router.use('/testAppointment', testAppointmentRouter);
router.use('/test', testRouter);

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

router.use('/me', meRouter);

export default router;