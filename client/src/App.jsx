// import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Vote from './Components/Vote'
import Login from './Components/Login'
import Register from './Components/Register'
import Notfound from './Notfound'
import Footer from './Components/Footer'
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
          <Route path='/login' element= {<Login/>}/>
          <Route path='/register' element= {<Register/>}/>
          <Route path='*' element= {<Notfound/>}/>
        </Routes>
        <Footer/>
      </div>
    </div>
    </Router>
  )
}

export default App
