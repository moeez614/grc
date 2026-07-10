import React from 'react'
import Navbar from '../Components/Navbar'
import "../css/Description.css"
import { useState } from 'react'
import FAQ from '../Components/FAQspecial'
import Footer from '../Components/common/Footer'
import heroImage from "../assets/august.webp"
import { Link, NavLink } from "react-router-dom";
import {
    FaMedal,
    FaRunning,
    FaTshirt,
    FaCertificate,
} from "react-icons/fa";


import { MapContainer, TileLayer, Polyline, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

const route = [
    [31.153188908141274, 72.68410046936005],
    [31.15052193508788, 72.68120668787662],
    [31.153496644098674, 72.67206372590024],
    [31.15052193508788, 72.68120668787662],
    [31.149930236872446, 72.68111535271103],
    [31.147359596949407, 72.6844877806109],
    [31.145900462126757, 72.68651872176845],
    [31.148983932545942, 72.68987007547413],
    [31.148515520273392, 72.69054461044534],
    [31.15805354693337, 72.70020888276696],
    [31.158800259352947, 72.69952626401954],
    [31.175028491776626, 72.69935795843595],
];
const categories = [
    {
        id: 1,
        title: "5 KM",
        age: "12+ Years",
        fee: "PKR 800",
        color: "#2BC4DA",
        features: [
            "Perfect for beginners",
            "Finisher Medal",
            "Bib Number",
            "E-Certificate",
            "Refreshments",
        ],
    },
    {
        id: 2,
        title: "10 KM",
        age: "16+ Years",
        fee: "PKR 1200",
        color: "#ED2974",
        features: [
            "Competitive Category",
            "Premium Medal",
            "Race Bib",
            "E-Certificate",
            "T-Shirt Included",
            "Refreshments",
        ],
    },
];

const SpecialDesc = () => {
    return (
        <div>
            <Navbar />
            <section className="special-event aliceblue">

                {/* ================= Hero ================= */}
                <section className="hero">
                    <div className="hero-overlay"></div>

                    {/* <img src={heroImage} alt="Independence Run" className="hero-img" /> */}

                    <div className="hero-content">

                        <h1>
                            Independence Day Run
                            <span>2026</span>
                        </h1>

                        <p>
                            Celebrate Pakistan's Independence with an unforgettable running
                            experience. Challenge yourself, inspire others, and run together
                            for health, unity, and patriotism.
                        </p>

                        <div className="hero-info">

                            <div>
                                <h4>📅 Date</h4>
                                <p>14 August 2026</p>
                            </div>

                            <div>
                                <h4>📍 Venue</h4>
                                <p>Gojra Sports Complex</p>
                            </div>

                            <div>
                                <h4>🏃 Categories</h4>
                                <p>5KM • 10KM</p>
                            </div>

                        </div>

                        <NavLink className="register-btn" to="/events/special/register" target="_blank">
                            Register Now
                        </NavLink>

                    </div>

                </section>

                {/* ================= Event Details ================= */}

                <section className="details">

                    <div className="heading">
                        <span>EVENT INFORMATION</span>
                        <h2>Everything You Need to Know</h2>
                        <p>
                            Join hundreds of runners for an exciting Independence Day Run
                            organized by Gojra Running Club.
                        </p>
                    </div>

                    <div className="details-grid">

                        <div className="detail-card">
                            <h3>🏁 Event Name</h3>
                            <p>Independence Day Run 2026</p>
                        </div>

                        <div className="detail-card">
                            <h3>📅 Event Date</h3>
                            <p>14 August 2026</p>
                        </div>

                        <div className="detail-card">
                            <h3>⏰ Reporting Time</h3>
                            <p>06:00 AM</p>
                        </div>

                        <div className="detail-card">
                            <h3>🚩 Race Start</h3>
                            <p>07:00 AM</p>
                        </div>

                        <div className="detail-card">
                            <h3>📍 Venue</h3>
                            <p>Gojra Sports Complex</p>
                        </div>

                        <div className="detail-card">
                            <h3>🏃 Event Type</h3>
                            <p>Competitive Road Race</p>
                        </div>

                        <div className="detail-card">
                            <h3>📝 Registration Deadline</h3>
                            <p>10 August 2026</p>
                        </div>

                    </div>

                </section>

            </section>
            <section className="race-section aliceblue">

                <div className="section-title">
                    <h2>Race Categories</h2>
                    <p>Choose your challenge and be part of the Gojra Running Club experience.</p>
                </div>

                <div className="category-container">

                    {categories.map((item) => (
                        <div
                            className="category-card"
                            key={item.id}
                            style={{ borderTop: `6px solid ${item.color}` }}
                        >
                            <h3>{item.title}</h3>

                            <div className="info">

                                <div>
                                    <span>Age Limit</span>
                                    <h4>{item.age}</h4>
                                </div>

                                <div>
                                    <span>Registration Fee</span>
                                    <h4>{item.fee}</h4>
                                </div>

                            </div>

                            <ul>
                                {item.features.map((feature, index) => (
                                    <li key={index}>✔ {feature}</li>
                                ))}
                            </ul>

                            <NavLink to={"/events/special/register"} target="_blank">Register Now</NavLink>

                        </div>
                    ))}

                </div>

            </section>
            <section className="route aliceblue">

                <h2>Running Route</h2>

                <p>Follow the official race route for Independence Day Run.</p>

                <MapContainer
                    center={route[0]}
                    zoom={13}
                    scrollWheelZoom={true}
                    className="map"
                >
                    <TileLayer
                        attribution="&copy; OpenStreetMap contributors"
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Polyline
                        positions={route}
                        pathOptions={{
                            color: "#ED2974",
                            weight: 6,
                        }}
                    />

                    <Marker position={route[0]}>
                        <Tooltip permanent direction="top" offset={[0, -10]} className="finish-tooltip">
                            🏁 Start Point
                        </Tooltip>
                    </Marker>
                    <Marker position={route[route.length - 1]}>
                        <Tooltip permanent direction="top" offset={[0, -10]} className="finish-tooltip">
                            🏆 Finish Point
                        </Tooltip>
                    </Marker>

                </MapContainer>

            </section>
            <FAQ />
            <section className="registerCTA aliceblue">

                <div className="cta-overlay">

                    <h4>GOJRA RUNNING CLUB</h4>

                    <h1>
                        Ready to Challenge Yourself?
                    </h1>

                    <p>
                        Join hundreds of passionate runners and become part of
                        the Independence Day Run 2026. Push your limits,
                        earn your finisher medal, and celebrate fitness with
                        Pakistan's running community.
                    </p>

                    <div className="cta-buttons">
                        <Link to="/events/special" className="eventBtn">
                            View All Events
                        </Link>
                        <Link to="/events/special/register" target="_blank" className="registerBtn">
                            Register Now
                        </Link>
                    </div>

                </div>

            </section>
        </div>
    )
}

export default SpecialDesc
