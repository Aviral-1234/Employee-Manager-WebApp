import React, { useEffect, useState } from "react";
import axios from "axios";

const EmpNames = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const empData = await axios.get("http://localhost:3000/getEmp");
        setNames(empData.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="bg-zinc-900 p-4 rounded-lg border-2 border-white inline-block max-w-fit">
      <h2 className="text-white bg-zinc-900 mb-3">Employee Names:</h2>
      {names.length > 0 ? (
        <ul className="text-white bg-zinc-900 space-y-2">
          {names.map((emp) => (
            <li key={emp._id} className="bg-zinc-800 px-3 py-2 rounded-lg">
              {emp.username}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white">No employees found</p>
      )}
    </div>
  );
};

export default EmpNames;
