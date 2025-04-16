import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export class Task extends React.Component {
  static defaultProps = {
    description: 'указать задачу',
    toggleDone: () => {},
    deleteTask: () => {},
  }
  static propTypes = {
    done: PropTypes.bool,
    description: PropTypes.string,
    id: PropTypes.number.isRequired,
    toggleDone: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
  }
  handleClick = () => {
    console.log(this.props)
    this.props.toggleDone(this.props.id)
  }
  handleDelete = () => {
    this.props.deleteTask(this.props.id)
  }

  render() {
    const { done, description, createdDate } = this.props
    let classNames = ''
    if (done) {
      classNames = 'completed'
    }
    const timeCreated = formatDistanceToNow(createdDate, { includeSeconds: true, addSuffix: true })

    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={this.handleClick} />
          <label>
            <span className="description">{description}</span>
            <span className="created">created {timeCreated}</span>
          </label>
          <button className="icon icon-edit"></button>
          <button className="icon icon-destroy" onClick={this.handleDelete}></button>
        </div>
      </li>
    )
  }
}

// export function Task({ description }) {

//   return (
//     <li className="">
//       <div className="view">
//         <input className="toggle" type="checkbox" />
//         <label>
//           <span className="description">{description}</span>
//           <span className="created">created 17 seconds ago</span>
//         </label>
//         <button className="icon icon-edit"></button>
//         <button className="icon icon-destroy"></button>
//       </div>
//     </li>
//   )
// }
