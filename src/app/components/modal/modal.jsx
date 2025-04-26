'use client'
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './styles.scss';

export default function Modal({ onClose, onAddTask, existingTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [dueDate, setDueDate] = useState("");
    const [completed, setCompleted] = useState("No");

    useEffect(() => {
        if (existingTask) {
            setTitle(existingTask.title);
            setDescription(existingTask.description);
            setPriority(existingTask.priority);
            setDueDate(existingTask.dueDate);
            setCompleted(existingTask.completed || "No");
        }
    }, [existingTask]);

    const handleAddTask = () => {
        const newTask = {
            id: existingTask?.id || uuidv4(), // Генерация ID
            title,
            description,
            priority,
            dueDate,
            completed,
        };
        onAddTask(newTask);
        onClose();
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">
                    {existingTask ? "Edit Task" : "Add New Task"}
                </h2>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="middle">Middle</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="completed">Task Complete</label>
                    <select
                        id="completed"
                        value={completed}
                        onChange={(e) => setCompleted(e.target.value)}
                    >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                    </select>
                </div>

                <button className="addtask-btn" onClick={handleAddTask}>
                    {existingTask ? "Save Changes" : "Add Task"}
                </button>
            </div>
        </div>
    );
}
