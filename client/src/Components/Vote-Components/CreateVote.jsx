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
    <div className=" flex min-h-full flex-1 flex-col  px-6 py-12 lg:px-8">
                <h2 className="text-2xl/7 m-3  font-semibold text-gray-900">Poll Details</h2>
                
        <div className="border border-gray-300 rounded-md p-4">
        <form>

            <div className="w-full mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {/* AlertBox for checkdate */}
              {checkPastDate && (
                <div className="">
                <AlertBox text= {'Your Startime is in the past'}/>
            </div>
            )}
            {checkDate && (
                <div className="">
                <AlertBox text= {'Start Date and time must be at least one hour apart'}/>
            </div>
            )}
            {checkFutureDate && (
                <div className="">
                <AlertBox text= {'Your Start date must be before your end date'}/>
            </div>
            )}

        {/* AlertBox for checkdate */}
                    {/* First page of the poll details form */}
                    {step === 1 && (
                        <div className="sm:col-span-8">
                            {/* Alert Box */}
                            {showAlert && <AlertBox  text = "fill all inputs"/>}
                            {/* Alert Box */}
                            {/* Poll Name div */}
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                            Poll Name
                        </label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-[#e65c00]">
                            
                            <input
                                id="pollname"
                                name="pollname"
                                type="text"
                                placeholder="Type the name of the poll"
                                value={formDetails.name}
                                onChange={(e)=>setFormDetails({...formDetails, name: e.target.value})}
                                className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                            </div>
                        </div>
                        {/* Poll Name div */}
                        {/* Poll Description Div */}
                        <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm/6 font-medium text-gray-900 m-3">
                            About Poll
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="about"
                            name="about"
                            rows={3}
                            value={formDetails.about}
                            onChange={(e)=>setFormDetails({...formDetails, about:e.target.value})}
                            placeholder='Describe What the poll is about shortly'
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#e65c00] sm:text-sm/6"
                            
                            />
                        </div>
                        
                        </div>
                        {/* Poll Description Div */}

                        {/* Button Div */}
                        <div className="m-3 p-3">
                            {<Button text= ">" onClick={()=>{
                                
                                if( formDetails.name === '' || formDetails.about === ''){
                                    setShowAlert(true);
                                }
                                else{
                                    nextStep();
                                }
                            }}/>}
                        </div>
                         {/* Button Div */}
                        </div>)}
                    {/* First page of the poll details form */}


                    {/* Second part of the poll details form */}
                     {step === 2 && (
                        <div className="sm:col-span-8"> 
                          <h2 className='text-2xl/7 m-3  font-semibold text-gray-900'>Add Contestant Details</h2>
                          {/* Add contestant  */}
                            {/* contestant Name */}
                            {/* Alert Box */}
                             {showAlert && <AlertBox  text = "fill all inputs"/>}
                             {voterAmount && <AlertBox  text = "You must add at least two Contestants"/>}
                             {showDuplicate &&  <AlertBox  text = "Two Contestants cannot have the same name"/>}
                             {checkNamePattern && <AlertBox  text = " Contestant names can only contain letters and numbers"/>}
                           <div>
                            {/* Alert Box */}
                           <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                              {/* contestant Name */}

                            {/* contestant Detail  */}
                             <div className='contestant-details-div'>
                       
                             <label htmlFor="Name" className="block text-lg/6 font-medium text-gray-900 m-3 p-3">
                                Contestant Details
                                </label>
                             <input
                                type="text"
                                name="details"
                                placeholder="Details"
                                value={formData.details}
                                onChange={handleChange}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                             </div>
                            {/* Contestant Detail  */}


                            {/* Contestant Image  */}
                            <div className="col-span-full">
                                <label htmlFor="photo" className="block text-sm/6 font-medium text-gray-900">
                                    Photo
                                </label>
                                <div className="mt-2 flex items-center gap-x-3">
                                    <UserCircleIcon aria-hidden="true" className="size-12 text-gray-300" />
                                    <button
                                    type="button"
                                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                                    >
                                    Change
                                    </button>
                                </div>
                                </div>

                               

                            <input
                                type="file"
                                name="image"
                                placeholder="Upload Image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            {/* ontestant Image  */}
                              <div className="add-contestant-btn m-6 p-3">
                                <Button text= "Add Contestant" onClick={ handleAddContestant}/>
                              </div>
                            {/* Contestant Image  */}

                           </div>
                          {/* Add Contestant  */}
                       

                          {/* Add Contestant  */}

                          {/* Contestant Table */}
                            <div>
                                <ContestantTable rowDetails={contestants} handleDelete={handleDelete}/>
                            </div>
                          {/* Contestant Table */}
                            <div className="mt-10 flex items-center justify-between gap-x-6">
                            {<Button text= " < "  onClick={prevStep}/>}
                            {<Button text= " >" onClick={()=>{
                                if(contestants.length <= 1 ){                           
                                    setVoterAmount(true)
                                }
                                else{
                                    nextStep()
                                }
                            }}/>}
                            
                            </div>
                            
                        </div>

                     )}

                    {/* Second part of the poll details form */}
                    {/* Third part of the poll */}
                     {step === 3 && (
                        <div className="sm:col-span-8"> 

                        <h2 className= "m-6 p-2">Pick Start Date</h2>
                        <div className="date-picker">
                            <DatePick
                                selectedDate={startDate}
                                onDateChange={setStartDate}
                                pickerLabel="Start Date"
                                maxDateTime={endDate ? dayjs(endDate).subtract(1, 'hour') : undefined}
                            />
                        </div>
                        <h2 className= "m-6 p-2">Pick End Date</h2>
                        <div className="date-picker">
                            <DatePick
                                selectedDate={endDate}
                                onDateChange={setEndDate}
                                pickerLabel="End Date"
                                minDateTime={startDate ? dayjs(startDate).add(1, 'hour') : undefined}
                            />
                        </div>
                        <div className="mt-10 flex items-center justify-between gap-x-6">
                            {<Button text= "<" onClick={prevStep}/>}
                            {<Button text= "Start Poll"  onClick ={handleSubmit}/>}
                          
                          </div>
                        </div>
                     )}
                    {/* Third part of the poll */}

                    {/* Step indicators */}
                        <div className=" w-screen step-indicators flex justify-center">
                            {[1,2,3].map((s)=>(
                                <div
                                 key={s}
                                 onClick={()=> setStep(s)}
                                 className={`w-4 h-4 m-2 p-2 rounded-full flex items-center justify-center ${ step >= s ? 'bg-[#e65c00] text-white' : 'bg-gray-300 text-gray-500'}`}
                                >
                               
                                </div>
                               
                            ))}
                        </div>
                    {/* Step indicators */}
            </div>
        </form>

        </div>
    </div>
    </>
  )
}

export default CreateVote