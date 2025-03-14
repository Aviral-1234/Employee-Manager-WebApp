import React, { useState } from 'react'
import axios from 'axios'

const AdminForm = ({data, setUpdateTrigger}) => {
    const [title,setTitle] =  useState('')
    const [description,setDescription] =  useState('')
    const [date,setDate] =  useState('')
    const [assignTo,setAssignTo] =  useState('')
    const [category,setCategory] =  useState('')

    const handleAddTask = async (e) =>{
        e.preventDefault();

        const data = await axios.get(`http://localhost:3000/empcheck/${assignTo}`)
        // console.log(data)
        if(!(data.data)){
            alert("assigned employee doesnt exist")
            return
        }

        const res = await axios.post("http://localhost:3000/addTask",{title,description,date,assignTo,category})
    
        console.log(res)
        await axios.get(`http://localhost:3000/assignTask/${assignTo}/${res.data}`)
    
        setTitle('')
        setDescription('')
        setDate('')
        setAssignTo('')
        setCategory('')
        setUpdateTrigger(prev=>!prev)
    
    }

    return (
    <div className='flex mt-7 justify-center items-center '>
    <div className='flex py-10 px-16 bg-zinc-900 rounded-lg border-2 border-white justify-center items-center'>

        <form onSubmit={handleAddTask} className='flex bg-zinc-900 justify-between w-full items-center gap-5 w-full'>
            <div className='text-white bg-zinc-900'>
                <div className="bg-zinc-900">
                    <h3 className="bg-zinc-900">Task Title</h3>
                    <input required value={title} onChange={(e)=>setTitle(e.target.value)} type="text" placeholder='Title' className='m-2 bg-zinc-700 text-white py-3 px-6 outline-none border-2 border-white rounded-full bg-transparent textrounded-md' />
                </div>
                <div className="bg-zinc-900">
                    <h3 className="bg-zinc-900">Date</h3>
                    <input required value={date} onChange={(e)=>setDate(e.target.value)} type="date" placeholder='enter date' className='m-2 bg-zinc-700 text-white py-3 px-6 outline-none border-2 border-white rounded-full bg-transparent textrounded-md' />
                </div>
                <div className="bg-zinc-900">
                    <h3 className="bg-zinc-900">Assign to</h3>
                    <input required value={assignTo} onChange={(e)=>setAssignTo(e.target.value)} type="text" placeholder='Employee name' className='m-2 bg-zinc-700 text-white py-3 px-6 outline-none border-2 border-white rounded-full bg-transparent textrounded-md' />
                </div>
                <div className="bg-zinc-900">
                    <h3 className="bg-zinc-900">Category</h3>
                    <input required value={category} onChange={(e)=>setCategory(e.target.value)} type="text" placeholder='Category' className='m-2 bg-zinc-700 text-white py-3 px-6 outline-none border-2 border-white rounded-full bg-transparent textrounded-md' />
                </div>
                <div className='flex justify-center bg-zinc-900'>
                <input type="submit" value={"Add Task"} className='text-black w-[90%] bg-white py-3 cursor-pointer px-12 rounded-full mt-4' />
                </div>
            </div>
            <div>
                <div className="bg-zinc-900">
                    <h3 className='text-white mb-10 bg-zinc-900'>
                        Task Description
                    </h3>
                    <textarea required value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='add description here' className='h-[350px] w-[350px] bg-zinc-700 text-white py-3 px-6 outline-none border-2 border-white rounded bg-transparent'></textarea>
                </div>
                
            </div>
        </form>
      </div>
      </div>
  )
}

export default AdminForm
