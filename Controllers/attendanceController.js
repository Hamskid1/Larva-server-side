import Attendance from "../Models/AttendanceModels.js"

export const createAttendance = async (req, res) => {
    try {
        const { attendanceStatus, studentId } = req.body
        const attendance = new Attendance({ attendanceStatus, studentId })
        await attendance.save()
        res.status(201).json({ message: "Attendance created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const readAttendance = async (req, res) => {
    try {
        const attendance = await Attendance.find().populate("studentId",)
        if (attendance.lenght === 0) {
            res.status(404).json({ message: "No attendance found" })
        }
        res.status(200).json(attendance)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const updateAttendance = async (req, res) => {
    try {
        const { id } = req.params
        const { attendanceStatus } = req.body
        const attendance = await Attendance.findByIdAndUpdate(id, { attendanceStatus }, { new: true })
        if (!attendance) {
            res.status(404).json({ message: "Attendance not found" })
        }
        res.status(200).json({ message: "Attendance updated successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// export const deleteAttendance = async (req, res) => {
//     try {
//         const { id } = req.params
//         const attendance = await Attendance.findByIdAndDelete(id)
//         if (!attendance) {
//             res.status(404).json({ message: "Attendance not found" })
//         }
//         res.status(200).json({ message: "Attendance deleted successfully" })
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// }
