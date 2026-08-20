import { Router } from "express";
import vacationRouter from "./vacationRouter.js";

const router = Router();

router.use("/api/vacations", vacationRouter);

export default router;
