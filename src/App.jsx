import { useState } from 'react'
import './App.css'
import {Route, RouterProvider,createBrowserRouter, createRoutesFromElements} from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter(
    [
      {
        path:'/',
        element:
        <div>
          <Navbar/>
          <Home/>
        </div>
      },
      {
        path:'/pastes',
        element:
        <div>
          <Navbar/>
          <Paste/>
        </div>
      },
      {
        path:'/pastes/:id',
        element:
        <div>
          <Navbar/>
          <ViewPaste/>
        </div>
      },
    ]
  )
  return (
    <div className='container'>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
