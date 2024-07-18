import { Router } from "express";
import createCompany from "../controllers/company.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import createProject from "../controllers/project.controller.js";
const router = Router()
router.route("/createCompany").post(createCompany);
router.route("/createProject").post(verifyJWT,createProject)

export default router;