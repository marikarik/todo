import { Task } from '../Task/Task'
import './taskList.css'
export function TaskList({ todoData }) {
  return (
    <section className="main">
      <ul className="todo-list">
        {todoData.map((task) => {
          return <Task key={task.id} description={task.description} />
        })}
      </ul>
    </section>
  )
}
