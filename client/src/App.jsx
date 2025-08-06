// import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import Vote from './Pages/Vote'
import Votepage from './Pages/Votepage'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Notfound from './Pages/Notfound'
import Footer from './Components/Footer'
import Contact from './Pages/Contact'
import CreateVote from './Components/Vote-Components/CreateVote'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProtectedRoutes from './Components/ProtectedRoutes'

function App() {
  

  return (
    <Router>
    <div className="w-full  bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar/>
      <div className='content-body'>
        <Routes>
          <Route path='/' element= {<Home/>}/>
          <Route path='/login' element= {<Login/>}/>
          <Route path='/register' element= {<Register/>}/>
          <Route path='/contact' element= {<Contact/>}/>
          <Route path='votepage/:id' element= {<Votepage/>}/>
          {/* Protected Routes */}
          <Route  element={<ProtectedRoutes/>}>
            <Route path='vote' element= {<Vote/>}/>
            <Route path='create-vote' element= {<CreateVote/>}/>
          </Route>
          {/* Protected Routes */}
          <Route path='*' element= {<Notfound/>}/>
        </Routes>
        <Footer/>
      </div>
    </div>
    </Router>
  )
}

export default App
