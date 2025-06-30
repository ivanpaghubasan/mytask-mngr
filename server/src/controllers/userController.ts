import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'mysecret12345';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, email, password } = req.body;
        // Check user
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            res.status(409).json({ message: 'User already exists '});
            return;
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user: ', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] }).select('+password'); // Explicitly select password for comparison
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successfull', token});
    } catch (error) {
        console.error('Error logging in: ', error);
        res.status(500).json({ message: 'Server Error' });
    }
};