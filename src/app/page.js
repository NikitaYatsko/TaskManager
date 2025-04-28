'use client'

import Navbar from "@/app/components/navbar";
import Sidebar from "@/app/components/sidebar";
import {useState, useEffect} from "react";
import Modal from "@/app/components/modal/modal";
import {TaskCard} from "@/app/components/TaskCard";
import {Priority} from "@/app/components/priority";
import Main from "@/app/components/main";

export default function Home() {
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [editableTask, setEditableTask] = useState(null);
    const [filter, setFilter] = useState("All");

    const handleFilterChange = (value) => {
        setFilter(value);
    };
    const filteredTasks = filter === "All"
        ? tasks
        : tasks.filter(task => task.priority.toLowerCase() === filter.toLowerCase());

    const handleAddTask = async (newTask) => {
        let updatedTasks;

        if (editableTask) {
            const index = tasks.findIndex(task => task.id === editableTask.id);
            if (index !== -1) {
                updatedTasks = [...tasks];
                updatedTasks[index] = newTask;
            } else {
                console.error("Не удалось найти задачу для редактирования");
                return;
            }
        } else {
            updatedTasks = [...tasks, newTask];
        }

        setTasks(updatedTasks);
        setEditableTask(null);
        setModal(false);

        try {
            const res = await fetch("https://api.jsonbin.io/v3/b/680626eb8561e97a500431c2", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": "$2a$10$mXl34Qr4DiJ3nE0JoyVJQOND8FlEKjMzxzeNtbFy93xE7GnJfsVUe",
                },
                body: JSON.stringify(updatedTasks),
            });

            if (!res.ok) {
                throw new Error("Ошибка при обновлении данных в JSONBin");
            }
        } catch (error) {
            console.error("Ошибка при сохранении:", error);
        }
    };

    const handleEdit = (task) => {
        setEditableTask(task);
        setModal(true);
    };

    const handleDelete = (taskToDelete) => {
        const updatedTasks = tasks.filter(task => task.id !== taskToDelete.id);
        setTasks(updatedTasks);

        fetch("https://api.jsonbin.io/v3/b/680626eb8561e97a500431c2", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-Master-Key": "$2a$10$mXl34Qr4DiJ3nE0JoyVJQOND8FlEKjMzxzeNtbFy93xE7GnJfsVUe",
            },
            body: JSON.stringify(updatedTasks),
        }).catch(error => {
            console.error("Ошибка при удалении задачи:", error);
        });
    };

    const closeModal = () => {
        setModal(false);
        setEditableTask(null);
    };

    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await fetch("https://api.jsonbin.io/v3/b/680626eb8561e97a500431c2/latest", {
                    headers: {
                        "X-Master-Key": "$2a$10$mXl34Qr4DiJ3nE0JoyVJQOND8FlEKjMzxzeNtbFy93xE7GnJfsVUe",
                    },
                });
                const data = await res.json();
                setTasks(data.record);
            } catch (error) {
                console.error("Ошибка при загрузке задач:", error);
            }
        };

        getTasks();
    }, []);

    const calcAmountOfTasks = () => tasks.length;

    return (
        <>
            <Navbar setModal={setModal} amountOfTasks={calcAmountOfTasks()}/>
            {modal && (
                <Modal
                    onClose={closeModal}
                    onAddTask={handleAddTask}
                    existingTask={editableTask}
                />
            )}
            <Sidebar/>

            <Main>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                    <h2>All Tasks</h2>
                    <Priority onFilterChange={handleFilterChange}/>
                </div>
                <div style={{display: "flex", gap: '10px', flexWrap: 'wrap'}}>
                    {filteredTasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            id={task.id}
                            task={task}
                            title={task.title}
                            description={task.description}
                            priority={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            dueDate={task.dueDate}
                            onEdit={() => handleEdit(task)}
                            onDelete={() => handleDelete(task)}
                        />
                    ))}
                </div>
            </Main>
        </>
    );
}
