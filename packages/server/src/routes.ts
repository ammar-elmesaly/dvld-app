import express from "express";
import personRouter from "./routes/personRouter";
import userRouter from "./routes/userRouter";

const router = express.Router();

router.use('/person', personRouter);
router.use('/user', userRouter);

export default router;