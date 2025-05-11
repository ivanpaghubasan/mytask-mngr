import axios from "axios";
import React, { useEffect, useState } from "react";
import type { ITask } from "../../../server/src/models/Task";
import EditTask from "./EditTask";

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [editingTask, setEditingTask] = useState<ITask | null>(null);

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching task: ", error);
        }
    };

    const handleEdit = async (task: ITask) => {
        setEditingTask(task);
    };

    const handleDelete = async (id: string) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            fetchTask();
        } catch (error) {
            console.error("Error deleting task: ", error);
        }
    };

    const handleUpdateTask = async (updatedTask: {_id: string; title: string; description: string; completed: boolean}) => {
        try {
            await axios.put(
                `http://localhost:5000/api/tasks/${updatedTask._id}`,
                updatedTask
            );
            fetchTask();
            setEditingTask(null);
        } catch (error) {
            console.error("Error updating task: ", error);
        }
    };
    return (
        <>
            <h2>Tasks</h2>
            {!tasks.length ? 'No tasks' : tasks.map((task) => (
                <div key={String(task._id)}>
                    <span>{task.title}</span>
                    {task.description && <p>{task.description}</p>}
                    <span>Completed: {task.completed ? "Yes" : "No"}</span>
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(String(task._id))}>
                        Delete
                    </button>
                </div>
            ))}
            {editingTask && (
                <EditTask
                    task={editingTask}
                    onUpdate={handleUpdateTask}
                    onCancel={() => setEditingTask(null)}
                />
            )}
        </>
    );
};

export default TaskList;
