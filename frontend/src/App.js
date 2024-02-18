import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Task from './components/Task'
import Navbar from './components/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Profile from './components/auth/Profile'
import './App.css'

const App = () => {

  const [loggedIn, setLoggedIn] = useState(false);

  const authenticate = async () => {
    try {
      const token = localStorage.getItem('token');
      //console.log(token)
      if (token) {
        setLoggedIn(true)
      } else {
        setLoggedIn(false)
        // handleLogout()
      }
      //console.log("loggedIn",loggedIn)

    } catch (err) {
      //console.log(err)
      setLoggedIn(false)
    }
  }


  useEffect(() => {
    authenticate();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }


  return (
    <BrowserRouter>
      <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route exact path="/" element={!loggedIn ? <Navigate to='/login'/> : <Navigate to='/profile' />}/>
        <Route path="/task" element={<Task />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Navigate to='/login' />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App;