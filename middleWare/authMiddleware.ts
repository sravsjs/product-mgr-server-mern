import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserTokenPayload } from "../controller/users/usercontroller";
export const authMiddleware =async(request:Request,response:Response,next:NextFunction)=> {
 try{
  //read the token from request header
  const token = request.headers['x-auth-token'];
  if(!token){
       return response.status(401).json({msg:"no token provided"});
  }

  const secretKey:string | undefined= process.env.JWT_SECRET_KEY;

  if(secretKey && token && typeof token === "string"){
     
        const decode:any|{user:UserTokenPayload} = jwt.verify(token,secretKey,{algorithms:["HS256"]})//scanning the token to get payload
        if(!decode){
            return response.status(401).json({msg:"Invalid  token provided"});
        }

     const {user} =decode;
     request.headers['user-info']=user;
           
  }
  next();
 }catch(error){
    return response.status(401).json({msg:"no token provided"})
 }

}