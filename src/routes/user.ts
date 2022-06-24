import express from "express";
import {
  loginPage,
  signupPage,
  validateToken,
  register,
  postLogin,
  getAllUsers,
  logoutUser,
} from "../controllers/user";
import isAuthenticated from "../middleware/isAuth";

const router = express.Router();

router.get("/login", loginPage);
router.get("/signup", signupPage);
router.get("/validate", validateToken);

router.post("/login", postLogin);
router.post("/signup", register);
router.post("/logout", logoutUser);

router.get("/getallusers", isAuthenticated, getAllUsers);

export default router;
