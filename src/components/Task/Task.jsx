import React from 'react'
import PropTypes from 'prop-types'
import './task.css'
import { formatDistanceToNow } from 'date-fns'

export class Task extends React.Component {
  static defaultProps = {
    description: 'указать задачу',
    toggleDone: () => {},
    deleteTask: () => {},
  }
  static propTypes = {
    done: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    toggleDone: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    createdDate: PropTypes.instanceOf(Date),
    remainingSeconds: PropTypes.func,
    pauseTimer: PropTypes.func,
    startTimer: PropTypes.func,
    isEdit: PropTypes.bool,
    handleInputChange: PropTypes.func,
    newDescr: PropTypes.string,
    handleKeyUp: PropTypes.func,
    cancelEdit: PropTypes.func,
    handleEdit: PropTypes.func,
  }
  handleClick = () => {
    this.props.toggleDone(this.props.id)
  }
  handleDelete = () => {
    this.props.deleteTask(this.props.id)
  }

  render() {
    const {
      done,
      description,
      createdDate,
      remainingSeconds,
      pauseTimer,
      startTimer,
      id,
      isEdit,
      handleInputChange,
      newDescr,
      handleKeyUp,
      cancelEdit,
    } = this.props
    let classNames = ''
    if (done) {
      classNames = 'completed'
    }
    if (isEdit) classNames = 'editing'
    const timeCreated = formatDistanceToNow(createdDate, { includeSeconds: true, addSuffix: true })

    const min = Math.floor(remainingSeconds / 60)
    const sec = remainingSeconds % 60

    return (
      <li className={classNames}>
        <div className="view">
          {isEdit ? (
            <input
              type="text"
              className="edit"
              autoFocus
              value={newDescr}
              onChange={(event) => handleInputChange(id, event)}
              onKeyUp={(event) => handleKeyUp(id, event)}
            />
          ) : (
            <>
              <input
                className="toggle"
                type="checkbox"
                checked={done}
                onChange={this.handleClick}
              />
              <label>
                <span className="title">{description}</span>
                <span className="description">
                  <button className="icon icon-play" onClick={() => startTimer(id)} />
                  <button className="icon icon-pause" onClick={() => pauseTimer(id)} />
                  {String(min).length < 2 ? String(min).padStart(2, 0) : String(min)}:
                  {String(sec).padStart(2, 0)}
                </span>
                <span className="description">created {timeCreated}</span>
              </label>
              <button className="icon icon-edit" onClick={() => this.props.handleEdit(id)}></button>
              <button className="icon icon-destroy" onClick={this.handleDelete}></button>
            </>
          )}
        </div>
      </li>
    )
  }
}
