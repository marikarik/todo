import PropTypes from "prop-types"

import { Task } from "../Task/Task"
import "./taskList.css"

export function TaskList({ todoData, toggleDone, deleteTask }) {
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
              done={task.done}
              toggleDone={toggleDone}
              deleteTask={deleteTask}
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
}
