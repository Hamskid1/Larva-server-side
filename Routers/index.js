import { Router } from "express";
import attendanceRoute from "./attendanceRoute.js"
import studentRoute from "./studentRoute.js"
import tutorRoute from "./tutorRoute.js"
import superAdminRoute from "./superAdminRoute.js";


const router = Router()



router.use(attendanceRoute)
router.use(studentRoute)
router.use(tutorRoute)
router.use(superAdminRoute)



export default router
