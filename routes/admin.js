import express from "express";
import {verifyToken} from "../middleware/auth.js";
import {
    event,
    login,
    getAllEvents,
    eventDelete,
} from "../controllers/admin.js";

const router = express.Router();

router.post("/event", event);
router.post("/login", login); 
router.get('/events', getAllEvents);
router.post('/delete', eventDelete);

export default router;