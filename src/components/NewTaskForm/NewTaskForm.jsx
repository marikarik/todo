import PropTypes from 'prop-types'
import './newTaskForm.css'
import { useState } from 'react'

export const NewTaskForm = ({ addTask, tick }) => {
  const [description, setDescription] = useState('')
  const [minTimer, setMinTimer] = useState('')
  const [secTimer, setSecTimer] = useState('')

  const addInputInTask = (event) => {
    setDescription(event.target.value)
  }

  const addInputInMinTimer = (event) => {
    setMinTimer(event.target.value)
  }

  const addInputInSecTimer = (event) => {
    const sec = event.target.value
    const secNum = parseInt(sec)
    if (secNum > 59) {
      setSecTimer('59')
    } else {
      setSecTimer(sec)
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    let newTask = addTask(description, minTimer, secTimer)
    setDescription('')
    setMinTimer('')
    setSecTimer('')
    tick(newTask.id)
  }

  const handleInputChange = (event) => {
    const forbiddenCharacters = ['-', '+', '.']
    let value = event.key
    for (let key of forbiddenCharacters) {
      if (key === value) {
        event.preventDefault()
      }
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          required
          onChange={addInputInTask}
          value={description}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="number"
          required
          onKeyDown={handleInputChange}
          onChange={addInputInMinTimer}
          value={minTimer}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="number"
          onChange={addInputInSecTimer}
          onKeyDown={handleInputChange}
          value={secTimer}
        />
        <input type="submit" hidden />
      </form>
    </header>
  )
}
NewTaskForm.propTypes = {
  addTask: PropTypes.func.isRequired,
  tick: PropTypes.func.isRequired,
}
