import mongoose, { Document } from 'mongoose';

// Define interface for resident document
interface IResident extends Document {
    dob: Date;
    name: string
}

// Define resident schema
const residentSchema = new mongoose.Schema({
    dob: {
        type: Date,
        required: true,
    },
    name: {
        type : String , 
        required: true
    },
});

// Create resident model
const Resident = mongoose.model<IResident>("Resident", residentSchema);

export default Resident;
