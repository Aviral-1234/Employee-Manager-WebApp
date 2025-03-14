import React, { useState, useEffect } from "react";
import axios from "axios";

const EmpBody = ({ employee }) => {
  const [completedCount, setCompletedCount] = useState(0);
  const [completedTasks, setCompletedTasks] = useState({});
  
  useEffect(() => {
    if (employee && employee.tasks) {
      const completed = employee.tasks.filter(task => task.status === "completed").length;
      setCompletedCount(completed);
      
      const taskMap = {};
      employee.tasks.forEach(task => {
        if (task.status === "completed") {
          taskMap[task._id || task.id] = true;
        }
      });
      setCompletedTasks(taskMap);
    }
  }, [employee]);
  
  const handleCompleted = async (taskId) => {
    console.log(taskId);
    try {
      await axios.get(`http://localhost:3000/updateTaskStatus/${taskId}`);
      
      setCompletedTasks(prev => ({
        ...prev,
        [taskId]: true
      }));
      
      if(totalTasks > completedCount) setCompletedCount(completedCount + 1);
      else {
        alert("you have done everything King!!!");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status");
    }
  };
  
  if (!employee) return <p className="text-center text-white mt-10">Loading employee data...</p>;
  
  const totalTasks = employee.tasks.length;
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg border border-zinc-700 mb-8">
          <h1 className="p-2 rounded-md text-3xl font-bold text-center">Task Dashboard</h1>
          <div className="p-2 rounded-md flex justify-center gap-8 mt-4">
            <div className="text-center">
              <p className="text-sm text-zinc-400">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-400">{totalTasks}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-zinc-400">Completed</p>
              <p className="text-2xl font-bold text-green-400">{completedCount}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-zinc-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-400">{totalTasks - completedCount}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-400 pl-2">Assigned Tasks</h2>
          
          {totalTasks > 0 ? (
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-full">
                {employee.tasks.map((task, index) => {
                  const isCompleted = task.status === "completed" || completedTasks[task._id || index];
                  
                  return (
                    <div 
                      key={task.id || index} 
                      className={`p-5 rounded-lg shadow-lg border border-zinc-700 min-w-64 max-w-64 flex-shrink-0 ${
                        isCompleted ? 'bg-green-800' : 'bg-zinc-800'
                      }`}
                    >
                      <div className="p-2 rounded-md flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{task.title}</h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-zinc-700 text-zinc-300">
                          {task.category}
                        </span>
                      </div>
                      
                      <p className="p-2 rounded-md text-zinc-400 mb-4 line-clamp-2">{task.description}</p>
                      
                      <div className="p-2 rounded-md flex items-center justify-between text-sm mt-4">
                        <p className="text-zinc-300">
                          <span className="text-green-400">Due:</span> {task.date || "No date"}
                        </p>
                        <button 
                          onClick={() => !isCompleted && handleCompleted(task._id || index)}
                          disabled={isCompleted}
                          className={`${
                            isCompleted 
                              ? 'bg-gray-600 cursor-not-allowed' 
                              : 'bg-green-600 hover:bg-green-700'
                          } text-white px-1 py-1 rounded transition-colors duration-200`}
                        >
                          {isCompleted ? 'Completed' : 'Complete'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-zinc-800 p-8 rounded-lg text-center">
              <p className="text-zinc-400">No tasks assigned.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpBody;