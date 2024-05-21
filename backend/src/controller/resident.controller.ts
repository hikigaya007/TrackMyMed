import { Request , Response , NextFunction } from "express";
import Resident from "../model/resident.model";
import { errorHandler } from "../utils/errorHandler";

// controller to add a new resident
export const addResident = async(req: Request , res: Response , next: NextFunction) => {

    const {name , dob} = req.body ;

    try {

        const addResident = new Resident({name , dob})

        await addResident.save();

        res
        .status(200)
        .json({message: "Resident added Successfully"})

    } catch (error) {
        next(error)
    }

}

// controller to update a existing resident
export const updateResident = async(req: Request , res: Response , next: NextFunction) => {

    const id = req.params.id;

    try {

        const {name , dob} = req.body;

        const resident = await Resident.findById(id);

        if(!resident) return next(errorHandler(404 , 'Resident not found'))
        
        if (name === undefined && dob === undefined) {
            return next(errorHandler(400 , 'No changes provided'));
        }
        
        if (name === resident.name && dob === resident.dob) {
            return next(errorHandler(400 , 'No changes provided'));
        }

        if (name !== undefined) {
            resident.name = name;
        }
        if (dob !== undefined) {
            resident.dob = dob;
        }

        await resident.save();
        
        res
        .status(200)
        .json({message: "Resident Updated Successfully"})
        

    } catch (error) {
        next(error)
    }

}

// controller to fetch all the resident
export const getResident = async(req: Request , res: Response , next: NextFunction) => {

    try {
        
        const fetchResident = await Resident.find();

        res
        .status(200)
        .json(fetchResident)

    } catch (error) {
        next(error)
    }

}