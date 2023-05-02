import React from 'react'
import { useState, useEffect } from "react";
import Task from '../Task/Task';
import './FormTask.css'

const FormTask = () => {

  const [task, setTask] = useState( () => {
    const taskLS = localStorage.getItem('task')

    if (taskLS) {
        return JSON.parse(taskLS)
    } else {
        return []
    }
  })

  class ToDo {
    constructor (task, date) {
        this.task = task
        this.date = date
    }
  }

  const addTask = (toDo, date) => {
    setTask([...task, new ToDo(toDo, date)])
  }

  const deleteTask = (taskToDelete) => {
    const updatedTask = task.filter((toDo) => toDo.task !== taskToDelete)

    setTask(updatedTask)
  }

  const [input, setInput] = useState({task: "", date: ""})

  const handleOnchange = (e) => {
    setInput({
      ...input, 
      [e.target.name]: e.target.value
    })
  }

  const handlerSubmit = (e) => {
    e.preventDefault()

    if (input.task.trim() && input.date.trim()){
        addTask(input.task, input.date)
        setInput({task: "", date: ""})
    }
  }

  useEffect( () => {
    localStorage.setItem('task', JSON.stringify(task))
  }, [task])

  return (
    <>
      <fieldset>
        <form onSubmit={handlerSubmit}>

          <h1>Tu nueva tarea</h1>

          <label htmlFor="task">Ingresa una nueva tarea:</label>

          <input type="text" value={input.task} name='task' placeholder='Ingresa una nueva tarea' onChange={handleOnchange} className='input-text'/>

          <label htmlFor="date">Ingresa la fecha:</label>

          <input type="date" value={input.date} name='date' onChange={handleOnchange} className='input-date'/>

          <button type='submit' className='form-btn'>Crear tarea</button>

        </form>
      </fieldset>

      <h2>Tus tareas</h2>

      <ul>
        {
          task.map((task, index) => (
            <Task key={index} {...task} deleteTask={deleteTask}/>
          ))
          }
      </ul>
    </>
  )
}

export default FormTask