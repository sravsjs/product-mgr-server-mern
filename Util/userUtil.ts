import { Request,Response } from "express";
import * as usercontroller from "../controller/users/usercontroller";
import UserTable from "../database/schemas/userschema";
import mongoose from "mongoose";
import { promises } from "dns";
import { IUser } from "../database/Models/IUser";

export const getAuthUserinfoFromRequestHeader =  async(request:Request,response:Response):Promise<IUser|any|boolean>=>{
    try{
      return new Promise(async(resolve, reject) => {
        const userInfo:any =  request.headers['user-info'];
        if(userInfo && userInfo.id){
            const mongoUserId = new mongoose.Types.ObjectId(userInfo.id)
            const user= await UserTable.findById(mongoUserId);
           if(!user){
            reject(false);
            return response.status(401).json({msg:"no user found"})
           }
           resolve(user);
        }
      })
        
    }catch(error:any){
        return response.status(401).json({msg:"Unable to get user Info!"})
    }
}