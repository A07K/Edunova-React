import React, { useState } from "react";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import FilterButton from "../common/FilterButton";

const TableHeader = ({
  totalUsers,
  onSearch,
  onAddMember,
  onFilter,
  selectedFilters,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  const handleFilterApply = (filters) => {
    const filteringComplete = onFilter(filters);
    if (filteringComplete) {
      setShowFilter(false);
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold">Team members</h2>
        <p className="text-gray-500">{totalUsers} users</p>
      </div>
      <div className="flex space-x-2">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearch(e.target.value)}
            className="pl-8 pr-2 py-1 border rounded-md"
          />
          <FaSearch className="absolute left-2 top-2 text-gray-400" />
        </div>
        <div className="relative">
          <button
            className="px-2 py-1 border rounded-md"
            onClick={() => setShowFilter(!showFilter)}
          >
            <FaFilter />
          </button>
          {showFilter && (
            <FilterButton
              onFilter={handleFilterApply}
              initialFilters={selectedFilters}
            />
          )}
        </div>
        <button
          onClick={onAddMember}
          className="px-4 py-1 bg-purple-600 text-white rounded-md flex items-center"
        >
          <FaPlus className="mr-1" /> Add member
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
