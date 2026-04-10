import { Request, Response } from 'express';
import Sensor, { ISensor } from '../models/Sensor.js';

export const getSensors = async (req: Request, res: Response): Promise<void> => {
    try {
        const sensors = await Sensor.find();
        res.status(200).json(sensors);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getSensorById = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const sensor = await Sensor.findById(req.params.id);
        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }
        res.status(200).json(sensor);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createSensor = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, type, zoneId, currentValue, status } = req.body;
        
        const sensor: ISensor = new Sensor({
            name,
            type,
            zoneId,
            currentValue,
            status
        });

        const createdSensor = await sensor.save();
        res.status(201).json(createdSensor);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const updateSensor = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { name, type, zoneId, currentValue, status } = req.body;

        const sensor = await Sensor.findById(req.params.id);

        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }

        sensor.name = name || sensor.name;
        sensor.type = type || sensor.type;
        sensor.zoneId = zoneId !== undefined ? zoneId : sensor.zoneId;
        sensor.currentValue = currentValue !== undefined ? currentValue : sensor.currentValue;
        sensor.status = status || sensor.status;

        const updatedSensor = await sensor.save();
        res.status(200).json(updatedSensor);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteSensor = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const sensor = await Sensor.findById(req.params.id);

        if (!sensor) {
            return res.status(404).json({ message: 'Sensor not found' });
        }

        await Sensor.deleteOne({ _id: req.params.id });
        res.status(204).json();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
