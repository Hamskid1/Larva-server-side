import mongoose from "mongoose";

const superAdminSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
        },
    role:{
        type:String,
        required:true,
        default:"superAdmin",
        enum:["superAdmin","admin","user"]
    }
}, {timestamps:true});
const SuperAdmin = mongoose.model("SuperAdmin",superAdminSchema);
export default SuperAdmin;