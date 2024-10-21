import { Request,response,Response } from "express"
import bcryptjs from "bcryptjs";
import gravatar from "gravatar";
import { IUser } from "../../database/Models/IUser";
import UserTable from "../../database/schemas/userschema";
import jwt from "jsonwebtoken";
import { unsubscribe } from "diagnostics_channel";
import mongoose from "mongoose";
import { getAuthUserinfoFromRequestHeader } from "../../Util/userUtil";

export interface UserTokenPayload{
    id:string|undefined;
    email:string
}
/** 
   @usage:Register user
   @method: post
   @params: username,email,password
   @url: http://localhost:9000/users/register
   */
export const registerUser = async(request:Request,response:Response)=>{
     try{
        //read the form data from client
        const {username,email,password} = request.body;

       //check if the password exists or not
        const user = await UserTable.findOne({email:email});
        if(user){
            return response.status(401).json({msg:"email is already exist"});
        }
        //encrypt the password
        const salt=await bcryptjs.genSalt(10);
        const hashPassword= await bcryptjs.hash(password,salt);

        //image url from gravatar
        let imageUrl:string=gravatar.url(email,{
            size:"200",
            rating:"pg",
            default:"mm"
        })
        //create new user
        const newuser:IUser ={
            username:username,
                            email:email,
                            password:hashPassword,
                            imageurl:imageUrl,
                            isAdmin:false,
                            isSuperAdmin:false
        }

        //save to db
        const createdUser = await new UserTable(newuser).save();
       if(createdUser){
         return response.status(200).json({msg:"created user successfully",
             user:createdUser})
       }
     }catch(error:any){
        return response.status(401).json({errors:[error.message]})
     }
}
/**
   @usage:login user
   @method: post
   @params: email,password
   @url: http://localhost:9000/users/login
   */
export const loginUser = async(request:Request,response:Response)=>{
    try{
        //read the form data from client
       const {email,password} =request.body;
        console.log(request.body);
       //check if the email exists or not
       console.log("email:", email);
       const user:IUser|undefined|null = await UserTable.findOne({email:email});
       
       console.log("userdetails:", user);

       if(!user){
           return response.status(401).json({msg:"invalid email"});
       }
        //check if the password exists or not  
       const isMatch:boolean =await bcryptjs.compare(password,user.password)
       if(!isMatch){
        return response.status(401).json({msg:"invalid password"});
       }
       //create secret key
       const secretKey:string|undefined = process.env.JWT_SECRET_KEY;
       if (!secretKey) {
        return response.status(500).json({ msg: "Server configuration error" });
    }
                      const payload:{user:UserTokenPayload}={
                        user:{
                          id:user._id,
                          email:user.email
                        }
                      }

       //create token
       if(secretKey){
                    jwt.sign(payload,secretKey,{
                        algorithm:"HS256",
                        expiresIn:100000000000
                    },(error,encoded)=>{
                        if(error){
                        return response.status(401).json({msg:"unable to generate token"})
                }
                                if(encoded){
                                return response.status(200).json({msg:"Login is success",
                                    token:encoded,
                                    user:user

                                })
                    }
           })
                    }
       
    }catch(error:any){
        return response.status(401).json({errors:[error.message]})
    }
}
/**
   @usage:get user Info
   @method: GET
   @body:no-body
   @access:private
   @url: http://localhost:9999/users/me
   */
  export const getUserinfo = async(request:Request,response:Response)=>{
  try{
    const user = await getAuthUserinfoFromRequestHeader(request,response);
    if(user){
     return response.status(200).json({user:user});
    }

  }catch(error:any){
    return response.status(500).json({errors:[error.message]});
}
  }