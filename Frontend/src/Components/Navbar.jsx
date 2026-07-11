import React from 'react'
import logo_image from '../assets/grc-logo.webp'
import { NavLink } from 'react-router-dom'
import { useMediaQuery } from "react-responsive";
import { useState } from 'react';

const Navbar = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [Bar, setBar] = useState(false)
    return (
        <div>

            <section className='navbar'>
                <img src={logo_image} alt="GRC" loading='lazy' width={80} height={80}/>
                {
                    !isMobile ?
                        (<nav>
                            <ul>
                                <li><NavLink to="/">Home</NavLink></li>
                                <li><NavLink to="/about">About</NavLink></li>
                                <li><NavLink to="/events/regular">Events</NavLink></li>
                                <li><NavLink to="/members">Members</NavLink></li>
                                <li><NavLink to="/gallery">Gallery</NavLink></li>
                                <li><NavLink to="/sponsors">Sponsors</NavLink></li>
                                <li><NavLink to="/login" target='_Blank'>Login</NavLink></li>
                            </ul>
                        </nav>)
                        :
                        (
                            <div onClick={() => setBar(!Bar)}>
                                {Bar ? (
                                    <i className="fa-solid fa-xmark xxl"></i>
                                ) : (
                                    <i className="fa-solid fa-bars xxl"></i>
                                )}
                                {
                                    Bar && (
                                        <nav className='mobilenav'>
                                            <ul>
                                                <li><NavLink to="/">Home</NavLink></li>
                                                <li><NavLink to="/about">About</NavLink></li>
                                                <li><NavLink to="/events/regular">Events</NavLink></li>
                                                <li><NavLink to="/members">Members</NavLink></li>
                                                <li><NavLink to="/gallery">Gallery</NavLink></li>
                                                <li><NavLink to="/sponsors">Sponsors</NavLink></li>
                                            </ul>
                                        </nav>
                                    )
                                }
                            </div>
                            
                        )}
            </section>

            {/* <section className='navbar'>
                <img src={logo_image} alt="GRC" loading='lazy' width={80} />
                <nav>
                    <ul>
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                        <li><NavLink to="/events">Events</NavLink></li>
                        <li><NavLink to="/members">Members</NavLink></li>
                        <li><NavLink to="/gallery">Gallery</NavLink></li>
                        <li><NavLink to="/sponsors">Sponsors</NavLink></li>
                        <li><NavLink to="/blogs">Blogs</NavLink></li>
                        <li><NavLink to="/contact">Contact</NavLink></li>
                        <li><NavLink to="/login">Login</NavLink></li>
                    </ul>
                </nav>
            </section> */}
        </div>
    )
}

export default Navbar
