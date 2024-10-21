import { error } from "console";
import { Request,Response } from "express";
import { validationResult } from "express-validator";
import ProductTable from "../../database/schemas/productschema";
import { IProduct } from "../../database/Models/IProduct";
import mongoose from "mongoose";
import { getAuthUserinfoFromRequestHeader } from "../../Util/userUtil";

/**
   @usage: to Create a contact
   @method: post
   @params: name,imageUrl,qty,price,groupId
   @url: http://localhost:9000/contacts/
   */

 export const createProduct=async(request:Request,response:Response)=>{
   try{
       const user = await getAuthUserinfoFromRequestHeader(request,response);
       if(user){
        const {name,imageurl,qty,price,groupId}=request.body;
        //check the name exist in the products


        const product=  await ProductTable.findOne({name:name,user:user._id})
        if(product){
            return response.status(401).json(({msg:"name is alredy exist in the product!"}));
        }
        const newproduct:IProduct={
            name:name,
            user:new mongoose.Types.ObjectId(user._id),
            imageurl:imageurl,
            qty:qty,
            price:price,
            groupId:groupId
        }
        const createdProduct = await new ProductTable(newproduct).save();
        return response.status(201).json({createdProduct});
       }

    }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}

/**
   @usage: to Get all products
   @method: GET
   @params: no params
   @url: http://localhost:9000/contacts

   */
   export const getAllProducts=async(request:Request,response:Response)=>{
    try{
        const user = await getAuthUserinfoFromRequestHeader(request,response);
       if(user){
        const mongoUserId = new mongoose.Types.ObjectId(user._id)
        const products:IProduct[]= await ProductTable.find({user:mongoUserId}).sort({createdAt:"descending"}); //fisrt one (created) first come in database
        return response.status(200).json(products);
       }
    }
    catch(error:any){
          return response.status(500).json({errors:[error.message]})
    }
}
 /**
    @usage: to Get a contact
    @method: GET
    @params: no params
    @url: http://localhost:9000/:contactId
    */
export const getAProduct=async(request:Request,response:Response)=>{
    try{
        const user = await getAuthUserinfoFromRequestHeader(request,response);
       if(user){
        const{productId}=request.params;
       const mongoproductId = new mongoose.Types.ObjectId(productId);
       const mongouserId = new mongoose.Types.ObjectId(user._id);

       //check if product exists or not
       const product =await ProductTable.findOne({_id:mongoproductId,user:mongouserId});
       console.log(mongoproductId);
       if(!product){
        return response.status(401).json({msg:"no product found!"})
       }
       
       return response.status(200).json(product);
       

            }
        }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
/**
   @usage: to Update a contact
   @method: put
   @params: name,imageUrl,email,mobile,title,company,groupId
   @url: http://localhost:8000/:contactId
   */
 export const updateAProduct=async(request:Request,response:Response)=>{
      try{
        const user = await getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const {name,imageurl,qty,price,groupId}=request.body;
        const{productId}=request.params;
        const mongoproductId =new mongoose.Types.ObjectId(productId);
        
        const mongouserId = new mongoose.Types.ObjectId(user._id);

        const product =await ProductTable.findOne({_id:mongoproductId,user:mongouserId});
       if(!product){
            return response.status(401).json(({msg:"no product found!"}));
        }
        const newproduct:IProduct={
            name:name,
            user:new mongoose.Types.ObjectId(user._id),
            imageurl:imageurl,
            qty:qty,
            price:price,
            groupId:groupId
        }
        const updatedProduct = await ProductTable.findByIdAndUpdate(mongoproductId,{$set:newproduct},{new:true});
        if(updatedProduct){
            return response.status(201).json({updatedProduct});
        }
        }
      
    
        }
      
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
export const deleteAProduct=async(request:Request,response:Response)=>{
    try{
        const user = await getAuthUserinfoFromRequestHeader(request,response);
        if(user){
            const{productId}=request.params;
            const mongoproductId =new mongoose.Types.ObjectId(productId);
        
            const mongouserId = new mongoose.Types.ObjectId(user._id);
    
            const product =await ProductTable.findOne({_id:mongoproductId,user:mongouserId});
        if(!product){
         return response.status(401).json({msg:"no product found!"})
        }
       
        //deleting product
       const deleteAProduct = await ProductTable.findByIdAndDelete(mongoproductId)
            if(deleteAProduct){
                return response.status(200).json({});
            }
             }
            }
    catch(error:any){
        return response.status(500).json({errors:[error.message]})
    }
}
