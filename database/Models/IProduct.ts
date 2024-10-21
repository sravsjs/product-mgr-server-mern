import mongoose from "mongoose";

export interface IProduct{
    name:string;
    user:mongoose.Types.ObjectId;
    imageurl:string;
    qty:number;
    price:number;
    groupId:string;
    _id?:string;
    createdAt?: Date;
    updatedAt?: Date;
}
