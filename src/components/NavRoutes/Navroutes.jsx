import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from '../../pages/Home/Home';
import Dashboard from '../Dashboard';
import Commingsoon from '../ComingSoon/ComingSoon';
import Donate from '../Donate'


const Navroutes = () => {
  return (
    <>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/dashboard' element={<Dashboard/>} >
        <Route path='claim' element={<Commingsoon />} />
        <Route path='donate' element={<Donate />} />
        </Route>
    </Routes>
    </>
  )
}

export default Navroutes