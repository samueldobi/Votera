import React from 'react'
import { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Button from '../Button';
import DatePick from './DatePick';
import AlertBox from './AlertBox';
import ParticipantTable from './ParticipantTable';


const CreateVote = () => {
    // States
    // state for changing the step in the multistepper form
    const [step, setStep] =  useState(1);
    // State for tracking the participants added in the voting poll
    const [participants, setParticipants] =  useState([]);
    // State for displaying alerts if the input is empty
    const [showAlert, setShowAlert] = useState(false);
    // state for validating that particpants are more than one
    const [voterAmount, setVoterAmount] = useState(false);
    // State for the general poll name and poll details
    const [formDetails, setFormDetails] = useState({
        name:'',
        about:''
    });
      // State for the participant  name and participant details
    const[formData, setFormData] = useState({
        name: '',
        details:'',
        image:''
    })
    // Function to update the input when someoen types in data 
    const handleChange = (e) =>{
       const updatedForm = {...formData, [e.target.name]:e.target.value}
       setFormData(updatedForm)
       console.log(updatedForm)
    }
    // this function checks that the form input is filled or else throws an alert and stops executing further
    const handleAddParticipant = () => {
        if(formData.name.trim() === '' ||  formData.details.trim() === ''){
           setShowAlert(true)
            return;
        };
        setShowAlert(false)
        // setParticipants([...participants, formData])
            // Create new participant object
            const newParticipant ={
                id: Date.now(),
                name:formData.name,
                details:formData.details,
            }
        setParticipants((prev)=>[...prev, newParticipant])
        setFormData({name:'', details:'', image:''})
    }
 

    // functions to move to either previous or next slide
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
  return (
    <>
    <div className=" flex min-h-full flex-1 flex-col  px-6 py-12 lg:px-8">
                <h2 className="text-2xl/7 m-3  font-semibold text-gray-900">Poll Details</h2>
        <div className="border border-gray-300 rounded-md p-4">
        <form>

                <div className="w-full mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
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
                          {/* Add participant  */}
                            {/* Participant Name */}
                            {/* Alert Box */}
                             {showAlert && <AlertBox  text = "fill all inputs"/>}
                             {voterAmount && <AlertBox  text = "You must add at least two participants"/>}
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
                              {/* Participant Name */}

                            {/* Participant Detail  */}
                             <div className='participant-details-div'>
                       
                             <label htmlFor="Name" className="block text-lg/6 font-medium text-gray-900 m-3 p-3">
                                    Participant Details
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
                            {/* Participant Detail  */}


                            {/* Participant Image  */}
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
                              <div className="add-participant-btn m-6 p-3">
                                <Button text= "Add Participant" onClick={ handleAddParticipant}/>
                              </div>
                            {/* Participant Image  */}

                           </div>
                          {/* Add participant  */}
                       
                          <div className="">
                            {/* {participants.map((participant, index)=>(
                                <div className="" key={index}
                                >
                                    <p>{participant.name}</p>
                                    <p>{participant.details}</p>
                                    {participant.image && <img src={participant.image} alt={participant.name} className="w-24 h-24 mt-2 object-cover rounded" />}
                                </div>
                            ))} */}
                          </div>
                          {/* Add participant  */}

                          {/* Paticipant Table */}
                            <div>
                                <ParticipantTable rowDetails={participants}/>
                            </div>
                          {/* Paticipant Table */}
                            <div className="mt-10 flex items-center justify-between gap-x-6">
                            {<Button text= " < "  onClick={prevStep}/>}
                            {<Button text= " >" onClick={()=>{
                                if(participants.length <= 1 ){                           
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
                            <DatePick/>
                        </div>
                        <h2 className= "m-6 p-2">Pick End Date</h2>
                        <div className="date-picker">
                            <DatePick/>
                        </div>
                        <div className="mt-10 flex items-center justify-between gap-x-6">
                            {<Button text= "<" onClick={prevStep}/>}
                            {<Button text= "Start Poll" />}
                          
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