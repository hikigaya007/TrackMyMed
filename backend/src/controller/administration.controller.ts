import { Request , Response , NextFunction } from "express";
import Administration from "../model/administration.model";
import { errorHandler } from "../utils/errorHandler";

// controller to add a administration record
export const addAdministrationRecord = async(req: Request , res: Response , next: NextFunction) => {

    const {residentId , medicationId , date , administeredBy} = req.body;

    try {
        
        const newRecord = new Administration({
            residentId ,
            medicationId,
            date,
            administeredBy
        })

        await newRecord.save();

        res
        .status(200)
        .json({message: "Record Created SuccessFully"})

    } catch (error) {
        next(error)
    }

}

// controller to fetch administration record based on resident
export const getAdministrationsForResident = async(req: Request , res: Response , next: NextFunction) => {

    const {id} = req.params;
    
    try {
        
        const fetchRecords = await Administration.find({residentId: id})

        if(fetchRecords.length === 0) return next(errorHandler(404 , 'Records not found for the specified resident'))

        res
        .status(200)
        .json({data: fetchRecords})

    } catch (error) {
        next(error)
    }

}
// controller to fetch administration record based on medication
export const getAdministrationsForMedication = async(req: Request , res: Response , next: NextFunction) => {

    const {id} = req.params;
    
    try {
        
        const fetchRecords = await Administration.find({medicationId: id})

        if(fetchRecords.length === 0) return next(errorHandler(404 , 'Records not found for the specified medication'))

        res
        .status(200)
        .json({data: fetchRecords})

    } catch (error) {
        next(error)
    }

}