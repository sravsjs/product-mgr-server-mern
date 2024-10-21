
import mongoose from "mongoose";
import { IGroup } from "../Models/IGroup";

const groupschema = new mongoose.Schema<IGroup>({
    name:{type:String,required:true,unique:true},
    
},{timestamps:true});


const GroupTable = mongoose.model("groups",groupschema);
export default GroupTable;