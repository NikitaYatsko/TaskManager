'use client'

import { useFavourites } from "@/app/context/FavouriteContext";
import { TaskCard } from "@/app/components/TaskCard";
import Main from "@/app/components/main";
import Navbar from "@/app/components/navbar";
import Sidebar from "@/app/components/sidebar";

export default function FavouritesPage() {
    const { favourites } = useFavourites();

    return (
        <div>
            <Navbar></Navbar>
            <Sidebar/>
            <Main>
                <h2>Favourite Tasks</h2>
                <div style={{display: "flex", gap: '10px', flexWrap: 'wrap'}}>
                    {favourites.length > 0 ? (
                        favourites.map((task) => (
                            <TaskCard
                                key={task.id}
                                id={task.id}
                                task={task}
                                title={task.title}
                                description={task.description}
                                priority={task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                                dueDate={task.dueDate}
                                onEdit={() => {}} // На этой странице редактировать не нужно
                                onDelete={() => {}} // И удалять тоже
                            />
                        ))
                    ) : (
                        <p>No favourite tasks yet.</p>
                    )}
                </div>
            </Main>
        </div>
    );
}
