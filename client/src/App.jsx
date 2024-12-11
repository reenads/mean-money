// import { useState } from 'react'
// import placeholderImg from './assets/placeholder_img.png'

import { NavBar } from './components/NavBar'

import './App.css'
// import DiaryEntryForm from './components/DiaryEntry'
import { LoginPage } from './pages/Login/LoginPage'
import { Dashboard } from './pages/Dashboard/Dashboard'
import { Homepage } from './pages/Homepage/Homepage'
// import { signup } from './pages/signup'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },

  {
    path: "/login",
    element: <LoginPage />,
  },

  {
    path: "/signup",
    element: <signup />,
  },

  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    {/* <NavBar /> */}
      <div>
        <NavBar />
        {/* <a href="https://react.dev" target="_blank">
          <img src={placeholderImg} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>MeanMoney</h1>
      <h3>The budgeting app that bites</h3>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <h1>Add a new diary entry</h1> */}
        {/* <DiaryEntryForm /> */}
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App
