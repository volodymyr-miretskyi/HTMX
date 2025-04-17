import express from "express";
import userRouter from "./user.js";
import converterRouter from "./converter.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/converter", converterRouter);

export default router;
