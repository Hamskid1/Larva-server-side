import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
        },
    studentNumber:{
        type:Number,
        required:true
        },
    course:{
        type: String,
        required: true
        },
    cohort: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D', 'E']
        },
        Tutor:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tutor'
        }
},{timestamps : true});

const Student = mongoose.model('Student', studentSchema);
export default Student;