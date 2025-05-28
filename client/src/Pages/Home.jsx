import React from 'react'
import Hero from './Hero'
import Features from '../Components/Features'
import CallToAction from '../Components/CallToAction'
const Home = () => {
  return (
    <div className='home-body'>
      <Hero/>
      <Features/>
      <CallToAction/>
    </div>
  )
}

export default Home