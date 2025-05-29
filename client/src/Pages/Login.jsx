import React from 'react'
import { useState } from 'react';
import axios from "axios"
import AlertBox from '../Components/Vote-Components/AlertBox';

// Login Component
const Login = () => {
  // API URL FOR BACKEND CALLS
  const apiUrl = import.meta.env.VITE_API_URL;
  // State for the login form
  const [loginForm, setLoginForm] = useState({
    email: '',
    password:''
  });
  // state to populate the alertbox for login error
  const[ loginError, setLoginError] = useState('');
  const handleChange = (e)=>{
    const updatedForm = {...loginForm, [e.target.name]:e.target.value}
    setLoginForm(updatedForm)
  }
  const handleLogin = async (e)=>{
    e.preventDefault();
    try{
      const response = await axios.post(`${apiUrl}/login`, loginForm);
      console.log("Success:", response.data);
      location.assign('/')
    }catch(error){
      // console.log(error.response.data)
      const showError = error.response.data 
      setLoginError(showError.error)
    }
  }
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Votera"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Login to your account
        </h2>
        <div>
          {loginError && <AlertBox text ={loginError}/>}
        </div>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  method="POST" 
          className="space-y-6"
          onSubmit = { handleLogin }
          onChange={handleChange}
        >
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="orange-color font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/ "
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="orange-color-bg flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="  mt-10 text-center text-sm/6 text-gray-500">
          Don't have an account?{' '}
          <a href="/register" className="orange-color font-semibold text-indigo-600 hover:text-indigo-500">
            Register
          </a>
        </p>
      </div>
    </div>
  </>

  )
}

export default Login