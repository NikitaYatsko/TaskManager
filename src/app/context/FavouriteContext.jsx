'use client'

import { createContext, useContext, useState, useEffect } from "react";

const FavouriteContext = createContext();
export const useFavourites = () => useContext(FavouriteContext);

const BIN_ID = "680e47df8960c979a58e5441";
const MASTER_KEY = "$2a$10$mXl34Qr4DiJ3nE0JoyVJQOND8FlEKjMzxzeNtbFy93xE7GnJfsVUe";

export const FavouriteProvider = ({ children }) => {
    const [favourites, setFavourites] = useState([]);

    const fetchFavourites = async () => {
        try {
            const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
                headers: {
                    "X-Master-Key": MASTER_KEY,
                },
            });
            const data = await res.json();
            setFavourites(data.record || []);
        } catch (error) {
            console.error("Ошибка при загрузке избранных:", error);
        }
    };

    useEffect(() => {
        fetchFavourites();
    }, []);

    const saveFavourites = async (updatedFavourites) => {
        try {
            const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "X-Master-Key": MASTER_KEY,
                },
                body: JSON.stringify(updatedFavourites),
            });

            if (!res.ok) {
                throw new Error("Ошибка при сохранении избранных");
            }
        } catch (error) {
            console.error("Ошибка при обновлении избранных:", error);
        }
    };

    const addFavourite = async (task) => {
        // Проверяем, нет ли уже этой задачи в избранном
        if (!favourites.some(fav => fav.id === task.id)) {
            const updatedFavourites = [...favourites, task];
            setFavourites(updatedFavourites);
            await saveFavourites(updatedFavourites);
        }
    };

    const removeFavourite = async (id) => {
        const updatedFavourites = favourites.filter(task => task.id !== id);
        setFavourites(updatedFavourites);
        await saveFavourites(updatedFavourites);
    };

    const isFavourite = (id) => {
        return favourites.some(task => task.id === id);
    };

    return (
        <FavouriteContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite }}>
            {children}
        </FavouriteContext.Provider>
    );
};