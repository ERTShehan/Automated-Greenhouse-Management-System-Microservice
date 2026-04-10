import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { registerWithEureka } from './config/eureka.js';
import sensorRoutes from './routes/sensorRoutes.js';

dotenv.config();
connectDB();

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api/sensors', sensorRoutes);

app.get('/actuator/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'UP' });
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 8082;
app.listen(PORT, () => {
    console.log(`TypeScript Server running on port ${PORT}`);
    registerWithEureka();
});
