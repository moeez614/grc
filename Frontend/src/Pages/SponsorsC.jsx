import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/common/Footer'
import Mylogo from '../Components/common/Mylogo'
import { FaHandshake, FaHeart, FaRunning, FaBuilding, FaAward } from "react-icons/fa";
const SponsorsC = () => {
    return (
        <div className='aliceblue'>
            <Navbar />
            <div className="sponsor-page aliceblue">

                {/* ================= HERO ================= */}

                <section className="sponsor-hero">

                    <div className="hero-overlay">

                        <div className="hero-content">

                            <h1>
                                Partner With
                                <span> Gojra Running Club</span>
                            </h1>

                            <p>
                                Together we inspire healthier lifestyles, stronger communities,
                                and unforgettable running events. Become a valued sponsor and
                                grow your brand while supporting local athletes.
                            </p>

                            <button>
                                Become a Sponsor
                            </button>

                        </div>

                    </div>

                </section>

                {/* ================= INTRO ================= */}

                <section className="sponsor-intro">

                    <div className="intro-heading">

                        <h2>
                            Why Sponsor Us?
                        </h2>

                    </div>

                    <p className="intro-text">

                        Gojra Running Club is committed to promoting fitness,
                        wellness, and community engagement through running
                        events, marathons, awareness campaigns, and youth
                        activities.

                        <br /><br />

                        By partnering with us, your organization gains valuable
                        brand exposure while contributing to healthier lives
                        and a stronger community.

                    </p>

                    <div className="intro-cards">

                        <div className="intro-card">

                            <FaRunning className="icon" />

                            <h3>Community Reach</h3>

                            <p>
                                Connect with hundreds of runners, families,
                                students, and fitness enthusiasts.
                            </p>

                        </div>

                        <div className="intro-card">

                            <FaHandshake className="icon" />

                            <h3>Brand Visibility</h3>

                            <p>
                                Showcase your brand on race banners,
                                event shirts, social media, and our website.
                            </p>

                        </div>

                        <div className="intro-card">

                            <FaHeart className="icon" />

                            <h3>Support Healthy Living</h3>

                            <p>
                                Help us encourage active lifestyles and
                                inspire future athletes in our community.
                            </p>

                        </div>

                    </div>

                </section>

            </div>
            <section className="sponsor-page">

                <div className="hero">
                    <h1>Our Sponsors</h1>

                    <p>
                        Together we inspire a healthier lifestyle and build a stronger
                        running community in Gojra.
                    </p>

                </div>
                <Mylogo />
            </section>
            <Footer />
        </div>
    )
}

export default SponsorsC
