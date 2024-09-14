import express from "express";
import {
    getSuperAdmins,registerSuperAdmin,loginSuperAdmin,logoutSuperAdmin,authStatus,updateSuperAdmin,deleteSuperAdmin} from "../Controllers/superAdminController.js"
import { headerAuth } from "../Utils/authMiddleware.js"; // Import your authentication middleware

const router = express.Router();

// Fetch all SuperAdmins
router.get("/superAdmins", headerAuth, getSuperAdmins);

// Register a new SuperAdmin
router.post("/superAdmins/register", registerSuperAdmin);

// SuperAdmin Login
router.post("/superAdmins/login", loginSuperAdmin);

// SuperAdmin Logout
router.post("/superAdmins/logout",logoutSuperAdmin);

// Get current SuperAdmin status (authentication status)
router.get("/superAdmins/status", headerAuth, authStatus);

// Update SuperAdmin details
router.put("/superAdmins/:id", headerAuth, updateSuperAdmin);

// Delete a SuperAdmin
router.delete("/superAdmins/:id", headerAuth, deleteSuperAdmin);

export default router;
