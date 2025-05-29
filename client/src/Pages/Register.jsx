import React, { Component } from 'react'
import { useState } from "react"
import axios from "axios"
import NewRegister from '../Components/Vote-Components/Registered/NewRegister'
import AlertBox from '../Components/Vote-Components/AlertBox'

const Register = () => {
  // API URL FOR BACKEND CALLS
  const apiUrl = import.meta.env.VITE_API_URL;
  //State to store registration details
  const [registerForm, setRegisterForm] = useState({ 
    email:'',
    username:'',
    password:''
  })
  // State for the username to display after regsitration
  const [newUsername, setNewUsername] = useState('');
  // State to show congratulations message when the user is successfully registered
  const [registered, setRegistered] = useState(false);
  // Function to update form as user fill the input 
  const handleChange = (e) =>{
    const updatedForm = {...registerForm, [e.target.name]:e.target.value}
    setRegisterForm(updatedForm)
  }
  // State for errors
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // Handle Form Submission Function
const handleSubmit = async(e) =>{
  e.preventDefault();
  // e.stopPropagation(); 
    try {
      const response = await axios.post(`${apiUrl}/signup`, registerForm);
      console.log("Response:", response.data);
      // console.log(" Raw Response:", response);
      setNewUsername(registerForm.username)
      setRegisterForm({email:'',username:'',password:''})
      setRegistered(true)
    } 
    catch (error) {
      console.log(error)
      const errors = error.response?.data?.errors;
      if(errors){
        if(errors.email){
          console.log(errors.email)
          setEmailError(typeof errors.email === 'string' ? errors.email : errors.email.message || 'Try another email')
        }
        if(errors.username){
          console.log(errors.username)
          setUsernameError(typeof errors.username === 'string' ? errors.username : errors.username.message || 'Try another username')
        }
        if(errors.password){
          console.log(errors.password)
          setPasswordError(typeof errors.password === 'string' ? errors.password : errors.password.message || 'Minimum length of passwords is 6 characters')
        }
        
      }
    }
 
}
  
  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      {
        registered 
        ?
        ( <NewRegister text={newUsername} />)
        :( 
        <div>
           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Register New Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form  method="POST" className="space-y-6"
          onChange={handleChange}  
          onSubmit={handleSubmit} >
          <div>
            {/* Label for email */}
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={registerForm.email}
                onChange={handleChange}  
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#e65c00] sm:text-sm/6"
              />
            </div>
            <div className="email-error">
              { emailError && < AlertBox text= {emailError} /> }
            </div>
               {/* Label for email */}


                 {/* Label for Username */}
            <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900 mt-4 mb-4">
              Username
            </label>
            <div className="mt-4 mb-4">
              <input
                id="username"
                name="username"
                type="username"
                value={registerForm.username}
                onChange={handleChange}  
                required
                autoComplete="username"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#e65c00] sm:text-sm/6"
              />
            </div>
          </div>
          <div className="username-error">
              { usernameError &&  < AlertBox text= {usernameError} /> }
            </div>
          {/* Label for Username */}

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
                value={registerForm.password}
                onChange={handleChange}  
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#e65c00] sm:text-sm/6"
              />
            </div>
          </div>
          <div className="password-error">
              { passwordError &&  < AlertBox text= {passwordError} /> }
            </div>

          <div>
            <button
              type="submit"
              className="orange-color-bg flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer "
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?
          <a href="/login" className="orange-color font-semibold mx-2">
            Login
          </a>
        </p>
      </div>
        </div>)
       
      }
     

    
    </div>
  </>

  )
}

export default Register