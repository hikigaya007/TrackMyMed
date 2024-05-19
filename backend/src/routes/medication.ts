import {check , validationResult} from 'express-validator'
import { errorHandler } from '../utils/errorHandler';
import express , { Request , Response , NextFunction } from 'express';
import { addMedication, getMedication, updateMedication } from '../controller/medication.controller';

const router = express.Router()

/*
handling route along with a middleware to validate the data before sending it to the controller
*/
router.post('/add-medication' , [
    check('name' , 'Name is required ').isString().notEmpty(),
    check('dosage' , 'Date of birth is required').isString().notEmpty(),
    ] ,
    (req: Request , res: Response , next: NextFunction) => {
        const error = validationResult(req);
        const errorMessages = error.array().map(err => err.msg).join(', ');
        if(!error.isEmpty()) return next(errorHandler(400 , errorMessages ))
        
        next();
    }
    , addMedication);


router.put('/update-medication/:id' , updateMedication)

router.get('/get-medication' , getMedication)

export default router;