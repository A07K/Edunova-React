import React from "react";
import { NavLink } from "react-router-dom";
import { HiHome, HiUsers } from "react-icons/hi";

const Sidebar = () => {
  return (
    <nav className="bg-white w-64 h-full">
      <ul className="space-y-2 p-4">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <HiHome className="w-5 h-5" />
            <span>Overview</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/people"
            className={({ isActive }) =>
              `flex items-center space-x-2 p-2 rounded-lg ${
                isActive
                  ? "bg-purple-100 text-purple-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            <HiUsers className="w-5 h-5" />
            <span>People Directory</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
