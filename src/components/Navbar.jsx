import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation();
  return (
    <div className='flex flex-row gap-4 place-content-center text-white p-3 bg-gray-800 w-screen'>
        <NavLink 
        to="/"
        className={`${location.pathname === "/" ? "text-blue-500" : "text-white"}`}
        >
            Home
        </NavLink>
        <NavLink 
        to="/pastes"
        className={`${location.pathname === "/pastes" ? "text-blue-500" : "text-white"}`}
        >
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar