import React, { use } from 'react'
import { useState , useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
    
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [user, setUser] = useState('')
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault()
        console.log(email,password)

        const adminData = await axios.get("http://localhost:3000/getAdmin")
        const empData = await axios.get('http://localhost:3000/getEmp')
        // console.log(adminData.data[0].email);
        if(adminData.data[0].email == email){
          if(adminData.data[0].password == password){
            setUser('admin')
            navigate('/admin')
            return
          }
        }

    const employee = empData.data.find(emp => emp.email === email);

        if (employee) {
          if (employee.password === password) {
            setUser('emp');
            navigate(`/employee/${employee._id}`);
          } else {
            console.log("Incorrect password");
          }
        } else {
          console.log("Employee not found");
        }



        setEmail("")
        setPassword("")
        return
    }

    return (
    <div className='flex h-screen w-screen justify-center items-center'>
      <div className=' p-20 align-center border-2 border-white rounded-md'>
        <h1 className='text-white mb-7 flex justify-center text-3xl font-bold'>Login User</h1>
        <form onSubmit={handleLogin} className='flex flex-col items-center'>
            <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required type="email" placeholder='enter your email' className='bg-zinc-700 text-white py-3 px-6 outline-none border-2 border-white rounded-full bg-transparent textrounded-md' />
            <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type="password" placeholder='enter your password'className='mt-3 bg-zinc-700 text-white py-3 px-6 outline-none border-2 border-white rounded-full bg-transparent textrounded-md' />
            <input type="submit" value={"Login"} className='font-bold bg-white py-3 cursor-pointer px-12 rounded-full mt-4' />
        </form>
      </div>
    </div>
  )
}

export default LoginPage
