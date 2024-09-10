import { Router } from 'express';
import { createAttendance, readAttendance, updateAttendance } from '../Controllers/attendanceController.js';

const router = Router();

router.post('/attendance', createAttendance);
router.get('/attendance', readAttendance);
router.put('/attendance/:id', updateAttendance);


export default router;