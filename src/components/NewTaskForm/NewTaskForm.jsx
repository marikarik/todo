import PropTypes from 'prop-types'
import './newTaskForm.css'
import React from 'react'

export class NewTaskForm extends React.Component {
  state = {
    description: '',
    minTimer: '',
    secTimer: '',
  }
  static defaultProps = {
    createTask: () => {},
    addTask: () => {},
    tick: () => {},
  }
  static propTypes = {
    createTask: PropTypes.func,
    addTask: PropTypes.func,
    tick: PropTypes.func,
  }

  addInputInTask = (event) => {
    this.setState({ description: event.target.value })
  }

  addInputInMinTimer = (event) => {
    this.setState({ minTimer: event.target.value })
  }

  addInputInSecTimer = (event) => {
    const sec = event.target.value
    const secNum = parseInt(sec)
    if (secNum > 59) {
      this.setState({ secTimer: '59' })
    } else {
      this.setState({ secTimer: sec })
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    let newTask = this.props.addTask(
      this.state.description,
      this.state.minTimer,
      this.state.secTimer
    )

    this.setState(
      {
        description: '',
        minTimer: '',
        secTimer: '',
      },
      () => {
        this.props.tick(newTask.id)
      }
    )
  }

  handleInputChange = (event) => {
    const forbiddenCharacters = ['-', '+', '.']
    let value = event.key
    for (let key of forbiddenCharacters) {
      if (key === value) {
        event.preventDefault()
      }
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            required
            onChange={this.addInputInTask}
            value={this.state.description}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="number"
            required
            onKeyDown={this.handleInputChange}
            onChange={this.addInputInMinTimer}
            value={this.state.minTimer}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="number"
            onChange={this.addInputInSecTimer}
            onKeyDown={this.handleInputChange}
            value={this.state.secTimer}
          />
          <input type="submit" hidden />
        </form>
      </header>
    )
  }
}
