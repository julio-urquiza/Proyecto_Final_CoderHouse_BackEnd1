import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import passport from "passport";


const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/sessions/current", passport.authenticate("jwt",{ session: false }), (req, res) => res.send(req.user));

export default router;
