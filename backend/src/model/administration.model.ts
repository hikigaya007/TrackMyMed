import mongoose, { Document, Schema } from 'mongoose';

// Interface for the Administration document
interface IAdministration extends Document {
    residentId: Schema.Types.ObjectId;
    medicationId: Schema.Types.ObjectId;
    date: Date;
    administeredBy: string;
}

// Administration schema definition
const administrationSchema = new mongoose.Schema({
    residentId: {
        type: Schema.Types.ObjectId,
        ref: 'Resident',
        required: true,
    },
    medicationId: {
        type: Schema.Types.ObjectId,
        ref: 'Medication',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    administeredBy: {
        type: String,
        required: true,
    },
});

// Administration model
const Administration = mongoose.model<IAdministration>('Administration', administrationSchema);

export default Administration;
