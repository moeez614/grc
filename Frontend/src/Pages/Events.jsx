import React from 'react'
import Navbar from '../Components/Navbar'
import EventCom from '../Components/common/EventsCom'
import { NavLink , Outlet } from 'react-router-dom'
import FAQ from '../Components/FAQspecial'
import Footer from '../Components/common/Footer'
import '../css/Special.css'
const Events = () => {
  return (
    <div className='aliceblue'>
      <Navbar />
      <EventCom />
      <Outlet />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Events
