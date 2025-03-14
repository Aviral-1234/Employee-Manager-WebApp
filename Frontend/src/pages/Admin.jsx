import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AdminForm from '../components/Admincomponents/AdminForm'
import Header from '../components/Header'
import AdminGivenTasksFetch from '../components/Admincomponents/AdminGivenTasksFetch'
import EmpNames from '../components/Admincomponents/EmpNames'

const Admin = () => {
  
  const [updateTrigger,setUpdateTrigger] = useState(false)
  const [admin,setAdmin] = useState(null)
  const [username,setUserName] = useState(null)
  const [data,setData] = useState(null)
  

  useEffect(() => {
    const fetchAdmin= async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getAdmin`);
            // console.log(response.data)
            setUserName(response.data[0].username)
            await setData(response.data);
            // console.log(admin)
        } catch (error) {
            console.error("Error fetching admin details:", error);
        }
    };
    fetchAdmin();
}, []);

  return (
    <div className='font-bold'>
      <Header user={username} />
      <div className='flex justify-around mx-10'>
      <AdminForm user={data} setUpdateTrigger = {setUpdateTrigger} />
      <EmpNames/>
      </div>
      <AdminGivenTasksFetch user={data} updateTrigger = {updateTrigger}/>
    </div>
  )
}

export default Admin
