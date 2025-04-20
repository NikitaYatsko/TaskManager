import './styles.scss'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div>Hello Admin you have 4 tasks</div>
            <div>
                <button className='navbar-addbutton'>
                    Add new Task
                </button>
            </div>
        </div>
    )
}
export default Navbar;