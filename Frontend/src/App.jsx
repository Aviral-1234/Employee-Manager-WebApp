import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/Login'
import Admin from './pages/Admin'
import EmployeePage from './pages/EmployeePage'


const App = ({user}) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/employee/:id' element={<EmployeePage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
