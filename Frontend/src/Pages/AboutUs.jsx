import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import finalkit from '../assets/final-kit.png'
import Zain from '../assets/faah.png'
import { useMediaQuery } from 'react-responsive'
import Footer from '../Components/common/Footer'

const AboutUs = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <div className="aliceblue">
      <Navbar />
      <section className="est" style={{flexDirection: isMobile ? "column" : "row"}}>
        <div>
          <h4 className="establish">ESTD. 2025, by</h4>
          <h4 className="establish-1">Dietitian Zain.</h4>
        </div>
        <img src={Zain} alt="Profile" />
      </section>
      <h5 className='slogan'>
        Built on a borrowed pitch and a simple idea: give every athlete a place to train hard, <br /> play fair, and belong to something bigger than themselves.
      </h5>
      <section className="quote">
        <i class="fa-solid fa-quote-right"></i>
        <h5>
          "I didn't want to hand people a diet sheet and send them off alone. I wanted a table people came back to."
        </h5>
        <h6>
          - Dietitian Zain , Founder
        </h6>
      </section>

      <section className="kit" style={{flexDirection: isMobile ? "column" : "row" , alignItems: isMobile ? "center" : "flex-start"}}>
        <img src={finalkit} alt="GRC kit" loading='lazy' />
        <div>
          <h2>Run With Pride</h2>
          <p>
            The official Gojra Running Club kit is more than just sportswear—it's
            a symbol of commitment, endurance, and community. Built for comfort
            and performance, our kit empowers every runner to achieve their goals.
          </p>
          <h3>"Your Limit Is Only You!"</h3>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default AboutUs
