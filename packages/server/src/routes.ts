import express from "express";
import personRouter from "./routes/personRouter";
import userRouter from "./routes/userRouter";
import countryRouter from "./routes/countryRouter";

const router = express.Router();

router.use('/person', personRouter);
router.use('/user', userRouter);
router.use('/country', countryRouter);

export default router;