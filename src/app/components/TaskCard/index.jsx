import './styles.scss'
import {FaRegStar} from "react-icons/fa";
import {FaPen} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

export const TaskCard = ({dueDate, title, description, priority}) => {
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
                    <FaRegStar style={{color: 'red'}}/>
                    <FaPen style={{color: 'red'}}/>
                    <MdDelete style={{color: 'red'}}/>
                </div>
            </div>
        </div>
    )
}