import mongoose from "mongoose";

const tutorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
    }]

},{timestamps:true});
const Tutor = mongoose.model('Tutor', tutorSchema);
export default Tutor;