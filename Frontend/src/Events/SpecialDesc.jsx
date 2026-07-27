// to={`/events/special/register/${event._id}?distance=${category.raceDistance}`}

import Navbar from '../Components/Navbar';
import FAQ from '../Components/FAQspecial';
import Footer from '../Components/common/Footer';
import heroImage from "../assets/august.webp";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import {
    FaMedal,
    FaRunning,
    FaTshirt,
    FaCertificate,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaClock,
    FaFlagCheckered,
    FaCheck,
    FaArrowRight
} from "react-icons/fa";

import { MapContainer, TileLayer, Polyline, Marker, Tooltip } from "react-leaflet";
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

const SpecialDesc = () => {

    const { id } = useParams();

    const [event, setEvent] = useState(null);

    const getEvent = async () => {
        try {
            const response = await API.get(`/annual-events/${id}`);
            setEvent(response.data);
        } catch (err) {
            console.log("Error:", err);
            console.log("Response:", err.response);
        }
    };
    useEffect(() => {
        getEvent();
    }, [id]);
    if (!event) {
        return (
            <>
                <Navbar />
                <div style={{ padding: "100px", textAlign: "center" }}>
                    Loading...
                </div>
                <Footer />
            </>
        );
    }
    const route = event.coordinates.map(item => {
        const [lat, lng] = item.split(",").map(Number);
        return [lat, lng];
    });



    const detailsData = [
        {
            icon: <FaFlagCheckered />,
            label: "Event Name",
            value: event.eventName,
        },
        {
            icon: <FaCalendarAlt />,
            label: "Event Date",
            value: new Date(event.eventDate).toLocaleDateString("en-GB"),
        },
        {
            icon: <FaClock />,
            label: "Reporting Time",
            value: event.reportingTime,
        },
        {
            icon: <FaRunning />,
            label: "Race Start",
            value: event.raceStartTime,
        },
        {
            icon: <FaMapMarkerAlt />,
            label: "Venue",
            value: event.location,
        },
        {
            icon: <FaMedal />,
            label: "Registration Deadline",
            value: new Date(event.registrationDeadline).toLocaleDateString("en-GB"),
        },
    ];

    return (
        <div className="special-wrapper">
            {/* Dynamic CSS Styles Inline */}
            <style>{`
        :root {
          --twilight-indigo: #1B2F51;
          --pacific-blue: #2BC4DA;
          --razzmatazz: #ED2974;
          --bg-alice: aliceblue;
          --text-dark: #111827;
          --text-muted: #4B5563;
        }

        .special-wrapper {
          background-color: var(--bg-alice);
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          color: var(--text-dark);
          line-height: 1.6;
        }

        /* Hero Section */
        .hero-section {
          position: relative;
          background: linear-gradient(135deg, var(--twilight-indigo) 0%, #0d1a30 100%);
          color: #ffffff;
          padding: 80px 20px 100px;
          border-radius: 0 0 40px 40px;
          overflow: hidden;
        }

        .hero-glow-1 {
          position: absolute;
          top: -100px;
          right: -100px;
          width: 350px;
          height: 350px;
          background: var(--razzmatazz);
          opacity: 0.25;
          filter: blur(120px);
          border-radius: 50%;
        }

        .hero-glow-2 {
          position: absolute;
          bottom: -100px;
          left: -100px;
          width: 350px;
          height: 350px;
          background: var(--pacific-blue);
          opacity: 0.25;
          filter: blur(120px);
          border-radius: 50%;
        }

        .hero-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .badge-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 18px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 30px;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--pacific-blue);
          margin-bottom: 24px;
        }

        .hero-container h1 {
          font-size: clamp(2.5rem, 6vw, 4.2rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -1px;
        }

        .hero-container h1 span {
          background: linear-gradient(90deg, var(--pacific-blue), var(--razzmatazz));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-container p {
          max-width: 700px;
          margin: 0 auto 36px;
          font-size: 1.15rem;
          color: #d1d5db;
        }

        .hero-pills {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          margin-bottom: 40px;
        }

        .pill-item {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 12px 24px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          backdrop-filter: blur(8px);
          text-align: left;
        }

        .pill-item .icon {
          color: var(--pacific-blue);
          font-size: 1.2rem;
        }

        .pill-item .text-title {
          font-size: 0.75rem;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: block;
        }

        .pill-item .text-val {
          font-size: 0.95rem;
          font-weight: 700;
          color: #ffffff;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, var(--razzmatazz), #c41e5b);
          color: #ffffff;
          padding: 16px 36px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.05rem;
          text-decoration: none;
          box-shadow: 0 10px 25px rgba(237, 41, 116, 0.4);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(237, 41, 116, 0.6);
        }

        /* Section Layout Common */
        .section-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 80px 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 50px;
        }

        .section-header .sub-tag {
          color: var(--razzmatazz);
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          display: block;
          margin-bottom: 8px;
        }

        .section-header h2 {
          font-size: clamp(2rem, 4vw, 2.8rem);
          font-weight: 800;
          color: var(--twilight-indigo);
          letter-spacing: -0.5px;
        }

        .section-header p {
          color: var(--text-muted);
          max-width: 600px;
          margin: 10px auto 0;
          font-size: 1rem;
        }

        /* Info Grid */
        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .info-card {
          background: #ffffff;
          padding: 24px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0 4px 20px rgba(27, 47, 81, 0.05);
          border: 1px solid rgba(27, 47, 81, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .info-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(27, 47, 81, 0.08);
        }

        .info-icon {
          width: 54px;
          height: 54px;
          border-radius: 16px;
          background: rgba(43, 196, 218, 0.12);
          color: var(--twilight-indigo);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
          flex-shrink: 0;
        }

        .info-meta span {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .info-meta h4 {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--twilight-indigo);
          margin-top: 2px;
        }

        /* Category Cards */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          align-items: stretch;
        }

        .category-card {
          background: #ffffff;
          border-radius: 28px;
          padding: 40px 32px;
          position: relative;
          box-shadow: 0 10px 30px rgba(27, 47, 81, 0.06);
          border: 2px solid transparent;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s ease;
        }

        .category-card:hover {
          transform: translateY(-8px);
        }

        .category-card.popular {
          border-color: var(--razzmatazz);
        }

        .popular-badge {
          position: absolute;
          top: -16px;
          right: 30px;
          background: var(--razzmatazz);
          color: #ffffff;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .cat-header h3 {
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--twilight-indigo);
        }

        .cat-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-top: 4px;
        }

        .price-tag {
          margin: 24px 0;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .price-tag .amount {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--twilight-indigo);
        }

        .price-tag .label {
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .cat-features {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
        }

        .cat-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
          color: var(--text-dark);
          font-size: 0.95rem;
          font-weight: 500;
        }

        .cat-features li svg {
          color: var(--pacific-blue);
          font-size: 1rem;
        }

        .btn-card {
          width: 100%;
          text-align: center;
          padding: 14px;
          border-radius: 14px;
          font-weight: 700;
          text-decoration: none;
          display: block;
          transition: background 0.2s ease, color 0.2s ease;
        }

        /* Map Section */
        .map-card-wrapper {
          background: #ffffff;
          border-radius: 28px;
          padding: 16px;
          box-shadow: 0 10px 30px rgba(27, 47, 81, 0.06);
          overflow: hidden;
        }

        .map {
          height: 420px;
          width: 100%;
          border-radius: 20px;
        }

        /* CTA Section */
        .cta-box {
          background: linear-gradient(135deg, var(--twilight-indigo) 0%, #0d1a30 100%);
          border-radius: 32px;
          padding: 60px 30px;
          text-align: center;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          margin-bottom: 60px;
        }

        .cta-box h2 {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .cta-box p {
          max-width: 600px;
          margin: 0 auto 32px;
          color: #d1d5db;
        }

        .cta-actions {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-outline {
          border: 2px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 50px;
          font-weight: 700;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease;
        }

        .btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #ffffff;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .hero-section {
            padding: 60px 16px 80px;
          }
          .hero-pills {
            flex-direction: column;
            align-items: stretch;
          }
          .pill-item {
            justify-content: flex-start;
          }
          .section-container {
            padding: 50px 16px;
          }
          .map {
            height: 320px;
          }
        }
          /* ================= Hero Section Styles ================= */
.hero-section {
  position: relative;
  background: linear-gradient(135deg, #1B2F51 0%, #0c182b 100%);
  color: #FFFFFF;
  padding: 80px 20px 100px;
  overflow: hidden;
  border-radius: 0 0 40px 40px;
}

.hero-glow-left {
  position: absolute;
  top: -100px;
  left: -80px;
  width: 320px;
  height: 320px;
  background: #2BC4DA;
  opacity: 0.2;
  filter: blur(120px);
  border-radius: 50%;
}

.hero-glow-right {
  position: absolute;
  bottom: -80px;
  right: -80px;
  width: 350px;
  height: 350px;
  background: #ED2974;
  opacity: 0.25;
  filter: blur(130px);
  border-radius: 50%;
}

.hero-container {
  max-width: 1150px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  align-items: center;
  position: relative;
  z-index: 2;
}

/* Left Column Styling */
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(43, 196, 218, 0.12);
  border: 1px solid rgba(43, 196, 218, 0.3);
  color: #2BC4DA;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 20px;
}

.badge-icon {
  font-size: 1rem;
}

.hero-title {
  font-size: clamp(2.4rem, 5vw, 3.8rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -1px;
  margin-bottom: 18px;
}

.hero-title-gradient {
  background: linear-gradient(90deg, #2BC4DA, #ED2974);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #D1D5DB;
  line-height: 1.6;
  margin-bottom: 30px;
  max-width: 520px;
}

.hero-meta-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.meta-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 10px 18px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  backdrop-filter: blur(8px);
}

.meta-icon {
  color: #2BC4DA;
  font-size: 1.2rem;
}

.meta-label {
  display: block;
  font-size: 0.72rem;
  color: #9CA3AF;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.meta-val {
  font-size: 0.95rem;
  color: #FFFFFF;
  font-weight: 700;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.btn-hero-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #ED2974 0%, #c41e5b 100%);
  color: #FFFFFF;
  padding: 14px 32px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  box-shadow: 0 10px 25px rgba(237, 41, 116, 0.4);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.btn-hero-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 30px rgba(237, 41, 116, 0.6);
}

.btn-hero-secondary {
  color: #FFFFFF;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  padding: 13px 26px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.btn-hero-secondary:hover {
  border-color: #2BC4DA;
  background: rgba(43, 196, 218, 0.1);
}

/* Right Column Visual Card */
.hero-visual-col {
  position: relative;
}

.visual-card {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: #1B2F51;
}

.hero-img {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
}

.visual-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(27, 47, 81, 0.1) 0%, rgba(27, 47, 81, 0.6) 100%);
}

.floating-chip {
  position: absolute;
  background: rgba(27, 47, 81, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px);
  padding: 10px 16px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.chip-top {
  top: 20px;
  right: 20px;
}

.chip-bottom {
  bottom: 20px;
  left: 20px;
}

.chip-icon {
  font-size: 1.4rem;
}

.medal-color {
  color: #2BC4DA;
}

.race-color {
  color: #ED2974;
}

.chip-title {
  margin: 0;
  font-size: 0.72rem;
  color: #9CA3AF;
  text-transform: uppercase;
  font-weight: 700;
}

.chip-sub {
  margin: 0;
  font-size: 0.88rem;
  color: #FFFFFF;
  font-weight: 700;
}

/* Mobile Responsiveness */
@media (max-width: 900px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .hero-subtitle {
    margin: 0 auto 24px;
  }
  .hero-meta-bar {
    justify-content: center;
  }
  .hero-actions {
    justify-content: center;
  }
  .hero-img {
    height: 280px;
  }
}
      `}</style>

            <Navbar />
            {/* ================= Modern Hero Section ================= */}
            <section className="hero-section">

                {/* Ambient Background Glows */}
                <div className="hero-glow-left" />
                <div className="hero-glow-right" />

                <div className="hero-container">
                    {/* Left Column: Core Messaging */}
                    <div className="hero-text-col">

                        <h1 className="hero-title">
                            {event.eventName}
                        </h1>

                        <p className="hero-subtitle">
                            Run for unity, health, and patriotism.
                        </p>

                        {/* Quick Event Info Bar */}
                        <div className="hero-meta-bar">
                            <div className="meta-item">
                                <FaCalendarAlt className="meta-icon" />
                                <div>
                                    <span className="meta-label">Date</span>
                                    <strong className="meta-val">{
                                        new Date(event.eventDate).toLocaleDateString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric"
                                        })
                                    }
                                    </strong>
                                </div>
                            </div>
                            <div className="meta-item">
                                <FaMapMarkerAlt className="meta-icon" />
                                <div>
                                    <span className="meta-label">Venue</span>
                                    <strong className="meta-val">{event.location}</strong>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="hero-actions">
                            <NavLink className="btn-hero-primary" to={`/events/special/register/${event._id}`} target="_blank">
                                Register Now <FaArrowRight />
                            </NavLink>
                           
                            <a
                                href="#"
                                className="btn-hero-secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .getElementById("route-section")
                                        ?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                Explore Route
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Visual Preview Card */}
                    <div className="hero-visual-col">
                        <div className="visual-card">
                            <img
                                src={
                                    event.banner
                                        ? `${import.meta.env.VITE_API_URL}/uploads/annual-events/banners/${event.banner.split("/").pop()}`
                                        : heroImage
                                }
                                alt={event.eventName}
                                className="hero-img"
                            />
                            <div className="visual-overlay" />

                        </div>
                    </div>
                </div>
            </section>
            {/* ================= Event Details ================= */}
            <section className="section-container">
                <div className="section-header">
                    <span className="sub-tag">Event Information</span>
                    <h2>Everything You Need To Know</h2>
                    <p>Get ready for Gojra's premier running event. Here are the core event specifications.</p>
                </div>

                <div className="info-grid">
                    {detailsData.map((item, idx) => (
                        <div className="info-card" key={idx}>
                            <div className="info-icon">{item.icon}</div>
                            <div className="info-meta">
                                <span>{item.label}</span>
                                <h4>{item.value}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= Race Categories ================= */}
            <section className="section-container" style={{ paddingTop: 0 }}>
                <div className="section-header">
                    <span className="sub-tag">Choose Your Distance</span>
                    <h2>Race Categories</h2>
                    <p>Select a category tailored to your fitness level and join the challenge.</p>
                </div>

                <div className="categories-grid">
                    {event.categories.map((category, index) => (
                        <div
                            className={`category-card ${index === 0 ? "popular" : ""}`}
                            key={category._id || index}
                        >
                            {/* {item.popular && <span className="popular-badge">Most Popular</span>} */}

                            <div>
                                <div className="cat-header">
                                    <h3>{category.raceDistance}</h3>
                                </div>

                                <div className="price-tag">
                                    <span className="amount">PKR {category.registrationFee}</span>
                                    <span className="label">• Age {category.ageLimit}+</span>
                                </div>

                                <ul className="cat-features">
                                    {category.allowances.map((item, i) => (
                                        <li key={i}>
                                            <FaCheck />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <NavLink
                                to={`/events/special/register/${event._id}?distance=${category.raceDistance}`}
                                target="_blank"
                                className="btn-card"
                                style={{
                                    background: category.popular ? 'var(--razzmatazz)' : 'var(--twilight-indigo)',
                                    color: '#ffffff'
                                }}
                            >
                                Register For {category.raceDistance}
                            </NavLink>
                        </div>
                    ))}
                </div>
            </section>

            {/* ================= Running Route Map ================= */}
            <section id="route-section" className="section-container" style={{ paddingTop: 0 }}>
                <div className="section-header">
                    <span className="sub-tag">Official Course</span>
                    <h2>Race Route Map</h2>
                    <p>Explore the official track designed for maximum safety and high energy performance.</p>
                </div>

                <div className="map-card-wrapper">
                    {route.length === 0 ? (
                        <p>No route available.</p>
                    ) : (
                        <MapContainer
                            center={route[0]}
                            zoom={13}
                            scrollWheelZoom={false}
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
                                    weight: 5,
                                    opacity: 0.9
                                }}
                            />

                            <Marker position={route[0]}>
                                <Tooltip permanent direction="top" offset={[0, -10]}>
                                    🏁 Start Point
                                </Tooltip>
                            </Marker>

                            <Marker position={route[route.length - 1]}>
                                <Tooltip permanent direction="top" offset={[0, -10]}>
                                    🏆 Finish Point
                                </Tooltip>
                            </Marker>
                        </MapContainer>
                    )}
                </div>
            </section>

            {/* ================= FAQ Section ================= */}
            <FAQ />

            {/* ================= CTA Section ================= */}
            <section className="section-container" style={{ paddingTop: 20 }}>
                <div className="cta-box">
                    <h2>Ready To Take The Challenge?</h2>
                    <p>
                        Join hundreds of passionate runners in Gojra. Earn your medal, experience the thrill,
                        and create lasting memories this 14th of August!
                    </p>

                    <div className="cta-actions">
                        {event.registrationStatus === "Open" ? (
                            <NavLink
                                to={`/events/special/register/${event._id}`}
                                className="btn-hero-primary"
                            >
                                Register Now
                            </NavLink>
                        ) : (
                            <button
                                className="btn-hero-primary"
                                disabled
                            >
                                Registration Closed
                            </button>
                        )}
                        <Link to="/events/special" className="btn-outline">
                            View All Events
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
};

export default SpecialDesc;