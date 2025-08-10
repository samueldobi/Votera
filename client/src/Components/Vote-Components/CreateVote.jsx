import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Button from '../Button';
import DatePick from './DatePick';
import dayjs from 'dayjs';
import AlertBox from './AlertBox';
import ContestantTable from './ContestantTable';
import useCurrentUser from '../../hooks/useCurrentUser';


const CreateVote = () => {
      // API URL FOR BACKEND CALLS
    const apiUrl = import.meta.env.VITE_API_URL;
    // States
    // state for changing the step in the multistepper form
    const [step, setStep] =  useState(1);
    // State for tracking the contestants added in the voting poll
    const [contestants, setContestants] =  useState([]);
    // State for displaying alerts if the input is empty
    const [showAlert, setShowAlert] = useState(false);
    // state for validating that particpants are more than one
    const [voterAmount, setVoterAmount] = useState(false);
    // State to check if there are duplicate contestant names
    const [showDuplicate, setShowDuplicate] =  useState(false)
    // State to check if names contain only names and numbers
    const [ checkNamePattern, setCheckNamePattern] = useState(false)
    // States for Dates
    const [startDate, setStartDate] = React.useState(dayjs());
    const [endDate, setEndDate] = React.useState(dayjs());
    // Check dates
    const [checkDate, setCheckDate] = useState(false);
    const [checkPastDate, setCheckPastDate] = useState(false);
    const [checkFutureDate, setCheckFutureDate] = useState(false);
    // useCurrentUser email
    const{ currentUserEmail, currentUser} = useCurrentUser();
    // State for the general poll name and poll details
    const [formDetails, setFormDetails] = useState({
        name:'',
        about:''
    });
      // State for the contestant  name and contestant details
    const[formData, setFormData] = useState({
        name: '',
        details:'',
        image:''
    })
    // State for all the form data
    const[pollData, setPollData] = useState({
        pollName:'',
        pollAbout:'',
        pollContestant:[],
        startDate: null,
        endDate:null
    })
    // Regex to check if contestants have only alphabets and numbers in their names.
    const namePattern =  /^[A-Za-z0-9\s]+$/
    // Function to update the input when someone types in data 
    const handleChange = (e) =>{
       const updatedForm = {...formData, [e.target.name]:e.target.value}
       setFormData(updatedForm)
    //    console.log(formDetails)
    }

    // Check that the contestant form input is filled
    const handleAddContestant = () => {
        // Check if the contestant input name and details are empty is empty
        if(formData.name.trim() === '' ||  formData.details.trim() === ''){
           setShowAlert(true)
            return;
        };
        setShowAlert(false)


        // Check that contestant names only contain letters and numbers
          if(!namePattern.test(formData.name.trim())){
            setCheckNamePattern(true)
            return;
        }
        setCheckNamePattern(false)
     

      // Check for duplicate contestant name
        const isDuplicate = contestants.some(
            contestant => contestant.name.trim().toLowerCase() === formData.name.trim().toLowerCase()
        )
        if(isDuplicate){
            setShowDuplicate(true)
            return;
        }
        setShowDuplicate(false)
      
              // Create new contestant object
              const newContestant ={
                id: Date.now(),
                // id: `${Date.now()}-${Math.random()}`
                name:formData.name,
                details:formData.details,
            }
            setContestants((prev)=>[...prev, newContestant])
        setFormData({name:'', details:'', image:''})
    }
 
    //Delete a contestant
    const handleDelete = (id) => {
        setContestants(prev => prev.filter(p => p.id !== id));
      };
    // functions to move to either previous or next slide
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
    // Initialize use navigate
    const navigate = useNavigate(); 

    // Handle the submission of the final poll data 
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const now = dayjs();
        // 1. Prevent start dates in the past
            if (dayjs(startDate).isBefore(now)) {
            // alert("Start date cannot be in the past.");
            setCheckPastDate(true);
            return;
            }else{
                setCheckPastDate(false);
            }
        // 2. Ensure end is at least 1 hour after start
        if (!dayjs(endDate).isAfter(dayjs(startDate).add(1, "hour"))) {
         setCheckDate(true)
        return;
        }else{
            setCheckDate(false)
        }
        // 
        if (dayjs(startDate).isAfter(endDate)) {
            setCheckFutureDate(true)
            return;
        }else(setCheckFutureDate(false))
        const updatedPoll ={
            name:formDetails.name,
            about:formDetails.about,
            contestants: contestants.map(contestant => ({
            name: contestant.name,
            about: contestant.details,         // "details" → "about"
            picture: contestant.image || ""    // make sure picture exists
            })),
            startDate: startDate.toDate(),
            endDate: endDate.toDate()
        }
        setPollData(updatedPoll)
        try{
            const response = await axios.post(`${apiUrl}/savepolldetails`, updatedPoll,{
            withCredentials: true
            });
            const pollId = response.data._id
            navigate(`/votepage/${pollId}`)
            console.log(pollId)
      console.log(response)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-8">
  {/* Background decorations */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-r from-violet-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
    <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>
  </div>

  <div className="relative max-w-4xl mx-auto px-6">
    {/* Header Section */}
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4 shadow-lg">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      </div>
      <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
        Create Your Poll
      </h1>
      <p className="text-gray-600 text-lg">Design and launch your voting campaign in just a few steps</p>
    </div>

    {/* Main Form Container */}
    <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2">
        <div 
          className="h-full bg-gradient-to-r from-yellow-400 to-orange-300 transition-all duration-500 ease-out"
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <div className="p-8">
        <form>
          {/* Alert Messages */}
          {(checkPastDate || checkDate || checkFutureDate || showAlert || voterAmount || showDuplicate || checkNamePattern) && (
            <div className="mb-6 space-y-3">
              {checkPastDate && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-red-700 font-medium">Your start time is in the past</span>
                </div>
              )}
              {checkDate && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-red-700 font-medium">Start and end times must be at least one hour apart</span>
                </div>
              )}
              {checkFutureDate && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-red-700 font-medium">Start date must be before end date</span>
                </div>
              )}
              {showAlert && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-amber-700 font-medium">Please fill in all required fields</span>
                </div>
              )}
              {voterAmount && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-amber-700 font-medium">You must add at least two contestants</span>
                </div>
              )}
              {showDuplicate && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-red-700 font-medium">Two contestants cannot have the same name</span>
                </div>
              )}
              {checkNamePattern && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-red-700 font-medium">Contestant names can only contain letters and numbers</span>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Poll Details */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Poll Information</h2>
                <p className="text-gray-600">Let's start with the basics of your poll</p>
              </div>

              <div className="space-y-6">
                {/* Poll Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Poll Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="pollname"
                      name="pollname"
                      type="text"
                      placeholder="Enter a catchy name for your poll"
                      value={formDetails.name}
                      onChange={(e) => setFormDetails({...formDetails, name: e.target.value})}
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 text-lg"
                    />
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Poll Description */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Poll Description <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="about"
                      name="about"
                      rows={4}
                      value={formDetails.about}
                      onChange={(e) => setFormDetails({...formDetails, about: e.target.value})}
                      placeholder="Describe what your poll is about. Help voters understand the purpose and context."
                      className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 resize-none text-lg"
                    />
                    <div className="absolute top-4 right-4 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end pt-6">
                <button
                  type="button"
                  onClick={() => {
                    if (formDetails.name === '' || formDetails.about === '') {
                      setShowAlert(true);
                    } else {
                      nextStep();
                    }
                  }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-500/20 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Continue
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Add Contestants */}
          {step === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Contestants</h2>
                <p className="text-gray-600">Add the candidates that people will vote for</p>
              </div>

              {/* Add Contestant Form */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </div>
                  New Contestant
                </h3>

                <div className="space-y-6">
                  {/* Contestant Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Contestant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter contestant name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>

                  {/* Contestant Details */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Contestant Details
                    </label>
                    <input
                      type="text"
                      name="details"
                      placeholder="Brief description or background"
                      value={formData.details}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                    />
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Contestant Photo
                    </label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-2xl flex items-center justify-center">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <input
                          type="file"
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Add Contestant Button */}
                  <button
                    type="button"
                    onClick={handleAddContestant}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 focus:ring-4 focus:ring-blue-500/20 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    Add Contestant
                  </button>
                </div>
              </div>

              {/* Contestants List */}
              {contestants.length > 0 && (
                <div className="bg-white rounded-3xl border-2 border-gray-100 p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                  </div>
                  Current Contestants ({contestants.length})
                  </h3>
                  <ContestantTable rowDetails={contestants} handleDelete={handleDelete} />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transform hover:scale-105 transition-all duration-200"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                  </svg>
                  Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (contestants.length <= 1) {
                      setVoterAmount(true);
                    } else {
                      nextStep();
                    }
                  }}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-2xl hover:from-orange-600 hover:to-red-600 focus:ring-4 focus:ring-orange-500/20 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Continue
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Date Selection */}
          {step === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Schedule Your Poll</h2>
                <p className="text-gray-600">Set when your poll will start and end</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Start Date */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  Poll Start Time
                  </h3>
                  <div className="date-picker">
                    <DatePick
                      selectedDate={startDate}
                      onDateChange={setStartDate}
                      pickerLabel="Start Date"
                      maxDateTime={endDate ? dayjs(endDate).subtract(1, 'hour') : undefined}
                    />
                  </div>
                </div>

                {/* End Date */}
                <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-3xl p-8 border border-red-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                      </svg>
                    </div>
                    Poll End Time
                  </h3>
                  <div className="date-picker">
                    <DatePick
                      selectedDate={endDate}
                      onDateChange={setEndDate}
                      pickerLabel="End Date"
                      minDateTime={startDate ? dayjs(startDate).add(1, 'hour') : undefined}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="inline-flex items-center px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-2xl hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 transform hover:scale-105 transition-all duration-200"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                  </svg>
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-emerald-600 focus:ring-4 focus:ring-green-500/20 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3l14 9-14 9V3z"></path>
                  </svg>
                  Launch Poll
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Step Indicators */}
      <div className="bg-gray-50 px-8 py-6">
        <div className="flex justify-center items-center space-x-4">
          {[1, 2, 3].map((s, index) => (
            <div key={s} className="flex items-center">
              <button
                onClick={() => setStep(s)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 transform hover:scale-110 ${
                  step >= s
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                }`}
              >
                {step > s ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                ) : (
                  s
                )}
              </button>
              
              {index < 2 && (
                <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                  step > s + 1 ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-900">
              {step === 1 && 'Step 1: Poll Information'}
              {step === 2 && 'Step 2: Add Contestants'}
              {step === 3 && 'Step 3: Schedule Poll'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {step === 1 && 'Enter basic poll details'}
              {step === 2 && 'Add candidates for voting'}
              {step === 3 && 'Set poll timing'}
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Decoration */}
    <div className="text-center mt-8">
      <p className="text-gray-500 text-sm">
        Need help? Contact our support team for assistance with your poll creation.
      </p>
    </div>
  </div>
</div>
    </>
  )
}

export default CreateVote