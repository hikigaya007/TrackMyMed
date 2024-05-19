import { Request , Response , NextFunction } from "express";
import Medication from "../model/medication.model";
import { errorHandler } from "../utils/errorHandler";

// controller to add a new Medication
export const addMedication = async(req: Request , res: Response , next: NextFunction) => {

    const {name , dosage} = req.body ;

    try {

        const addMedication = new Medication({name , dosage})

        await addMedication.save();

        res
        .status(200)
        .json({message: "Medication added Successfully"})

    } catch (error) {
        next(error)
    }

}

// controller to update a existing medication
export const updateMedication = async(req: Request , res: Response , next: NextFunction) => {

    const id = req.params.id;

    try {

        const {name , dosage} = req.body;

        const medication = await Medication.findById(id);

        if(!medication) return next(errorHandler(404 , 'Medication not found'))
        
        if (name === undefined && dosage === undefined) {
            return next(errorHandler(400 , 'No changes provided'));
        }
        
        if (name === medication.name && dosage === medication.dosage) {
            return next(errorHandler(400 , 'No changes provided'));
        }

        if (name !== undefined) {
            medication.name = name;
        }
        if (dosage !== undefined) {
            medication.dosage = dosage;
        }

        await medication.save();
        
        res
        .status(200)
        .json({message: "Medication Updated Successfully"})
        

    } catch (error) {
        next(error)
    }

}

// controller to fetch all the medicaton
export const getMedication = async(req: Request , res: Response , next: NextFunction) => {

    try {
        
        const fetchMedication = await Medication.find();

        res
        .status(200)
        .json({data: fetchMedication})

    } catch (error) {
        next(error)
    }

}