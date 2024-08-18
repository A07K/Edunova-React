import React from "react";
import { FaTimes } from "react-icons/fa";

const SidePane = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Member Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <FaTimes />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Name</h3>
          <p>{member.name}</p>
        </div>
        <div>
          <h3 className="font-semibold">Email</h3>
          <p>{member.email}</p>
        </div>
        <div>
          <h3 className="font-semibold">Role</h3>
          <p>{member.role}</p>
        </div>
        <div>
          <h3 className="font-semibold">Status</h3>
          <p>{member.status}</p>
        </div>
        <div>
          <h3 className="font-semibold">Teams</h3>
          <ul className="list-disc list-inside">
            {member.teams.map((team, index) => (
              <li key={index}>{team}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidePane;
