import express from "express";
import personRouter from "./routes/personRouter";
import userRouter from "./routes/userRouter";
import countryRouter from "./routes/countryRouter";
import applicationTypeRouter from "./routes/applicationTypeRouter";
import testTypeRouter from "./routes/testTypeRouter";

const router = express.Router();

router.use('/person', personRouter);
router.use('/user', userRouter);
router.use('/country', countryRouter);
router.use('/applicationType', applicationTypeRouter);
router.use('/testType', testTypeRouter);

export default router;