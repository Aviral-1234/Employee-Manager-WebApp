import React from 'react'
import { Navigate , useNavigate } from 'react-router-dom'

const Header = ({user}) => {
  
  const navigate = useNavigate();
  
  return (
<div className="flex text-white p-7 justify-between items-center w-full">
  <div>
    <h3>
      Hello <br />
      <span className="font-bold text-3xl">{user}</span>
    </h3>
  </div>
  <div>
    <button className="p-5 bg-red-500 rounded-md" onClick={()=>navigate("/")}>Log Out</button>
  </div>
</div>

  )
}

export default Header
