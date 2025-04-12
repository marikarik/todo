import './tasksFilter.css'
export function TasksFilter({ filter }) {
  return (
    <ul className="filters">
      <li>
        <button className="selected" onClick={() => filter('All')}>
          All
        </button>
      </li>
      <li>
        <button onClick={() => filter('Active')}>Active</button>
      </li>
      <li>
        <button onClick={() => filter('Completed')}>Completed</button>
      </li>
    </ul>
  )
}
