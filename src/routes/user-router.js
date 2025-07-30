import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import passport from "passport";


const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/sessions/current", passport.authenticate("current",{ session: false }),userController.usuarioFormat);
router.get("/emitTokenRecovery", userController.recoverPassword)
router.post("/changePassword", passport.authenticate("recovery",{ session: false }),userController.changePassword)

export default router;
