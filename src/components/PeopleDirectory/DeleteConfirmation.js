import React from "react";

const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-96 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">
            Delete Member Details
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="px-7 py-3 text-center">
          <p className="text-sm text-gray-500">
            Are you sure you want to delete this Member details? This action
            cannot be undone.
          </p>
        </div>
        <div className="flex justify-end items-center px-5 py-3 space-x-3 border-t">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-purple-600 text-white text-base font-medium rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
