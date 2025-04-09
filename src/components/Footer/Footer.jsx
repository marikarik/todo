import './footer.css'
import { TasksFilter } from '../TasksFilter/TasksFilter'
export function Footer() {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TasksFilter />
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}
