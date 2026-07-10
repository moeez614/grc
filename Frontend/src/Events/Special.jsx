import React from 'react'
import { useState } from 'react'
import "../css/Special.css"
import august from '../assets/august.webp'
import desktop from '../assets/final-desktop.webp'
import { NavLink, Outlet } from 'react-router-dom'
// import FAQ from '../Components/FAQspecial'

const Special = () => {

    return (
        <div className='aliceblue'>
            <section className='special-ka'>

                <div className="event-card">

                    <div className="event-banner">
                        <img
                            src={august}
                            alt="GRC Half Marathon"
                            loading='lazy'
                        />

                        <span className="status open">
                            Open
                        </span>
                    </div>

                    <div className="event-content">
                        <h2>Pakistan Independence Run</h2>

                        <div className="countdown">
                            <h4>Event Starts In</h4>
                            <p>15 Days : 08 Hours : 24 Minutes</p>
                        </div>

                        <div className="actions">
                            <NavLink to="/events/special/description" className="register-btn1">
                                Register Now
                            </NavLink>

                            <NavLink to="/events/special/results" className="share-btn1">
                                Event Results
                            </NavLink>
                        </div>

                    </div>

                </div>
                <div className="event-card">

                    <div className="event-banner">
                        <img
                            src={desktop}
                            alt="GRC Half Marathon"
                            loading='lazy'
                        />

                        <span className="status open">
                            Open
                        </span>
                    </div>

                    <div className="event-content">
                        <h2>GRC Half Marathon 2026</h2>

                        <div className="countdown">
                            <h4>Event Starts In</h4>
                            <p>19 Days : 08 Hours : 24 Minutes</p>
                        </div>

                        <div className="actions">
                            <NavLink to="/events/special/description" className="register-btn1">
                                Register Now
                            </NavLink>

                            <NavLink to="/events/special/results" className="share-btn1">
                                Event Results
                            </NavLink>
                        </div>

                    </div>

                </div>
                
            </section>
        </div>
    )
}

export default Special
