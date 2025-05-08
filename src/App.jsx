import React from 'react'

import { NewTaskForm } from './components/NewTaskForm/NewTaskForm'
import { TaskList } from './components/TaskList/TaskList'
import { Footer } from './components/Footer/Footer'

export default class App extends React.Component {
  maxId = 5

  state = {
    todoData: [],
    filter: 'All',
  }

  timerIds = {}

  tick = (id) => {
    this.timerIds[id] = setInterval(() => {
      this.setState(
        (prevState) => {
          return {
            todoData: prevState.todoData.map((task) => {
              if (task.id === id && task.remainingSeconds > 0) {
                return {
                  ...task,
                  remainingSeconds: task.remainingSeconds - 1,
                  isPaused: false,
                }
              } else {
                return task
              }
            }),
          }
        },
        () => {
          const task = this.state.todoData.find((item) => item.id === id)
          if (task.remainingSeconds === 0) {
            this.clearTimer(id)
            console.log(this.state, this.timerIds)
          }
        }
      )
    }, 1000)
  }

  pauseTimer = (id) => {
    if (this.timerIds[id]) {
      this.clearTimer(id)
      this.setState(
        (prevState) => {
          return {
            todoData: prevState.todoData.map((task) => {
              if (task.id === id && !task.isPaused) {
                return {
                  ...task,
                  isPaused: true,
                }
              } else {
                return task
              }
            }),
          }
        }
        // ,
        // () => console.log(this.state)
      )
    }
  }

  startTimer = (id) => {
    const task = this.state.todoData.find((item) => item.id === id)
    if (task.isPaused && !this.timerIds[id]) {
      this.tick(id)
    }
  }

  clearTimer = (id) => {
    clearInterval(this.timerIds[id])
    delete this.timerIds[id]
  }

  toggleDone = (id) => {
    this.setState(
      (prevState) => ({
        todoData: prevState.todoData.map((task) => {
          if (id === task.id) {
            return {
              ...task,
              done: !task.done,
              remainingSeconds: 0,
            }
          } else {
            return task
          }
        }),
      }),
      () => {
        const task = this.state.todoData.find((item) => item.id === id)
        if (task.done && this.timerIds[id]) {
          this.clearTimer(id)
        }
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

  createTask(description, minTimer, secTimer) {
    const totalSeconds = Number(minTimer) * 60 + Number(secTimer)
    return {
      id: this.maxId++,
      description,
      minTimer: minTimer.length ? minTimer : '00',
      secTimer: secTimer.length ? secTimer : '00',
      totalSeconds,
      remainingSeconds: totalSeconds,
      isPaused: false,
      timerId: null,
      done: false,
      createdDate: new Date(),
    }
  }

  addTask = (description, min, sec) => {
    const newTask = this.createTask(description, min, sec)
    this.setState(({ todoData }) => {
      const newTodoData = [...todoData, newTask]
      return { todoData: newTodoData }
    })
    return newTask
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
    if (filter === 'Active') {
      filterTodoData = todoData.filter((task) => {
        return !task.done
      })
    } else if (filter === 'Completed') {
      filterTodoData = todoData.filter((task) => {
        return task.done
      })
    } else {
      filterTodoData = this.state.todoData
    }
    return (
      <>
        <NewTaskForm addTask={this.addTask} tick={this.tick} />
        <TaskList
          todoData={filterTodoData}
          toggleDone={this.toggleDone}
          deleteTask={this.deleteTask}
          pauseTimer={this.pauseTimer}
          startTimer={this.startTimer}
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
