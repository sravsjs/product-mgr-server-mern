import { Request,Response,NextFunction } from "express";

import { validationResult} from "express-validator";

export const formLoggerMiddleWare=(request:Request,response:Response,next:NextFunction)=>{
    
    const result= validationResult(request);
    console.log(result.array())
            if(!result.isEmpty()){
                return response.status(400).json({errors:result.array()})
            }
            next();
}