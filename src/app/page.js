'use client'

import Navbar from "@/app/components/navbar";
import Sidebar from "@/app/components/sidebar";
import {useState, useEffect} from "react";
import Modal from "@/app/components/modal/modal";
import {TaskCard} from "@/app/components/TaskCard";
import {Priority} from "@/app/components/priority";

export default function Home() {
    const [modal, setModal] = useState(false);
    const [tasks, setTasks] = useState([]);

    const closeModal = () => {
        setModal(false);
    }

    // Функция для загрузки задач с JSONBin
    useEffect(() => {
        const getTasks = async () => {
            try {
                const res = await fetch(`https://api.jsonbin.io/v3/b/680626eb8561e97a500431c2/latest`, {
                    headers: {
                        "X-Master-Key": "$2a$10$mXl34Qr4DiJ3nE0JoyVJQOND8FlEKjMzxzeNtbFy93xE7GnJfsVUe",
                    },
                });
                const data = await res.json();
                setTasks(data.record);  // Сохраняем задачи в стейт
            } catch (error) {
                console.error("Ошибка при загрузке задач:", error);
            }
        };

        getTasks();  // Загружаем задачи при монтировании компонента
    }, []);


    const addTask = async (newTask) => {
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);

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
                throw new Error("Ошибка при отправке задачи");
            }
        } catch (error) {
            console.error("Ошибка при сохранении задачи:", error);
        }
    };


    const calcAmountOfTasks = () => {
        return tasks.length;
    }

    return (
        <>
            <Navbar setModal={setModal} amountOfTasks={calcAmountOfTasks()} />
            {modal && <Modal onClose={closeModal} onAddTask={addTask} />}
            <Sidebar/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h2>All Tasks</h2>
                <Priority/>
            </div>
            <div style={{display: "flex", gap: "10px", flexWrap: 'wrap', margin: '0 auto', padding: "10px"}}>
                {tasks.map((task, index) => (
                    <TaskCard
                        key={index}
                        title={task.title}
                        description={task.description}
                        priority={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        dueDate={task.dueDate}
                    />

                ))}
            </div>


        </>
    );
}
