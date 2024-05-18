import mongoose, { Document } from 'mongoose';

// Define interface for medication document
interface IMedication extends Document {
    name: string;
    dosage: string
}

// Define medication schema
const medicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dosage: {
        type : String , 
        required: true
    },
});

// Create medication model
const Medication = mongoose.model<IMedication>("Medication", medicationSchema);

export default Medication;