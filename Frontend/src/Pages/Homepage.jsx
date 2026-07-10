import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Statistics from '../Components/Statistics'
import About from '../Components/About'
import Sponsors from '../Components/Sponsors'
import Special from '../Events/Special'
import Footer from '../Components/common/Footer'
import Mylogo from '../Components/common/Mylogo'
import Testimonial from '../Components/Testimonial'

const Homepage = () => {
  return (
    <>
      <section className="homepage">
        <Navbar />
        <section className='desktop'>
          <div class="blur blur1"></div>
          <div class="blur blur2"></div>
          <div class="blur blur3"></div>

          <div class="content">
            <h1>Gojra <span className='marg'>Running</span> <span className='blue1'>Club</span></h1>
            <h3>Discipline Beats Motivation</h3>
            <section className="btn-hero">
              <NavLink to='/events/regular'>Join Us</NavLink>
              <NavLink to='/events/special'>Upcoming Events</NavLink>
            </section>
          </div>
        </section>
        <Statistics />
        <Special />
        <About />
        <Mylogo />
        {/* <Sponsors /> */}
        <Testimonial />
        <Footer />
      </section>

    </>
  )
}

export default Homepage
