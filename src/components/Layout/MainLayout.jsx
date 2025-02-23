import { useState, useEffect, useRef, createRef } from 'react'
import { nanoid } from 'nanoid'
import Task from '../Task/Task'

export default function MainLayout() {
    let [taskArray, setTaskArray] = useState([])
    let [isNewTask, setIsNewTask] = useState(false)

    let tasksRef = useRef({})
    let tasksTextRef = useRef({})

    // get tasks from localstorage OR create the first one
    useEffect(() => {
        const storedItems = loadTasksFromLocalStorage()
        setTaskArray(storedItems)
        if (storedItems.length === 0) createTask()
    }, [])

    // set localstorage
    useEffect(() => {
        if (taskArray.length > 0) {
            saveTasksToLocalStorage(taskArray)
        }
    }, [taskArray])

    // focus task on creation
    useEffect(() => {
        if (isNewTask) {
            const taskTextObj = tasksTextRef.current
            if (taskArray.length > 0) {
                taskTextObj[taskArray.length - 1].focus()
            }
        }
    }, [taskArray, isNewTask])

    function toggleIsDone(event, id) {
        event.preventDefault()
        setTaskArray((prevTaskArray) => {
            return prevTaskArray.map(taskObj =>
                taskObj.id === id ?
                    {
                        ...taskObj,
                        isDone: !taskObj.isDone
                    }
                    :
                    taskObj
            )
        })
        setIsNewTask(false)
    }

    function updateValue(index, id) {
        let newValue = tasksTextRef.current[index].innerHTML

        setTaskArray((prevTaskArray) => {
            return prevTaskArray.map(taskObj =>
                taskObj.id === id ?
                    {
                        ...taskObj,
                        value: newValue
                    }
                    :
                    taskObj
            )
        })
        setIsNewTask(false)
    }

    function createTask() {
        setTaskArray(prevTaskArray => ([
            ...prevTaskArray,
            {
                id: nanoid(),
                value: '',
                isDone: false
            }
        ]))
        setIsNewTask(true)
    }

    function removeTask(refTask, id, index) {
        refTask.current.classList.add('removing-task')
        refTask.current.style.setProperty('--height', `${refTask.current.offsetHeight}px`)
        // timeout to allow css animation before task is removed
        setTimeout(() => setTaskArray(
            prevTaskArray => {
                const newTaskArray = prevTaskArray.filter(
                    taskObj => {
                        if (taskObj.id !== id) return taskObj
                    }
                )
                if (newTaskArray.length === 0) localStorage.removeItem('taskArray')
                return newTaskArray
            }
        ), 300)
        setIsNewTask(false)

        delete tasksRef.current[id]
        delete tasksTextRef.current[index]
    }

    function generateTasks() {
        let taskElements = taskArray.map(
            (task, index) => {
                if (!tasksRef.current[task.id]) {
                    tasksRef.current[task.id] = createRef()
                }
                return (<Task
                    key={task.id}
                    ref={tasksRef.current[task.id]}
                    taskTextRef={tasksTextRef}
                    index={index}
                    task={task}
                    toggleIsDone={toggleIsDone}
                    updateValue={updateValue}
                    removeTask={removeTask} />)
            }
        )
        return taskElements
    }

    // localstorage functions
    const saveTasksToLocalStorage = (array) => {
        const jsonArray = JSON.stringify(array)
        localStorage.setItem('taskArray', jsonArray)
    }

    const loadTasksFromLocalStorage = () => {
        const jsonArray = localStorage.getItem('taskArray')
        if (jsonArray) {
            return JSON.parse(jsonArray)
        }
        return []
    }

    return (
        <main>
            <div
                id="task-container">
                <ul
                    className="task-list">
                    {generateTasks()}
                </ul>
                <button
                    className="task-list__add-button"
                    onClick={createTask}>
                        Add new task
                </button>
            </div>
        </main>
    )
}