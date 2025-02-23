export default function ContentComponent({ ref, index, updateValue, id, value }) {
    return (
        <div
            ref={(el) => ref.current[index] = el}
            className="task-item__name"
            onBlur={() => updateValue(index, id)}
            contentEditable
            suppressContentEditableWarning
            dangerouslySetInnerHTML={{ __html: value }}
            aria-label="Write your task here"
            role="textbox" />
    )
}