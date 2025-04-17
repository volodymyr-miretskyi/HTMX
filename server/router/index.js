import express from "express";
import userRouter from "./user.js";
import converterRouter from "./converter.js";
import weatherRouter from "./weather.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.use("/users", userRouter);
router.use("/converter", converterRouter);
router.use("/weather", weatherRouter);

export default router;
