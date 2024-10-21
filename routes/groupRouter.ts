import { Request,Response,Router } from "express";
import { body} from "express-validator";
import * as groupcontroller from "../controller/groups/groupcontroller";
import { formLoggerMiddleWare } from "../middleWare/formLoggerMiddleware";
  /**
   @usage:create a group
   @method: PUSH
   @params: name
   @url: http://localhost:9000/groups/
   */
  
const groupRouter:Router=Router();
    
    groupRouter.post("/",[
    body("name").not().isEmpty().withMessage("name is required")],formLoggerMiddleWare,async(request:Request,response:Response)=>{
    return await groupcontroller.createGroup(request,response)
    })
    
    groupRouter.get("/",async(request:Request,response:Response)=>{
      return await groupcontroller.getAllGroups(request,response)
    })

    groupRouter.get("/:groupId",async(request:Request,response:Response)=>{
      return await groupcontroller.getAGroup(request,response)
    })

    

export default groupRouter;