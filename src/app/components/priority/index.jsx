import './styles.scss'

export const Priority = ({ onFilterChange }) => {
    const priorities = ["All", "Low", "Middle", "High"];

    return (
        <div className='priority-wrapper'>
            {priorities.map((p) => (
                <div
                    key={p}
                    className='priority-wrapper-item'
                    onClick={() => onFilterChange(p)}
                >
                    {p}
                </div>
            ))}
        </div>
    );
};
