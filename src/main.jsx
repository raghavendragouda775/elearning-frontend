
import React from "react"
// import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client'

import App from './App.jsx'
import { UserContextProvider } from './context/UserContext.jsx'
import { CourseContextProvider } from './context/CourseContext.jsx'
export const server='https://elearning-kaqq.onrender.com'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      {/* we including inside userContextProvider for course authorization in nessecassry */}
      <CourseContextProvider>
      <App />
      </CourseContextProvider>
    
    
    </UserContextProvider>
   
  </React.StrictMode>
)
