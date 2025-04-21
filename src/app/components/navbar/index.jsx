import './styles.scss'

const Navbar = ({setModal,amountOfTasks}) => {
    return (
        <div className='navbar'>
            <div>Hello Admin you have {amountOfTasks} tasks</div>
            <div>
                <button onClick={()=>setModal(true)} className='navbar-addbutton'>
                    Add new Task
                </button>
            </div>
        </div>
    )
}
export default Navbar;