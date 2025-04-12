import './footer.css'
import { TasksFilter } from '../TasksFilter/TasksFilter'
export function Footer({ countDoneTask, clearCompleted, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countDoneTask} items left</span>
      <TasksFilter filter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
