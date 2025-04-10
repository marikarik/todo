import { Task } from '../Task/Task'
import './taskList.css'
export function TaskList({ todoData, toggleDone, deleteTask }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todoData.map((task) => {
          return <Task key={task.id} task={task} toggleDone={toggleDone} deleteTask={deleteTask} />
          // return <Task todoData={todoData} />
        })}
      </ul>
    </section>
  )
}
