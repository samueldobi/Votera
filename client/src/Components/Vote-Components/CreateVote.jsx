import React from 'react'
import { useState } from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import Button from '../Button';

const CreateVote = () => {
    // States
    const [step, setStep] =  useState(1);
    const [participants, setParticipants] =  useState([]);
    const [formName, setFormName] = useState();
    const[formData, setFormData] = useState({
        name: '',
        details:'',
        image:''
    })
    // State Functions
    const handleChange = (e) =>{
       const updatedForm = {...formData, [e.target.name]:e.target.value}
       setFormData(updatedForm)
       console.log(updatedForm)
    }
    // const updateInput = (e) =>{
    //     setFormData((prev)=>({
    //         ...prev,
    //         [e.target.name]:e.target.value
    //     }))
    // };
    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);
  return (
    <>
    <div className="h-screen flex min-h-full flex-1 flex-col  px-6 py-12 lg:px-8">
                <h2 className="text-2xl/7 m-3  font-semibold text-gray-900">Poll Details</h2>
        <div className="border border-gray-300 rounded-md p-4">
        <form>

                <div className="w-full mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* First page of the poll details form */}
                    {step === 1 && (
                        <div className="sm:col-span-8">
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
                            placeholder='Dscribe What the poll is about shortly'
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#e65c00] sm:text-sm/6"
                            defaultValue={''}
                            />
                        </div>
                        
                        </div>
                        {/* Poll Description Div */}

                        {/* Button Div */}
                        <div className="m-3 p-3">
                            {<Button text= "Next Step" onClick={nextStep}/>}
                        </div>
                         {/* Button Div */}
                        </div>)}
                    {/* First page of the poll details form */}


                    {/* Second part of the poll details form */}
                     {step === 2 && (
                        <div className="sm:col-span-8"> 
                          <h2 className='text-2xl/7 m-3  font-semibold text-gray-900'>Add Contestant Details</h2>
                          {/* Add participant  */}
                           <div>
                            {/* Participant Name */}
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
                             <div>
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
                            {/* Participant Image  */}

                           </div>
                          {/* Add participant  */}
                            <div className="mt-10 flex items-center justify-between gap-x-6">
                            {<Button text= "Prev Step" onClick={prevStep}/>}
                            {<Button text= "Next Step" onClick={nextStep}/>}
                            
                            </div>
                            
                        </div>

                     )}

                    {/* Second part of the poll details form */}
                    {/* Third part of the poll */}
                     {step === 3 && (
                        <div className="sm:col-span-8"> 

                        <div className="mt-10 flex items-center justify-between gap-x-6">
                            {<Button text= "Prev Step" onClick={prevStep}/>}
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
                               {/* for the horizontal line{} */}
                                {/* {index < 2 &&(
                                    <div  className={` ${ step > s ?'bg-blue-500' : 'bg-gray-300'  }`}></div>
                                ) } */}
                            {/* for the horizontal line */}
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