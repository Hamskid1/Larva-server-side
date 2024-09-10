// controllers/studentController.js
import Student from '../models/StudentsModels.js'; 

// @desc   Create a new student
// @route  POST /api/students
export const createStudent = async (req, res) => {
    const { name, studentNumber, course, cohort, Tutor } = req.body;

    try {
        const newStudent = new Student({
            name,
            studentNumber,
            course,
            cohort,
            Tutor
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Get all students
// @route  GET /api/students
export const getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate('Tutor'); 
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Get a student by ID
// @route  GET /api/students/:id
export const getStudentById = async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id).populate('Tutor');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Update a student by ID
// @route  PUT /api/students/:id
export const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, studentNumber, course, cohort, Tutor } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            { name, studentNumber, course, cohort, Tutor },
            { new: true, runValidators: true }
        );

        if (!updatedStudent) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc   Delete a student by ID
// @route  DELETE /api/students/:id
export const deleteStudent = async (req, res) => {
    const { id } = req.params

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
