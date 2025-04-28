import './styles.scss'
import { FaRegStar, FaStar, FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useFavourites } from "@/app/context/FavouriteContext";

export const TaskCard = ({ dueDate, title, description, priority, onEdit, onDelete, id, task }) => {
    const { addFavourite, removeFavourite, isFavourite } = useFavourites();

    const toggleFavourite = async () => {
        if (isFavourite(id)) {
            await removeFavourite(id);
        } else {
            await addFavourite(task);
        }
    };

    return (
        <div className='card'>
            <div>
                <h3 className='card-title'>{title}</h3>
                <p className='card-descr'>{description}</p>
            </div>

            <div>
                <p>{dueDate}</p>
                <p>{priority}</p>
                <div>
                    {isFavourite(id) ?
                        <FaStar style={{color: 'blue', cursor: 'pointer'}} onClick={toggleFavourite}/> :
                        <FaRegStar style={{color: 'blue', cursor: 'pointer'}} onClick={toggleFavourite}/>
                    }
                    <FaPen style={{color: 'green', cursor: 'pointer'}} onClick={onEdit}/>
                    <MdDelete style={{color: 'red', cursor: 'pointer'}} onClick={onDelete}/>
                </div>
            </div>
        </div>
    );
};
