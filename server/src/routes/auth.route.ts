import { Router } from "express";
import { getCurrentUser, userLogin, userLogout, userRegister } from "../controller/auth.controller";
import { authenticateUser } from "../middleware/auth.middleware";


const router = Router();


router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/me", getCurrentUser);
router.post("/logout",authenticateUser, userLogout);

export default router;