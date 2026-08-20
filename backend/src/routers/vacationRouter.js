import { Router } from "express";
import VacationController from "../controllers/vacationController.js";

const router = Router();

router.get("/", VacationController.getVacations);
router.post("/", VacationController.postVacation);
router.patch("/:id/approve", VacationController.approveVacation);
router.patch("/:id/reject", VacationController.rejectVacation);

export default router;
