import { Router } from "express";
import {
  registerUser,
  loginUser,
  generateTokens,
  getUser,
  updateUserDetails,
  updatePassword,
  logoutUser
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", verifyJWT, getUser)

router.post("/refresh-token", generateTokens);


router.post("/logout", verifyJWT, logoutUser);
router.patch("/update-user-details", verifyJWT, updateUserDetails)
router.patch("/update-password", verifyJWT, updatePassword)

export default router;
