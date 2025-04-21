"use client"
import {useState} from "react";
import './styles.scss';

export default function Modal({onClose, onAddTask}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [dueDate, setDueDate] = useState("");

    const handleAddTask = () => {
        const newTask = {
            title,
            description,
            priority,
            dueDate,
        };
        onAddTask(newTask);  // Отправляем данные в родительский компонент
        onClose(); // Закрываем модалку
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Add New Task</h2>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" placeholder="Task title" value={title}
                           onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" rows="3" placeholder="Write details..." value={description}
                              onChange={(e) => setDescription(e.target.value)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" className="priority" value={priority}
                            onChange={(e) => setPriority(e.target.value)}>
                        <option value="low">Low</option>
                        <option value="middle">Middle</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Due Date</label>
                    <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)}/>
                </div>

                <button className="addtask-btn" onClick={handleAddTask}>
                    Add Task
                </button>
            </div>
        </div>
    );
}
