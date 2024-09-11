import Tutor from "../models/tutorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Fetch all tutors
export const getTutors = async (req, res) => {
    try {
        const tutors = await Tutor.find();
        if (tutors.length === 0) {
            return res.status(404).json({ message: "No tutors found in the database" });
        }
        return res.status(200).json(tutors);
    } catch (error) {
        return res.status(500).json({ "Message": error.message });
    }
};

// Register a new tutor with hashed password
export const postTutor = async (req, res) => {
    if (!name || !email || !phone || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
    try {
        const { name, email, phone, password } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hashSync(password, saltRounds);

        const tutor = new Tutor({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        });

        await tutor.save();
        return res.status(201).json(tutor);
    } catch (error) {
        return res.status(500).json({ "Message": error.message });
    }
};

// Tutor login (authentication)
export const loginTutor = async (req, res) => {
    try {
        const { email, password } = req.body;
        const tutor = await Tutor.findOne({ email: email });
        
        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" });
        }

        const isMatch = await bcrypt.compareSync(password, tutor.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT Token
        const accessToken = jwt.sign({ id: tutor._id }, process.env.SECRET_KEY, {
            expiresIn: process.env.EXPIRATION
        });

        return res.status(200).json({ msg: "Login successful", accessToken });
    } catch (error) {
        return res.status(500).json({ "Message": error.message });
    }
};

// Check tutor authentication status
export const authStatus = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                Authentication: false,
                msg: "Invalid Token"
            });
        }

        const tutor = await Tutor.findOne({ _id: req.user.id });
        if (!tutor) {
            return res.status(404).json({
                Authenticated: false,
                msg: "Tutor not found"
            });
        }

        return res.status(200).json({
            Authenticated: true,
            message: "Tutor authenticated",
            id: tutor._id,
            name: tutor.name
        });
    } catch (error) {
        return res.status(500).json({ "Message": error.message });
    }
};

// Logout the tutor
export const tutorLogout = async (req, res) => {
    try {
        res.clearCookie("accessToken");
        return res.status(200).json({ msg: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ "Logout Fail": error.message });
    }
};

// Update tutor details by ID
export const putSingleTutor = async (req, res) => {
    try {
        const { id } = req.params;
        const updateTutor = req.body;

        const tutor = await Tutor.findByIdAndUpdate(id, updateTutor, { new: true });
        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" });
        }

        return res.status(200).json({ message: "Tutor updated successfully" });
    } catch (error) {
        return res.status(500).json({ "Something went wrong": error.message });
    }
};

// Delete a tutor by ID
export const deleteSingleTutor = async (req, res) => {
    try {
        const { id } = req.params;

        const tutor = await Tutor.findByIdAndDelete(id);
        if (!tutor) {
            return res.status(404).json({ message: "Tutor not found" });
        }

        return res.status(200).json({ message: "Tutor deleted successfully" });
    } catch (error) {
        return res.status(500).json({ "Something went wrong": error.message });
    }
};

