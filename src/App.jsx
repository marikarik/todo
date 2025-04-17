import React from "react"

import { NewTaskForm } from "./components/NewTaskForm/NewTaskForm"
import { TaskList } from "./components/TaskList/TaskList"
import { Footer } from "./components/Footer/Footer"

export default class App extends React.Component {
  maxId = 5

  state = {
    todoData: [],
    filter: "All",
  }

  createTask(description) {
    return {
      id: this.maxId++,
      description,
      done: false,
      createdDate: new Date(),
    }
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
      })
      // () => {
      //   console.log(this.state.todoData)
      // }
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

  addTask = (description) => {
    const newTask = this.createTask(description)
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newTask]
      return { todoData: newTodoData }
    })
  }

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newTodoData = todoData.filter((task) => {
        return !task.done
      })
      return {
        todoData: newTodoData,
      }
    })
  }

  filterChange = (nameFilter) => {
    this.setState(() => {
      return {
        filter: nameFilter,
      }
    })
  }

  render() {
    const count = this.state.todoData.filter((task) => {
      return !task.done
    })
    const { todoData, filter } = this.state
    let filterTodoData = todoData
    if (filter === "Active") {
      filterTodoData = todoData.filter((task) => {
        return !task.done
      })
    } else if (filter === "Completed") {
      filterTodoData = todoData.filter((task) => {
        return task.done
      })
    } else {
      filterTodoData = this.state.todoData
    }
    return (
      <>
        <NewTaskForm createTask={this.addTask} />
        <TaskList
          todoData={filterTodoData}
          toggleDone={this.toggleDone}
          deleteTask={this.deleteTask}
        />
        <Footer
          countDoneTask={count.length}
          clearCompleted={this.clearCompleted}
          filterChange={this.filterChange}
          filter={this.state.filter}
        />
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
