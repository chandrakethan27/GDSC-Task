import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {
    event,
    login,
    register,
} from "../controllers/user.js";

const router = express.Router();

router.post("/eventregister",verifyToken,event);
router.post("/login", login);
router.post("/register", register); 

export default router;