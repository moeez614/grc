import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import FAQ from '../FAQspecial'

const EventsCom = () => {
    const [Button, setButton] = useState(true)

    return (
        <div className="aliceblue">
            <section className='categary'>
                <h2>Events</h2>
                <h4>Join our training sessions, races, marathons, and special running events organized by our club.</h4>
                <div className="nav-container">
                    <button className='regular'>
                        <NavLink
                            to={"regular"}
                        >
                            Regular Events
                        </NavLink>
                    </button>
                    <button className='special'>
                        <NavLink
                            to={"special"}
                        >
                            Special Events
                        </NavLink>
                    </button>
                </div>
            </section>
            {/* <Outlet /> */}
            {/* <FAQ /> */}

        </div>
    )
}

export default EventsCom
