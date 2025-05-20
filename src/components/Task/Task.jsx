import PropTypes from 'prop-types'
import './task.css'
import { formatDistanceToNow } from 'date-fns'

export const Task = ({
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
  toggleDone,
  deleteTask,
  handleEdit,
}) => {
  const handleClick = () => {
    toggleDone(id)
  }
  const handleDelete = () => {
    deleteTask(id)
  }

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
            <input className="toggle" type="checkbox" checked={done} onChange={handleClick} />
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
            <button
              className="icon icon-edit"
              onClick={(event) => {
                event.stopPropagation()
                handleEdit(id)
              }}
            ></button>
            <button className="icon icon-destroy" onClick={handleDelete}></button>
          </>
        )}
      </div>
    </li>
  )
}

Task.propTypes = {
  done: PropTypes.bool.isRequired,
  description: PropTypes.string.isRequired,
  createdDate: PropTypes.instanceOf(Date).isRequired,
  remainingSeconds: PropTypes.number.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isEdit: PropTypes.bool.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  newDescr: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  toggleDone: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
}
