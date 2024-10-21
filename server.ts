import  express,{Request,Response,Application} from "express";
import productRouter from "./routes/productRouter";
import groupRouter from "./routes/groupRouter";
import dotEnv from "dotenv"
import { loggerMiddleWare } from "./middleWare/loggerMiddleware";
import { DbconnectionUtil } from "./database/collections/Dbconnectionutil";
import userRouter from "./routes/userRouter";
import cors from "cors";

const app:Application=express();

//configure cors
app.use(cors())

//configure dotenv
dotEnv.config({path:'./.env'})

//configure the express to read the form data
app.use(express.json());

//configure the logger middleware
app.use(loggerMiddleWare);



const port:Number|string|undefined =process.env.PORT ||9999;
const databaseUrl: string|undefined=process.env.MONGO_DB_CLOud_URL;
const databasename: string|undefined =process.env.DATABASE_NAME;

app.get("/",(request:Request,response:Response)=>{
    response.status(201);
    response.json({
        msg: "welocme to the express js",
    

    })
})

//configure routes
app.use("/products",productRouter)
app.use("/groups",groupRouter)
app.use("/users",userRouter)

if(port && databaseUrl && databasename){
    app.listen(Number(port),()=>{
         DbconnectionUtil.connectToMongoDb(databaseUrl,databasename).then((response)=>{
            if(response){
                console.log("Connected db successfully");
            }
        }).catch((error)=>{
             console.log(error,"unable to connecct!");
             process.exit(0)// force stop server
        })
        console.log( `express server is running on ${port}`)
     }) 
}
