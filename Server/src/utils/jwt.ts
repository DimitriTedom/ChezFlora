import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET is not defined in .env ")
    }
export const generateToken = (id:string,email:string,role:string,name:string):string =>{
    return jwt.sign({id,email,role,name},JWT_SECRET,{expiresIn:'60m'});
};

export const verifyToken = (token:string):any => {
    try {
        return jwt.verify(token,JWT_SECRET);
    } catch (error) {
        return null;
    }
}