import mongoose from "mongoose";
import { IUser } from "../Models/IUser";
const userSchema = new mongoose.Schema<IUser>({
   username:{type:String,required:true},
   email: {type:String,required:true,unique:true},
    password:{type:String,required:true},
    imageurl:{type:String,required:true},
    isAdmin:{type:Boolean,default:false},
    isSuperAdmin:{type:Boolean,default:false},
    
},{timestamps:true})
const UserTable = mongoose.model("users",userSchema);
console.log(UserTable);
export default UserTable;















































