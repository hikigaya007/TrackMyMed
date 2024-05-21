import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler";

export const verifyTokens = (req , res , next ) => {
    const token = req.cookies.accessToken;
    console.log(token)

    if(!token) return next(errorHandler(401 , "Unauthorized"))

    jwt.verify(token , process.env.JWT_KEY as string , (err ,user) =>{
        if(err) return next(errorHandler(403, 'forbidden'))

        req.user = user;
        next();
    });
    
};