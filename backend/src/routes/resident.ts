import { addResident, getResident, updateResident } from '../controller/resident.controller'
import {check , validationResult} from 'express-validator'
import { errorHandler } from '../utils/errorHandler';
import express , { Request , Response , NextFunction } from 'express';

const router = express.Router()

/*
handling route along with a middleware to validate the data before sending it to the controller
*/
router.post('/add-resident' , [
    check('name' , 'Name is required ').isString().notEmpty(),
    check('dob' , 'Date of birth is required').isISO8601().toDate(),
    ] ,
    (req: Request , res: Response , next: NextFunction) => {
        const error = validationResult(req);
        const errorMessages = error.array().map(err => err.msg).join(', ');
        if(!error.isEmpty()) return next(errorHandler(400 , errorMessages ))
        
        next();
    }
    , addResident);


router.put('/update-resident/:id' , updateResident)

router.get('/get-resident' , getResident)

export default router;