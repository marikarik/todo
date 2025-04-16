import './tasksFilter.css'
import PropTypes from 'prop-types'
export function TasksFilter({ filterChange, filter }) {
  return (
    <ul className="filters">
      <li>
        <button className={filter === 'All' ? 'selected' : ''} onClick={() => filterChange('All')}>
          All
        </button>
      </li>
      <li>
        <button className={filter === 'Active' ? 'selected' : ''} onClick={() => filterChange('Active')}>
          Active
        </button>
      </li>
      <li>
        <button className={filter === 'Completed' ? 'selected' : ''} onClick={() => filterChange('Completed')}>
          Completed
        </button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  filterChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
}
