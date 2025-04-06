import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 w-full">
      <div className="max-w-screen-lg mx-auto px-4 md:px-10 py-3 flex items-center justify-between">
    
        <div className="text-white text-2xl font-semibold">PasteApp</div>

    
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white text-2xl"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        <div className=" text-[18px] hidden md:flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive ? "text-blue-400" : "text-white"
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>

     
      {isOpen && (
        <div className="md:hidden px-4 pb-4 bg-gray-800 max-w-screen-lg mx-auto w-full">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "block py-1 text-blue-400" : "block py-1 text-white"
            }
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              isActive ? "block py-1 text-blue-400" : "block py-1 text-white"
            }
            onClick={() => setIsOpen(false)}
          >
            Pastes
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
