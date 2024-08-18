import React from "react";

const Pages = ({ children }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow p-4 border border-gray-200 rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Pages;
