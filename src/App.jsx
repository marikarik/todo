import { useState, useRef, useEffect } from 'react'

import { NewTaskForm } from './components/NewTaskForm/NewTaskForm'
import { TaskList } from './components/TaskList/TaskList'
import { Footer } from './components/Footer/Footer'

export default function App() {
  const [todoData, setTodoData] = useState([])
  const [filter, setFilter] = useState('All')

  let maxIdRef = useRef(5)
  let timerIdsRef = useRef({})

  const tick = (id) => {
    timerIdsRef.current[id] = setInterval(() => {
      setTodoData((todoDataPrev) => {
        const newTodoData = todoDataPrev.map((task) => {
          if (task.id === id && task.remainingSeconds > 0) {
            return {
              ...task,
              remainingSeconds: task.remainingSeconds - 1,
              isPaused: false,
            }
          } else {
            return task
          }
        })
        const task = newTodoData.find((item) => item.id === id)
        if (task.remainingSeconds === 0) {
          clearTimer(id)
        }
        return newTodoData
      })
    }, 1000)
  }
  const clearTimer = (id) => {
    clearInterval(timerIdsRef.current[id])
    delete timerIdsRef.current[id]
  }

  const pauseTimer = (id) => {
    if (timerIdsRef.current[id]) {
      clearTimer(id)
      setTodoData((todoDataPev) => {
        return todoDataPev.map((task) => {
          if (task.id === id && !task.isPaused) {
            return {
              ...task,
              isPaused: true,
            }
          } else {
            return task
          }
        })
      })
    }
  }

  const startTimer = (id) => {
    if (!timerIdsRef.current[id]) {
      tick(id)
    }
  }
  const createTask = (description, minTimer, secTimer) => {
    const totalSeconds = Number(minTimer) * 60 + Number(secTimer)
    return {
      id: maxIdRef.current++,
      description,
      totalSeconds,
      remainingSeconds: totalSeconds,
      timerId: null,
      done: false,
      createdDate: new Date(),
      newDescr: description,
      isEdit: false,
    }
  }

  const addTask = (description, min, sec) => {
    const newTask = createTask(description, min, sec)
    setTodoData((todoDataPrev) => {
      return [...todoDataPrev, newTask]
    })
    return newTask
  }

  const deleteTask = (id) => {
    const i = todoData.findIndex((item) => item.id === id)
    setTodoData((todoDataPrev) => {
      return [...todoDataPrev.slice(0, i), ...todoDataPrev.slice(i + 1)]
    })
    clearTimer(id)
  }

  const handleEdit = (id) => {
    setTodoData((todoDataPrev) => {
      return todoDataPrev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            isEdit: true,
          }
        } else return task
      })
    })
  }

  const handleInputChange = (id, event) => {
    const value = event.target.value
    setTodoData((todoDataPrev) => {
      return todoDataPrev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            newDescr: value,
          }
        } else return task
      })
    })
  }

  const updateTaskDescription = (id, newDescr) => {
    setTodoData((todoDataPrev) => {
      return todoDataPrev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            description: newDescr,
          }
        } else {
          return task
        }
      })
    })
  }

  const cancelEdit = () => {
    setTodoData((todoDataPrev) => {
      return todoDataPrev.map((task) =>
        task.isEdit ? { ...task, isEdit: false, newDescr: task.description } : task
      )
    })
  }

  const handleKeyUp = (id, event) => {
    const task = todoData.find((task) => task.id === id)
    if (task.isEdit && event.key === 'Enter') {
      setTodoData((todoDataPrev) => {
        return todoDataPrev.map((task) => (task.id === id ? { ...task, isEdit: false } : task))
      })
      updateTaskDescription(id, task.newDescr)
    }
    if (task.id === id && event.key === 'Escape') {
      cancelEdit()
    }
  }

  const toggleDone = (id) => {
    setTodoData((todoDataPrev) => {
      return todoDataPrev.map((task) => {
        if (id === task.id) {
          return {
            ...task,
            done: !task.done,
            remainingSeconds: 0,
          }
        } else {
          return task
        }
      })
    })
  }

  const filterChange = (nameFilter) => {
    setFilter(nameFilter)
  }

  const clearCompleted = () => {
    setTodoData((todoDataPrev) => {
      return todoDataPrev.filter((task) => {
        return !task.done
      })
    })
  }

  const handleClickOutside = (event) => {
    if (event.target.classList.contains('edit')) return

    cancelEdit()
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const count = todoData.filter((task) => {
    return !task.done
  })

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
    filterTodoData = todoData
  }

  return (
    <>
      <NewTaskForm addTask={addTask} tick={tick} />
      <TaskList
        todoData={filterTodoData}
        toggleDone={toggleDone}
        deleteTask={deleteTask}
        pauseTimer={pauseTimer}
        startTimer={startTimer}
        updateTaskDescription={updateTaskDescription}
        handleEdit={handleEdit}
        handleInputChange={handleInputChange}
        handleKeyUp={handleKeyUp}
        cancelEdit={cancelEdit}
      />
      <Footer
        countDoneTask={count.length}
        clearCompleted={clearCompleted}
        filterChange={filterChange}
        filter={filter}
      />
    </>
  )
}
