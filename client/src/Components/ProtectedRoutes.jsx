import React from 'react'
import { useEffect, useState } from 'react';
import {Outlet, Navigate } from 'react-router-dom';
import axios from "axios"

// API URL FOR BACKEND CALLS
const apiUrl = import.meta.env.VITE_API_URL;
const ProtectedRoutes = () => {
    const [auth, setAuth ] = useState(null)
    useEffect(()=>{
        const checkAuth = async() =>{
            try{
            const response = await  axios.get(`${apiUrl}/protectedRoutes`,{ withCredentials: true })
            if(response.status === 200 && response.data.message ===  'Success, User Verified'){
                setAuth(true)
                console.log('the user has been verified')
            }else{
                setAuth(false)
                console.log('failed verification')
            }
            console.log('Auth check success:', response.data)
            }
            catch(err){
                console.log('Auth check failed:', err.response?.data || err.message)
                setAuth(false)
            }
        }
        checkAuth();
    }, [])

    if( auth === null) return <p>Loading....</p>
  return (
    auth ? <Outlet/> : <Navigate to ="/login" replace/>
  )
}

export default ProtectedRoutes