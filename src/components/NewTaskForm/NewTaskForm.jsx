import PropTypes from "prop-types"
import "./newTaskForm.css"
import React from "react"

export class NewTaskForm extends React.Component {
  state = {
    description: "",
  }
  static defaultProps = {
    createTask: () => {},
  }
  static propTypes = {
    createTask: PropTypes.func,
  }

  addInputInTask = (event) => {
    this.setState({ description: event.target.value })
  }
  onSubmit = (event) => {
    event.preventDefault()
    this.props.createTask(this.state.description)
    this.setState({
      description: "",
    })
  }
  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="newTodo-form" onSubmit={this.onSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onChange={this.addInputInTask}
            value={this.state.description}
          />
        </form>
      </header>
    )
  }
}

// export function NewTaskForm() {
//   return (
//     <header className="header">
//       <h1>todos</h1>
//       <form className="newTodo-form">
//         <input type="text" className="new-todo" placeholder="What needs to be done?" autoFocus />
//       </form>
//     </header>
//   )
// }
