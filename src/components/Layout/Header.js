import React from "react";
import { FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-white w-full border-b border-gray-200">
      <div className="w-full px-4 py-3 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-purple-600">PEOPLE.CO</h1>

        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-800">
            <FaBell className="w-5 h-5" />
          </button>

          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/32"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-gray-800 font-medium">Jane Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
