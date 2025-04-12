import React from 'react'

export class Task extends React.Component {
  handleClick = () => {
    console.log(this.props)
    this.props.toggleDone(this.props.task.id)
  }
  handleDelete = () => {
    this.props.deleteTask(this.props.task.id)
  }

  render() {
    const { done, description } = this.props.task
    let classNames = ''
    if (done) {
      classNames = 'completed'
    }
    return (
      <li className={classNames}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={this.handleClick} />
          <label>
            <span className="description">{description}</span>
            <span className="created">created 17 seconds ago</span>
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
