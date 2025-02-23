import CheckboxComponent from './CheckboxComponent'
import ContentComponent from './ContentComponent'
import RemoveComponent from './RemoveComponent'


export default function Task(props) {
    const removeTask = () => props.removeTask(props.ref, props.task.id, props.index)

    return (
        <li
            ref={props.ref}
            id={`task-${props.task.id}`}
            className="task-item">
            <CheckboxComponent
                toggleIsDone={props.toggleIsDone}
                id={props.task.id}
                isDone={props.task.isDone} />
            <ContentComponent
                ref={props.taskTextRef}
                index={props.index}
                updateValue={props.updateValue}
                id={props.task.id}
                value={props.task.value} />
            <RemoveComponent
                removeTask={removeTask} />
        </li>
    )
}