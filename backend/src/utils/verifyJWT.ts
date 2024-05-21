import jwt from "jsonwebtoken";
import { errorHandler } from "./errorHandler";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express {
      interface Request {
        user?: any; 
      }
    }
  }

export const verifyTokens = (req: Request , res:Response , next: NextFunction ) => {
    const token = req.cookies.accessToken;
    console.log(token)

    if(!token) return next(errorHandler(401 , "Unauthorized"))

    jwt.verify(token , process.env.JWT_KEY as string , (err: any ,user: any) =>{
        if(err) return next(errorHandler(403, 'forbidden'))

        req.user = user;
        next();
    });
    
};