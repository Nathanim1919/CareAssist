import { Router } from "express";
import { getCurrentUser, userLogin, userRegister } from "../controller/auth.controller";


const router = Router();


router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/me", getCurrentUser);

export default router;