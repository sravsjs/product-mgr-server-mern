
import { response } from "express";
import mongoose from "mongoose";


export class DbconnectionUtil{
    public static connectToMongoDb(connectionString:string,databaseName:string):Promise<boolean|any>{
       return new Promise((resolve, reject) => {
        mongoose.connect(connectionString,{
            dbName :databaseName
          }).then((response)=>{
             if(response){  
                
                resolve(true);
             }
          }).catch((error)=>{
           
            reject(error)
          })
       })
    }
}