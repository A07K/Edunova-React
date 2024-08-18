import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

import TableHeader from "../components/PeopleDirectory/TableHeader";
import AddMemberForm from "../components/PeopleDirectory/AddMemberForm";
import EditMemberForm from "../components/PeopleDirectory/EditMemberForm";
import SidePane from "../components/PeopleDirectory/SidePane";
import DeleteConfirmation from "../components/PeopleDirectory/DeleteConfirmation";
import Pages from "./Pages";

const mockData = [
  {
    id: 1,
    name: "Olivia Rhye",
    username: "@olivia",
    status: "Active",
    role: "Product Designer",
    email: "olivia@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 2,
    name: "Phoenix Baker",
    username: "@phoenix",
    status: "Active",
    role: "Product Manager",
    email: "phoenix@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 3,
    name: "Lana Steiner",
    username: "@lana",
    status: "Active",
    role: "Frontend Developer",
    email: "lana@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 4,
    name: "Demi Wilkinson",
    username: "@demi",
    status: "Active",
    role: "Backend Developer",
    email: "demi@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 5,
    name: "Candice Wu",
    username: "@candice",
    status: "Active",
    role: "Fullstack Developer",
    email: "candice@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 6,
    name: "Natali Craig",
    username: "@natali",
    status: "Active",
    role: "UX Designer",
    email: "natali@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 7,
    name: "Drew Cano",
    username: "@drew",
    status: "Active",
    role: "UX Copywriter",
    email: "drew@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 8,
    name: "Orlando Diggs",
    username: "@orlando",
    status: "Active",
    role: "UI Designer",
    email: "orlando@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 9,
    name: "Andi Lane",
    username: "@andi",
    status: "Active",
    role: "Product Manager",
    email: "andi@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 10,
    name: "Kate Morrison",
    username: "@kate",
    status: "Active",
    role: "QA Engineer",
    email: "kate@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
];

const PeopleDirectory = () => {
  const [data, setData] = useState(mockData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [globalFilter, setGlobalFilter] = useState("");
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    roles: [],
    teams: [],
  });
  const [editingMember, setEditingMember] = useState(null);

  const columns = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center">
            <img
              src={`https://via.placeholder.com/32`}
              alt={row.original.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <div>{row.original.name}</div>
              <div className="text-sm text-gray-500">
                {row.original.username}
              </div>
            </div>
          </div>
        ),
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => (
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              getValue() === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {getValue()}
          </span>
        ),
      },
      { header: "Role", accessorKey: "role" },
      { header: "Email address", accessorKey: "email" },
      {
        header: "Teams",
        accessorKey: "teams",
        cell: ({ getValue }) => (
          <div className="flex flex-wrap gap-1">
            {getValue().map((team, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
              >
                {team}
              </span>
            ))}
          </div>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex space-x-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(row.original);
              }}
              className="text-gray-600 hover:text-blue-600"
            >
              <FaEdit />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMemberToDelete(row.original);
                setShowDeleteConfirmation(true);
              }}
              className="text-gray-600 hover:text-red-600"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleAddMember = (newMember) => {
    setData([...data, { id: data.length + 1, ...newMember }]);
    setShowAddForm(false);
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setShowEditForm(true);
  };

  const handleDelete = () => {
    setData(data.filter((member) => member.id !== memberToDelete.id));
    setShowDeleteConfirmation(false);
    setMemberToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setMemberToDelete(null);
  };

  const handleFilter = (filters) => {
    setSelectedFilters(filters);
    const filteredData = mockData.filter((member) => {
      const matchesRoles = filters.roles.length
        ? filters.roles.includes(member.role)
        : true;
      const matchesTeams = filters.teams.length
        ? filters.teams.every((team) => member.teams.includes(team))
        : true;
      return matchesRoles && matchesTeams;
    });
    setData(filteredData);
    return true;
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1;

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => table.setPageIndex(i - 1)}
          className={`px-3 py-1 mx-1 rounded-md ${
            currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <Pages className="container mx-auto px-4 py-8">
      <TableHeader
        totalUsers={data.length}
        onSearch={setGlobalFilter}
        onAddMember={() => setShowAddForm(true)}
        onFilter={handleFilter}
        selectedFilters={selectedFilters}
      />

      <div className="mt-4 bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={(e) => {
                  // Only open the side pane if the click is not on the edit or delete buttons
                  if (!e.target.closest("button")) {
                    setSelectedMember(row.original);
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Updated Pagination */}
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 bg-gray-200 rounded-md flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </button>

        <div className="flex items-center space-x-2">
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => table.setPageIndex(page - 1)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 bg-gray-200 rounded-md flex items-center"
        >
          Next
          <svg
            className="w-4 h-4 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showAddForm && (
        <AddMemberForm
          onSubmit={handleAddMember}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {showEditForm && editingMember && (
        <EditMemberForm
          member={editingMember}
          onSubmit={(updatedMember) => {
            setData((prevData) =>
              prevData.map((m) =>
                m.id === updatedMember.id ? { ...m, ...updatedMember } : m
              )
            );
            setShowEditForm(false);
            setEditingMember(null);
          }}
          onClose={() => {
            setShowEditForm(false);
            setEditingMember(null);
          }}
        />
      )}

      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={handleDelete}
          onCancel={handleCancelDelete}
        />
      )}

      {selectedMember && (
        <SidePane
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </Pages>
  );
};

export default PeopleDirectory;
