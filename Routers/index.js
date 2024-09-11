import { Router } from "express";
import attendanceRoute from "./attendanceRoute.js"
import studentRoute from "./studentRoute.js"
import tutorRoute from "./tutorRoute.js"


const router = Router()



router.use(attendanceRoute)
router.use(studentRoute)
router.use(tutorRoute)



export default router
