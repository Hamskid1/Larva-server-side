import SuperAdmin from "../models/superAdminModel.js"; // Assuming the model is in the "models" folder
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Fetch all SuperAdmins (for administrative purposes)
export const getSuperAdmins = async (req, res) => {
    try {
        const superAdmins = await SuperAdmin.find();
        if (superAdmins.length === 0) {
            return res.status(404).json({ message: "No super admin found in the database" });
        }
        return res.status(200).json(superAdmins);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Register a new SuperAdmin
export const registerSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the SuperAdmin already exists
        const existingSuperAdmin = await SuperAdmin.findOne({ email });
        if (existingSuperAdmin) {
            return res.status(400).json({ message: "Super admin already exists with this email" });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new SuperAdmin
        const superAdmin = new SuperAdmin({
            email,
            password: hashedPassword,
            role: "superAdmin"
        });

        // Save to database
        await superAdmin.save();

        return res.status(201).json({ message: "Super admin registered successfully", superAdmin });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// SuperAdmin Login (Authentication)
export const loginSuperAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if SuperAdmin exists
        const superAdmin = await SuperAdmin.findOne({ email: email });
        if (!superAdmin) {
            return res.status(404).json({ message: "Super admin not found" });
        }

        // Compare the password with the hashed password
        const isMatch = await bcrypt.compare(password, superAdmin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: superAdmin._id, role: superAdmin.role }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRATION
        });

        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Logout SuperAdmin by clearing the token
export const logoutSuperAdmin = async (req, res) => {
    try {
        // Clear the token from cookies (if using cookies)
        res.clearCookie("token");

        // Optionally, invalidate the token (if stored in a database or blacklist system)

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// Get current SuperAdmin status (authentication status)
export const authStatus = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                authenticated: false,
                message: "Invalid token"
            });
        }

        const superAdmin = await SuperAdmin.findById(req.user.id);
        if (!superAdmin) {
            return res.status(404).json({
                authenticated: false,
                message: "Super admin not found"
            });
        }

        return res.status(200).json({
            authenticated: true,
            id: superAdmin._id,
            email: superAdmin.email,
            role: superAdmin.role
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Update SuperAdmin details (Admin can update only their own details)
export const updateSuperAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        // Find the SuperAdmin by ID
        let superAdmin = await SuperAdmin.findById(id);
        if (!superAdmin) {
            return res.status(404).json({ message: "Super admin not found" });
        }

        // Update fields if they exist
        if (email) superAdmin.email = email;
        if (password) {
            const saltRounds = 10;
            superAdmin.password = await bcrypt.hash(password, saltRounds);
        }

        // Save updated SuperAdmin
        await superAdmin.save();
        return res.status(200).json({ message: "Super admin updated successfully", superAdmin });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete a SuperAdmin (Admin role check could be added here)

export const deleteSuperAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        const superAdmin = await SuperAdmin.findByIdAndDelete(id);
        if (!superAdmin) {
            return res.status(404).json({ message: "Super admin not found" });
        }

        return res.status(200).json({ message: "Super admin deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

