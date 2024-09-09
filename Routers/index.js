import { Router } from "express";
import attendanceRoute from "./attendanceRoute.js"

const router = Router()



router.use(attendanceRoute)


export default router
