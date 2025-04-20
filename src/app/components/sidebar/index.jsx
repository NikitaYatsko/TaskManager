import './styles.scss'
import {LuLayoutDashboard} from "react-icons/lu";
import {MdChecklist} from "react-icons/md";
import {CiSettings} from "react-icons/ci";
import Navbar from "@/app/components/navbar";

const Sidebar = ({children}) => {
    return (
        <>
            <div className="sidebar">
                <ul className="sidebar-list">
                    <li className="sidebar-item">
                        <LuLayoutDashboard className='sidebar-icons'/>
                    </li>
                    <li className="sidebar-item">
                        <MdChecklist className='sidebar-icons'/>
                    </li>
                    <li className="sidebar-item">
                        <CiSettings className='sidebar-icons'/>
                    </li>
                </ul>
            </div>
            <main className='main'>

                {children}
            </main>
        </>
    )
}
export default Sidebar;