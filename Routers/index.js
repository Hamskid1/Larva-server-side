import { Router } from "express";
import attendanceRoute from "./attendanceRoute.js"
import studentRoute from "./studentRoute.js"

const router = Router()



router.use(attendanceRoute)
router.use(studentRoute)


export default router
