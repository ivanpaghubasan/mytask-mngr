import axios from 'axios';
import React, { useState } from "react";


const AddTask: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tasks', {
                title,
                description,
            });
            setTitle('');
            setDescription('');
            window.location.reload();
        } catch (error) {
            console.error('Error adding task: ', error);
        }
    }
    return (
        <>
            <h2>Add New Task</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <input 
                        type='text'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <textarea 
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type='submit'>Add Task</button>
            </form>
        </>
        
    );
};

export default AddTask;
