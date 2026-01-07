import express from "express";
import personRouter from "./routes/personRouter";

const router = express.Router();

router.use('/person', personRouter);

export default router;