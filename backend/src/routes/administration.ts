import {check , validationResult} from 'express-validator'
import { errorHandler } from '../utils/errorHandler';
import express , { Request , Response , NextFunction } from 'express';
import { addAdministrationRecord, getAdministrationsForMedication, getAdministrationsForResident } from '../controller/administration.controller';
import { verifyTokens } from '../utils/verifyJWT';

const router = express.Router()

/*
handling route along with a middleware to validate the data before sending it to the controller
*/
router.post('/add-administration-record' , [
    check('residentId' , 'residentId is required ').isMongoId().notEmpty(),
    check('medicationId' , 'medicationId is required').isMongoId().notEmpty(),
    check('date' , 'Date is required').isISO8601().toDate().notEmpty(),
    check('administeredBy' , 'administeredBy is required').isString().notEmpty(),
    ] ,
    (req: Request , res: Response , next: NextFunction) => {
        const error = validationResult(req);
        const errorMessages = error.array().map(err => err.msg).join(', ');
        if(!error.isEmpty()) return next(errorHandler(400 , errorMessages ))
        
        next();
    }
    ,verifyTokens , addAdministrationRecord);


router.get('/administrations-for-resident/:id' , getAdministrationsForResident)

router.get('/administrations-for-medication/:id' , getAdministrationsForMedication)

export default router;