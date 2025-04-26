import './styles.scss'
import {LuLayoutDashboard} from "react-icons/lu";
import {MdChecklist} from "react-icons/md";
import {CiSettings} from "react-icons/ci";
import {RiTaskLine} from "react-icons/ri";
import {FaRegStar} from "react-icons/fa";

const Sidebar = () => {
    return (

        <div className="sidebar">
            <RiTaskLine className="main-logo"/>
            <h3>Tasker</h3>
            <div>
                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <LuLayoutDashboard className='sidebar-icons'/>
                    </li>
                    <li className="sidebar-item">
                        <MdChecklist className='sidebar-icons'/>
                    </li>
                    <li>
                        <FaRegStar className='sidebar-icons'/>
                    </li>
                    <li className="sidebar-item">
                        <CiSettings className='sidebar-icons'/>
                    </li>
                </ul>
            </div>
        </div>


    )
}
export default Sidebar;