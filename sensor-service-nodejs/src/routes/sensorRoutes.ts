import express, { Router } from 'express';
import {
    getSensors,
    getSensorById,
    createSensor,
    updateSensor,
    deleteSensor
} from '../controllers/sensorController.js';

const router: Router = express.Router();

router.route('/')
    .get(getSensors)
    .post(createSensor);

router.route('/:id')
    .get(getSensorById)
    .put(updateSensor)
    .delete(deleteSensor);

export default router;
