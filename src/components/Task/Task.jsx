import React from 'react'
import './Task.css'

const Task = ({task, date, deleteTask}) => {
    return (
        <li>

            <p>{task}</p>

            <p>{date}</p>

            <button onClick={ () => deleteTask(task)}>❌</button>

        </li>
    )
}

export default Task