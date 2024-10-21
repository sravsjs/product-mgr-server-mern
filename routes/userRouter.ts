import express, { Request,Response, Router } from "express";
import * as usercontroller from "../controller/users/usercontroller";
const userRouter:express.Router = Router();
import { body } from "express-validator";
import { formLoggerMiddleWare } from "../middleWare/formLoggerMiddleware";
import { authMiddleware } from "../middleWare/authMiddleware";
/** 
   @usage:Register user
   @method: post
   @params: username,email,password
   @url: http://localhost:9000/users/register
   */
 userRouter.post("/register",[ 
    body("username").isLength({min:4,max:10}).withMessage("Username is required"),
    body("email").isEmail().withMessage("proper Email is required"),
    body("password").isStrongPassword({minLength:6}).withMessage("strong password is required")
],formLoggerMiddleWare,async(request:Request,response:Response)=>{
    return await usercontroller.registerUser(request,response)
 })
 /**
   @usage:login user
   @method: post
   @params: email,password
   @url: http://localhost:9000/users/login
   */
 userRouter.post("/login",[ 
    body("email").isEmail().withMessage("proper Email is required"),
    body("password").isStrongPassword({minLength:6}).withMessage("strong password is required")
],formLoggerMiddleWare,async(request:Request,response:Response)=>{
    return await usercontroller.loginUser(request,response)
 })
 /**
   @usage:get user Info
   @method: GET
   @body:no-body
   @access:private
   @url: http://localhost:9000/users/me
   */
 userRouter.get("/me",[ 
],authMiddleware,async(request:Request,response:Response)=>{
    return await usercontroller.getUserinfo(request,response)
 })
 
 export default userRouter;