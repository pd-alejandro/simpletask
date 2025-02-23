export default function RemoveComponent({ removeTask }) {
    return (
        <div
            className="task-item__remove">
            <button
                className="task-item__remove-button"
                onClick={removeTask}
                aria-label="delete task">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="cross-icon"
                    aria-hidden={true}>
                    <path
                        d="m144.915 367.085 222.17-222.17M144.915 144.915l222.17 222.17" />
                </svg>
            </button>
        </div>
    )
}