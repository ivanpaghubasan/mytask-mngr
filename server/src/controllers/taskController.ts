import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task';

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description } = req.body;
        const task = await Task.create({ title, description });
        res.status(201).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error '});
    }
};

export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find();
    res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
            return;
        }
        res.json(task);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Server Error' });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            res.status(404).json({ message: 'Task not found '});
            return;
        }
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
};