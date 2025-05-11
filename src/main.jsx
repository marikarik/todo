import { createRoot } from 'react-dom/client'
import React from 'react'

import './index.css'
import App from './App.jsx'

createRoot(document.querySelector('.todoapp')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
