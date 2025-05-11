import PropTypes from 'prop-types'

import { Task } from '../Task/Task'
import './taskList.css'

export function TaskList({
  todoData,
  toggleDone,
  deleteTask,
  pauseTimer,
  startTimer,
  updateTaskDescription,
  handleEdit,
  handleInputChange,
  handleKeyUp,
  cancelEdit,
}) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todoData.map((task) => {
          return (
            <Task
              key={task.id}
              id={task.id}
              createdDate={task.createdDate}
              description={task.description}
              minTimer={task.minTimer}
              secTimer={task.secTimer}
              remainingSeconds={task.remainingSeconds}
              done={task.done}
              toggleDone={toggleDone}
              deleteTask={deleteTask}
              totalSeconds={task.totalSeconds}
              pauseTimer={pauseTimer}
              startTimer={startTimer}
              updateTaskDescription={updateTaskDescription}
              handleEdit={handleEdit}
              isEdit={task.isEdit}
              handleInputChange={handleInputChange}
              newDescr={task.newDescr}
              handleKeyUp={handleKeyUp}
              cancelEdit={cancelEdit}
            />
          )
        })}
      </ul>
    </section>
  )
}

TaskList.propTypes = {
  todoData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      done: PropTypes.bool.isRequired,
    })
  ).isRequired,
  toggleDone: PropTypes.func,
  deleteTask: PropTypes.func,
  pauseTimer: PropTypes.func,
  startTimer: PropTypes.func,
  updateTaskDescription: PropTypes.func,
  handleEdit: PropTypes.func,
  handleInputChange: PropTypes.func,
  handleKeyUp: PropTypes.func,
  cancelEdit: PropTypes.func,
}
