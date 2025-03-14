import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";

const AdminGivenTasksFetch = ({ updateTrigger = false }) => {

    const [tasks,setTasks] = useState([])

    useEffect(()=>{
        const fetchTasks = async () =>{
            
            try{
                const response = await axios.get("http://localhost:3000/getTasks")
                setTasks(response.data)
            }
            catch(error){
                console.error("Error fetching tasks:", error);
            }
        };      
        fetchTasks(); 
    },[updateTrigger])

  return (
    <div className="mt-10 px-4">
      {/* Horizontal Scroll Container */}
      <div className="flex overflow-x-auto p-4 bg-zinc-900 rounded-lg mb-2 scrollbar-hide w-full">
        {tasks.map((task, index) => (
          <div key={index} className="bg-zinc-900 min-w-[300px]">
            <TaskCard
              title={task.title}
              date={task.date || "No date provided"}
              description={task.description}
              category={task.category}
              assignedTo={task.assignTo}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGivenTasksFetch;
