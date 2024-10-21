import { error, group } from "console";
import { Request,Response } from "express";
import { validationResult } from "express-validator";
import { IGroup } from "../../database/Models/IGroup";
import GroupTable from "../../database/schemas/groupschema";
import { IProduct } from "../../database/Models/IProduct";
import mongoose from "mongoose";


export const createGroup=async(request:Request,response:Response)=>{

    try{
           const{name} = request.body;
           
           //check if name exist or not in groups
           const group = await GroupTable.findOne({name:name}) // select * from groups where name="kfghjk"
          
           if(group){
            return response.status(401).json({msg:"group is already exists!"});
           } 
          const newGroup:IGroup={
            name:name
          }
          const createdObject = await new GroupTable(newGroup).save();//insert
              if(createdObject){
                return response.status(200).json({group:createdObject})
              }
            }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
export const getAllGroups=async(request:Request,response:Response)=>{
    try{
        const groups = await GroupTable.find();//to find all groups
        return response.status(200).json(groups);
    }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
export const getAGroup=async(request:Request,response:Response)=>{
    try{
         const {groupId}=request.params;
         const mongogroupId = new mongoose.Types.ObjectId(groupId);//converting groupid to mongo groupid
         const group = await GroupTable.findById(mongogroupId);//select * from groups whrere the group_id=""
         if(!group){
            return response.status(404).json({msg:"group is not exist"});
         }
         return response.status(200).json(group);
    
    }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}