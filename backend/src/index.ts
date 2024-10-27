import express, { Application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import sessionRoutes from './routes/sessions';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGODB_URI as string;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
    .connect(CONNECTION_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Use routes
app.use('/api/sessions', sessionRoutes);