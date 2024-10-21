
import mongoose from "mongoose";
import { IProduct } from "../../database/Models/IProduct";

const productschema = new mongoose.Schema<IProduct>({
    name:{type:String,required:true,unique:true},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'users',required:true},
    imageurl:{type:String,required:true},
    qty:{type:Number,required:true},
    price:{type:Number,required:true},
    groupId:{type:String,required:true},
},{timestamps:true});

const ProductTable = mongoose.model("products",productschema);
export default ProductTable;