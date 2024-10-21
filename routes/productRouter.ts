import { Request,Response,Router } from "express";
import {body,ExpressValidator, validationResult} from "express-validator"
import * as Productcontroller from "../controller/products/Productcontroller";
import { formLoggerMiddleWare } from "../middleWare/formLoggerMiddleware";
import { authMiddleware } from "../middleWare/authMiddleware";
 /**
   @usage: to Create a contact
   @method: post
   @params: name,imageUrl,qty,price,groupId
   @access:private
   @url: http://localhost:9000/contacts/
   */

const productRouter:Router=Router();
productRouter.post("/",[
    body("name").not().isEmpty().withMessage("name is required"),
    body("imageurl").not().isEmpty().withMessage("imageurl is required"),
    body("qty").not().isEmpty().withMessage("qty is required"),
    body("price").not().isEmpty().withMessage("price is required"),
    body("groupId").not().isEmpty().withMessage("groupId is required")],formLoggerMiddleWare,authMiddleware,async(request:Request,response:Response)=>{
   
        return await Productcontroller.createProduct(request,response);
})
/**
   @usage: to Get all contacts
   @method: GET
   @params: no params
   @access:private
   @url: http://localhost:9000/contacts
   */

   productRouter.get("/",authMiddleware,async(request:Request,response:Response)=>{
   
        return await Productcontroller.getAllProducts(request,response);
})
/**
    @usage: to Get a contact
    @method: GET
    @params: no params
    @access:private
    @url: http://localhost:9000/:contactId
    */
    productRouter.get("/:productId",authMiddleware,async(request:Request,response:Response)=>{
   
        return await Productcontroller.getAProduct(request,response);
})

/**
   @usage: to Update a contact
   @method: put
   @params: name,imageUrl,email,mobile,title,company,groupId
   @access:private
   @url: http://localhost:8000/:contactId
   */
   productRouter.put("/:productId",[
    body("name").not().isEmpty().withMessage("name is required"),
    body("imageurl").not().isEmpty().withMessage("imageurl is required"),
    body("qty").not().isEmpty().withMessage("qty is required"),
    body("price").not().isEmpty().withMessage("price is required"),
    body("groupId").not().isEmpty().withMessage("groupId is required")],formLoggerMiddleWare,authMiddleware,async(request:Request,response:Response)=>{
   
    return await Productcontroller.updateAProduct(request,response);
})

 /**
   @usage: to Delete a contact
   @method: delete
   @params: name,imageUrl,email,mobile,title,company,groupId
   @access:private
   @url: http://localhost:9000/:contactId
   */
   productRouter.delete("/:productId",authMiddleware,async(request:Request,response:Response)=>{
   
    return await Productcontroller.deleteAProduct(request,response);
})
   export default productRouter;