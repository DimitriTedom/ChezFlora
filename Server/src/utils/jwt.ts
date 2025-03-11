import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in .env ")
    }
export const generateToken = (userId:string,email:string,userRole:string,userName:string):string =>{
    return jwt.sign({userId,email,userRole,userName},JWT_SECRET,{expiresIn:'60m'});
};

export const verifyToken = (token:string):any => {
    try {
        return jwt.verify(token,JWT_SECRET);
    } catch (error) {
        return null;
    }
}