import {check , validationResult} from 'express-validator'
import { errorHandler } from '../utils/errorHandler';
import express , { Request , Response , NextFunction } from 'express';
import { signin, signout, signup } from '../controller/auth.controller';

const router = express.Router()

/*
handling route along with a middleware to validate the data before sending it to the controller
*/
router.post('/sign-up' , [
    check('username' , 'username is required ').isString().notEmpty(),
    check('password' , 'password is required and must be min length of 6 Character').isString().notEmpty().isLength({min : 6}),
    check('confirmPassword' , 'confirmPassword is required').isString().notEmpty(),

    ] ,
    (req: Request , res: Response , next: NextFunction) => {
        const error = validationResult(req);
        const errorMessages = error.array().map(err => err.msg).join(', ');
        if(!error.isEmpty()) return next(errorHandler(400 , errorMessages ))
        
        next();
    }
    , signup);


router.post('/sign-in' , 
    [
    check('username' , 'username is required ').isString().notEmpty(),
    check('password' , 'password is required').isString().notEmpty(),
    ] ,
    (req: Request , res: Response , next: NextFunction) => {
        const error = validationResult(req);
        const errorMessages = error.array().map(err => err.msg).join(', ');
        if(!error.isEmpty()) return next(errorHandler(400 , errorMessages ))
        
        next();
    }

    ,signin)

router.post('/sign-out' , signout)

export default router;