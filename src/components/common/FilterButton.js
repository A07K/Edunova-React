import React, { useState, useEffect } from "react";

const FilterButton = ({ onFilter, initialFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  useEffect(() => {
    setSelectedFilters(initialFilters);
  }, [initialFilters]);

  const roles = [
    "Product Designer",
    "Product Manager",
    "Frontend Developer",
    "Backend Developer",
  ];
  const teams = ["Design", "Product", "Marketing", "Technology"];

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const applyFilters = () => {
    onFilter(selectedFilters);
  };

  return (
    <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
      <div
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        <div className="px-4 py-2 text-sm text-gray-700">Filters</div>
        <div className="border-t border-gray-100"></div>
        <div className="px-4 py-2">
          <h3 className="text-sm font-medium text-gray-900">Roles</h3>
          {roles.map((role) => (
            <label key={role} className="flex items-center mt-1">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-purple-600"
                checked={selectedFilters.roles.includes(role)}
                onChange={() => handleFilterChange("roles", role)}
              />
              <span className="ml-2 text-sm text-gray-700">{role}</span>
            </label>
          ))}
        </div>
        <div className="border-t border-gray-100"></div>
        <div className="px-4 py-2">
          <h3 className="text-sm font-medium text-gray-900">Teams</h3>
          {teams.map((team) => (
            <label key={team} className="flex items-center mt-1">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-purple-600"
                checked={selectedFilters.teams.includes(team)}
                onChange={() => handleFilterChange("teams", team)}
              />
              <span className="ml-2 text-sm text-gray-700">{team}</span>
            </label>
          ))}
        </div>
        <div className="border-t border-gray-100"></div>
        <div className="px-4 py-2">
          <button
            onClick={applyFilters}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterButton;
