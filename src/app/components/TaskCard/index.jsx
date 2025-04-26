import './styles.scss'
import {FaRegStar} from "react-icons/fa";
import {FaPen} from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import {FaStar} from "react-icons/fa";
import {useState} from "react";
import {ImCheckboxChecked} from "react-icons/im";

export const TaskCard = ({dueDate, title, description, priority, onEdit, onDelete}) => {

    const [isFavourite, setIsFavourite] = useState(false);

    const toggleFavourite = () => {
        setIsFavourite(!isFavourite);
    }
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
                    {!isFavourite ? <FaRegStar style={{color: 'blue', cursor: 'pointer'}} onClick={toggleFavourite}/> :
                        <FaStar style={{color: 'blue', cursor: 'pointer'}} onClick={toggleFavourite}/>}
                    <FaPen style={{color: 'green', cursor: 'pointer'}} onClick={onEdit}/>
                    <MdDelete style={{color: 'red', cursor: 'pointer'}} onClick={onDelete}/>

                </div>
            </div>
        </div>
    );
};
