import express from "express";
import { landingPage } from "../controllers/landing";
import isAuthenticated from "../middleware/isAuth";

const router = express.Router();

router.get("/", landingPage);

export default router;
