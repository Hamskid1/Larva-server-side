import express from "express";
import {getTutors,postTutor,loginTutor,authStatus,tutorLogout,putSingleTutor,deleteSingleTutor} from "../Controllers/tutorController.js";
import { headerAuth } from "../Utils/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/tutors", getTutors);
router.post("/register", postTutor);
router.post("/login", loginTutor);

// Protected routes
router.get("/authStatus", headerAuth, authStatus);
router.post("/logout", headerAuth, tutorLogout); 
router.put("/tutors:id", headerAuth, putSingleTutor); 
router.delete("/tutors:id", headerAuth, deleteSingleTutor); 

export default router;