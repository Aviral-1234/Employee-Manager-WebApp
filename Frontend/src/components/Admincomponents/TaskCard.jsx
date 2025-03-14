import React from "react";

const TaskCard = ({ title, date, description, category, assignedTo, color }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64">
      <h3 className="text-lg font-bold p-1 rounded-lg mb-2">{title}</h3>
      <h3 className="text-sm text-gray-400 p-1 rounded-lg">{date}</h3>
      <p className="text-sm mt-2 p-1 rounded-lg overflow-y-auto scrollbar-hide">{description}</p>
      <h3 className="text-sm font-semibold mt-3 p-1 rounded-lg mb-2">Category: {category}</h3>
      <h3 className="text-sm font-semibold p-1 rounded-lg">Assigned to: {assignedTo}</h3>
    </div>
  );
};

export default TaskCard;
