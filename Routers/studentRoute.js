import { Router } from 'express';
import {createStudent, getStudents, getStudentById, updateStudent, deleteStudent} from "../Controllers/studentController.js"

const router = Router();

router.post('/student',createStudent);
router.get('/student',getStudents);
router.get('/student/:id',getStudentById);
router.put('/student',updateStudent);
router.delete('/student',deleteStudent);




export default router;