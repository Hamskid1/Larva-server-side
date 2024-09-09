import { Router } from 'express';
import { createAttendance, readAttendance, updateAttendance } from '../Controllers/attendanceController.js';

const router = Router();

router.post('/api/attendance', createAttendance);
router.get('/api/attendance', readAttendance);
router.put('/api/attendance/:id', updateAttendance);


export default router;