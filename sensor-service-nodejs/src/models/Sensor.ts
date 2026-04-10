import mongoose, { Document, Schema } from 'mongoose';

export interface ISensor extends Document {
    name: string;
    type: 'TEMPERATURE' | 'HUMIDITY' | 'MOISTURE' | 'LIGHT' | 'PH';
    zoneId: number;
    currentValue: number;
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
    createdAt: Date;
    updatedAt: Date;
}

const sensorSchema: Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Sensor name is required'],
            trim: true
        },
        type: {
            type: String,
            required: [true, 'Sensor type is required'],
            enum: ['TEMPERATURE', 'HUMIDITY', 'MOISTURE', 'LIGHT', 'PH'],
            uppercase: true
        },
        zoneId: {
            type: Number,
            required: [true, 'Zone ID is required']
        },
        currentValue: {
            type: Number,
            required: [true, 'Current value is required']
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'INACTIVE', 'MAINTENANCE'],
            default: 'ACTIVE'
        }
    },
    {
        timestamps: true
    }
);

sensorSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // @ts-ignore
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;

        // @ts-ignore
        delete returnedObject.__v;
    }
});

const Sensor = mongoose.model<ISensor>('Sensor', sensorSchema);

export default Sensor;
