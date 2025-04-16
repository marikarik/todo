import './footer.css'
import { TasksFilter } from '../TasksFilter/TasksFilter'
import PropTypes from 'prop-types'
export function Footer({ countDoneTask, clearCompleted, filterChange, filter }) {
  return (
    <footer className="footer">
      <span className="todo-count">{countDoneTask} items left</span>
      <TasksFilter filterChange={filterChange} filter={filter} />
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  countDoneTask: PropTypes.number.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  filterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}
