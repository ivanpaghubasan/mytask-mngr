import express from 'express';
import cors from 'cors';
import connectDB from './db';
import taskRoutes from './routes/taskRoutes';
import userRoutes from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const startServer = async (): Promise<void> => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

startServer();

export default app;