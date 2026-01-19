import express from "express";
import personRouter from "./routes/personRouter";
import userRouter from "./routes/userRouter";
import countryRouter from "./routes/countryRouter";
import applicationTypeRouter from "./routes/applicationTypeRouter";
import testTypeRouter from "./routes/testTypeRouter";
import licenseClassRouter from "./routes/licenseClassRouter";
import applicationRouter from "./routes/applicationRouter";

import loginRouter from "./routes/loginRoute";
import logoutRouter from "./routes/logoutRoute";

const router = express.Router();

router.use('/person', personRouter);
router.use('/user', userRouter);
router.use('/country', countryRouter);
router.use('/applicationType', applicationTypeRouter);
router.use('/testType', testTypeRouter);
router.use('/licenseClass', licenseClassRouter);
router.use('/application', applicationRouter);

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);

export default router;