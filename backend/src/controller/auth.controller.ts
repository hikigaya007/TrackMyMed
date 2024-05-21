import Auth from "../model/auth.model";
import {Request , Response , NextFunction} from 'express'
import { errorHandler } from "../utils/errorHandler";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const signup = async( req: Request , res: Response , next: NextFunction) => {

    const {username , password  , confirmPassword} = req.body;

    try {
        
        const usernameExist = await Auth.findOne({username})

        if(usernameExist) return next(errorHandler(400 , 'username already exist'))

        if(password !== confirmPassword) return next(errorHandler(400  , 'password doesnt match'))

        const hashPassword = bcryptjs.hashSync(password , 10)

        const createUser = new Auth({username , password : hashPassword})

        await createUser.save();

        res
        .status(200)
        .json({message: "User created successfully"})

    } catch (error) {
        next(error);
    }

}

export const signin = async(req: Request , res: Response , next: NextFunction) => {

    const {username , password} = req.body;

    try {
        
        const validUser = await Auth.findOne({ username });
        if(!validUser) return next(errorHandler(400 , "User Not Found"))
        
        const validPassword =  bcryptjs.compareSync(password , validUser?.password)
        if(!validPassword) return next(errorHandler(400 , "Invalid Credential"))

        const token =  jwt.sign({id: validUser._id} , process.env.JWT_KEY as string , {
            expiresIn: '2h'
        } )
    
    
        const createdUser = await Auth.findById(validUser?._id).select("-password")
    
    
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 2 * 60 * 60 * 1000)
        });
    
        res.status(200).json(createdUser);

    } catch (error) {
        next(error)
    }

}

export const signout = (req: Request, res: Response, next: NextFunction) => {
    try {

        res.clearCookie('accessToken');

        res.status(200).json({ message: "User signed out successfully" });

    } catch (error) {
        next(error);
    }
}