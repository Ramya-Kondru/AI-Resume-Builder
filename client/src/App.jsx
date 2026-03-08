import React, { useEffect } from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Pages/home'
import Layout from './Pages/layout'
import Dashboard from './Pages/dashboard'
import ResumeBuilder from './Pages/ResumeBuilder'
import Preview from './Pages/preview'
import Login from './Pages/login'
import { useDispatch } from 'react-redux'
import api from './configs/api'
import { login, setLoading } from './app/features/authSlice'
import {Toaster} from 'react-hot-toast'

const App=()=>{
  const dispatch=useDispatch()
// to get user data from database
  const getUserData=async()=>{
    const token=localStorage.getItem('token')
    try{
      if (token){
        const {data}=await api.get('/api/users/data',{headers:{Authorization:token}})
        if(data.user){
          dispatch(login({token,user:data.user}))
        }
        dispatch(setLoading(false))
      }
      else{
        dispatch(setLoading(false))

      }

    }
    catch(error){
      dispatch(setLoading(false))
      console.log(error.message)

    }
  }

  useEffect(()=>{
    getUserData()
  },[])

  return(
    
    <>
    <Toaster/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='app' element={<Layout/>}>
          <Route index element={<Dashboard/>}/>
          <Route path='builder/:resumeId' element={<ResumeBuilder/>}/>
        </Route>

        <Route path='view/:resumeId' element={<Preview/>}/>
        
      </Routes>
    </>
  )
}
export default App

// 8:16