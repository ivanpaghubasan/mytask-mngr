import React, { useEffect, useState } from "react";
import type { ITask } from "../../../server/src/models/Task";

type Props = {
    task: ITask;
    onUpdate: (updatedTask: {_id: string; title: string; description: string; completed: boolean}) => void;
    onCancel: () => void;
};

const EditTask: React.FC<Props> = ({ task, onUpdate, onCancel }) => {
    const [title, setTitle] = useState<string>(task.title);
    const [description, setDescription] = useState<string>(task.description || '');
    const [completed, setCompleted] = useState<boolean>(task.completed);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description || '');
        setCompleted(task.completed);
    }, [task]);

    const handleSave = () => {
        onUpdate({_id: String(task._id), title, description, completed});
    };
    return (
        <>
            <h3>Edit Task</h3>
            <div>
                <label htmlFor='edit-title'>Title: </label>
                <input 
                    type='text'
                    id='edit-title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor='edit-description'>Description: </label>
                <textarea 
                    id='edit-description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor='edit-completed'>Completed: </label>
                <input 
                    type='checkbox'
                    id='edit-completed'
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
            </div>
            <button onClick={handleSave}>Save</button>
            <button onClick={onCancel}>Cancel</button>
        </>
    );
};

export default EditTask;
