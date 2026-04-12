import express from "express";

import personRouter from './routes/personRouter.js';
import userRouter from './routes/userRouter.js';
import driverRouter from './routes/driverRouter.js';
import countryRouter from './routes/countryRouter.js';
import applicationTypeRouter from './routes/applicationTypeRouter.js';
import testTypeRouter from './routes/testTypeRouter.js';

import licenseClassRouter from './routes/licenseClassRouter.js';
import licenseRouter from './routes/licenseRouter.js';
import internationalLicenseRouter from './routes/internationalLicenseRouter.js';

import applicationRouter from './routes/applicationRouter.js';

import loginRouter from './routes/loginRoute.js';
import logoutRouter from './routes/logoutRoute.js';

import testAppointmentRouter from './routes/testAppointmentRouter.js';
import testRouter from './routes/testRouter.js';

import meRouter from './routes/meRoute.js';

const router = express.Router();

router.use('/person', personRouter);
router.use('/user', userRouter);
router.use('/driver', driverRouter);
router.use('/country', countryRouter);
router.use('/applicationType', applicationTypeRouter);
router.use('/testType', testTypeRouter);

router.use('/licenseClass', licenseClassRouter);
router.use('/license', licenseRouter);
router.use('/internationalLicense', internationalLicenseRouter);

router.use('/application', applicationRouter);

router.use('/testAppointment', testAppointmentRouter);
router.use('/test', testRouter);

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

router.use('/me', meRouter);

export default router;