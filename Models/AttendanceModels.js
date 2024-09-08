import mongoose from "mongoose";

const attendaceSchema = mongoose.Schema({
    attendanceStatus: { type: String, required: true,enum:['Present', 'Absent', 'Left']},
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        date: {
            type: Date,
            default: Date.now
        } ,
        required: true
    }
}, {timestamps : true});

const Attendance = mongoose.model('Attendance', attendaceSchema);
module.exports = Attendance;