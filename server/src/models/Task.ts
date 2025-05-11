import mongoose, { Schema, Document, mongo } from 'mongoose';

interface ITask extends Document {
    title: string;
    description?: string;
    completed: boolean;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
}, { timestamps: true });

const Task = mongoose.model<ITask>('Task', TaskSchema);

export default Task;
export { ITask };