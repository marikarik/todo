import { NewTaskForm } from './components/NewTaskForm/NewTaskForm'
import { TaskList } from './components/TaskList/TaskList'
import { Footer } from './components/Footer/Footer'
import React from 'react'

export default class App extends React.Component {
  state = {
    todoData: [
      { id: 1, description: 'купить хлеб', done: false },
      { id: 2, description: 'купить молоко', done: false },
    ],
  }

  toggleDone = (id) => {
    this.setState(
      (prevState) => ({
        todoData: prevState.todoData.map((task) => {
          if (id === task.id) {
            return {
              ...task,
              done: !task.done,
            }
          } else {
            return task
          }
        }),
      }),
      () => {
        console.log(this.state.todoData)
      }
    )
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const i = todoData.findIndex((item) => item.id === id)
      const newTodoData = [...todoData.slice(0, i), ...todoData.slice(i + 1)]
      return {
        todoData: newTodoData,
      }
    })
  }

  render() {
    return (
      <>
        <NewTaskForm />
        <TaskList todoData={this.state.todoData} toggleDone={this.toggleDone} deleteTask={this.deleteTask} />
        <Footer />
      </>
    )
  }
}

// function App() {
//   const todoData = [
//     { id: 1, description: 'купить хлеб' },
//     { id: 2, description: 'купить молоко' },
//   ]

//   return (
//     <>
//       <NewTaskForm />
//       <TaskList todoData={todoData} />
//       <Footer />
//     </>
//   )
// }

// export default App
