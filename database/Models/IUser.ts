
export interface IUser{
   
    username:string;
    email:string;
    password:string;
    imageurl:string;
    isAdmin:boolean;
    isSuperAdmin:boolean;
    _id?:string;
    createdAt?: Date;
    updatedAt?: Date;   
}