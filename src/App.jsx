import { NewTaskForm } from './components/NewTaskForm/NewTaskForm'
import { TaskList } from './components/TaskList/TaskList'
import { Footer } from './components/Footer/Footer'

function App() {
  const todoData = [
    { id: 1, description: 'купить хлеб' },
    { id: 2, description: 'купить молоко' },
  ]

  return (
    <>
      <NewTaskForm />
      <TaskList todoData={todoData} />
      <Footer />
    </>
  )
}

export default App
