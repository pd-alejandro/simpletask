export default function CheckboxComponent({ toggleIsDone, id, isDone }) {
    return (
        <>
            <input
                type="checkbox"
                name={`check__${id}`}
                className="checkbox--hidden"
                aria-hidden={true}
                tabIndex={-1} />
            <label
                htmlFor={`check__${id}`}
                className={`task-item__label checkmark ${isDone ? "checkmark--checked" : ""}`}
                onClick={(e) => toggleIsDone(e, id)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        toggleIsDone(e, id)
                    }
                }}
                aria-label={`mark as ${isDone ? 'pending' : 'done'}`}
                role="checkbox"
                tabIndex={0}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="check-icon"
                    aria-hidden={true}>
                    <path
                        d="m144.915 256 67.66 128 154.51-256" />
                </svg>
            </label>
        </>
    )
}