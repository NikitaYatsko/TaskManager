import './styles.scss'
const Modal = ({modalIsOpen}) => {
    return (
        <div className={modalIsOpen ? 'modal is-open' : ''}>
            <div className="modal-content">
                <h4>
                    title
                </h4>
                <p>
                    <input type="text" placeholder="write task"/>
                </p>
            </div>
        </div>
    )
}
export default Modal;