// import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Vote from './Components/Vote';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  

  return (
    <Router>
    <div className="w-full">
      <Navbar/>
      <div className='content-body'>
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/vote' element= {<Vote/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  )
}

export default App
