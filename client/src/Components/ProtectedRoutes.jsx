import React from 'react'
import { useEffect, useState } from 'react';
import {Outlet, Navigate } from 'react-router-dom';
import axios from "axios"

// API URL FOR BACKEND CALLS
const apiUrl = import.meta.env.VITE_API_URL;
const ProtectedRoutes = () => {
    // API URL FOR BACKEND CALLS
    const [auth, setAuth ] = useState(null)
    useEffect(()=>{
        const checkAuth = async() =>{
            try{
            const response = await  axios.get(`${apiUrl}/protectedRoutes`,{ withCredentials: true })
            setAuth(true)
            console.log('Auth check success:', response.data)
            }
            catch(err){
                console.log(err)
                setAuth(false)
            }
        }
        checkAuth();
    }, [])

    if( auth === null) return <p>Loading....</p>
  return (
    auth ? <Outlet/> : <Navigate to ="/"/>
  )
}

export default ProtectedRoutes