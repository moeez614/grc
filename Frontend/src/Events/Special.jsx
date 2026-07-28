
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import august from '../assets/august.webp';
import desktop from '../assets/final-desktop.webp';
import API from "../api/axios";

const calculateTimeLeft = (targetTime) => {
  const difference = targetTime - new Date().getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const Special = () => {
  const [events, setEvents] = useState([]);
  const [timeLeftList, setTimeLeftList] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await API.get("/annual-events");

      setEvents(data);

      setTimeLeftList(
        data.map((event) =>
          calculateTimeLeft(
            new Date(
              `${event.eventDate.split("T")[0]}T${event.raceStartTime}:00`
            ).getTime()
          )
        )
      );
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!events.length) return;

    const timer = setInterval(() => {
      setTimeLeftList(
        events.map((event) =>
          calculateTimeLeft(
            new Date(
              `${event.eventDate.split("T")[0]}T${event.raceStartTime}:00`
            ).getTime()
          )
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [events]);
  return (
    <div className="grc-special-page">
      {/* Embedded CSS Styles */}
      <style>{`
        :root {
          --twilight-indigo: #1B2F51;
          --pacific-blue: #2BC4DA;
          --razzmatazz: #ED2974;
          --white: #FFFFFF;
          --bg-aliceblue: #F0F8FF;
          --text-muted: #5B6E8A;
          --card-bg: rgba(255, 255, 255, 0.88);
          --shadow-sm: 0 12px 35px -10px rgba(27, 47, 81, 0.1);
          --shadow-hover: 0 25px 50px -12px rgba(27, 47, 81, 0.22);
        }

        .grc-special-page {
          background-color: var(--bg-aliceblue);
          min-height: 100vh;
          padding: 4rem 1.5rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: var(--twilight-indigo);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        /* Header Section */
        .grc-header {
          text-align: center;
          max-width: 720px;
          margin-bottom: 3.5rem;
        }

        .grc-tag {
          display: inline-block;
          background: linear-gradient(135deg, var(--razzmatazz), var(--pacific-blue));
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          padding: 0.45rem 1.25rem;
          border-radius: 50px;
          margin-bottom: 1.25rem;
          box-shadow: 0 4px 16px rgba(237, 41, 116, 0.3);
        }

        .grc-title {
          font-size: 2.75rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          margin: 0 0 1rem 0;
          color: var(--twilight-indigo);
          line-height: 1.15;
        }

        .grc-subtitle {
          color: var(--text-muted);
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0;
          font-weight: 500;
        }

        /* Grid Layout */
        .grc-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 2.25rem;
          width: 100%;
          max-width: 1180px;
        }

        /* Glassmorphism Card */
        .grc-event-card {
          background: var(--card-bg);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 28px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-sm);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .grc-event-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        /* Banner Container */
        .grc-banner-container {
          position: relative;
          width: 100%;
          height: 220px;
          overflow: hidden;
          background: var(--twilight-indigo);
        }

        .grc-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .grc-event-card:hover .grc-banner-img {
          transform: scale(1.06);
        }

        .grc-banner-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(27, 47, 81, 0.1) 0%, rgba(27, 47, 81, 0.6) 100%);
        }

        /* Floating Pills */
        .grc-category-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(27, 47, 81, 0.75);
          backdrop-filter: blur(8px);
          color: var(--white);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 2;
        }

        .grc-status-pill {
          position: absolute;
          top: 1rem;
          right: 1rem;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          color: var(--razzmatazz);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          z-index: 2;
        }

        .grc-pulse-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: var(--razzmatazz);
          box-shadow: 0 0 8px var(--razzmatazz);
          animation: pulse 1.8s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.8; }
        }

        /* Card Body Content */
        .grc-card-body {
          padding: 1.75rem 1.5rem 1.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .grc-event-heading {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--twilight-indigo);
          margin: 0 0 1.5rem 0;
          line-height: 1.25;
          letter-spacing: -0.01em;
        }

        /* Gen-Z Digital Countdown Ticker */
        .grc-ticker-box {
          background: linear-gradient(135deg, rgba(27, 47, 81, 0.04), rgba(43, 196, 218, 0.08));
          border: 1px solid rgba(43, 196, 218, 0.25);
          border-radius: 18px;
          padding: 1.1rem;
          margin-bottom: 1.75rem;
          text-align: center;
        }

        .grc-ticker-label {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
        }

        .grc-ticker-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.4rem;
        }

        .grc-time-block {
          background: var(--white);
          padding: 0.5rem 0.2rem;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(27, 47, 81, 0.06);
          border: 1px solid rgba(27, 47, 81, 0.05);
        }

        .grc-time-number {
          display: block;
          font-size: 1.25rem;
          font-weight: 900;
          color: var(--twilight-indigo);
          line-height: 1.1;
          font-variant-numeric: tabular-nums;
        }

        .grc-time-unit {
          font-size: 0.62rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--pacific-blue);
          letter-spacing: 0.5px;
        }

        /* Action Buttons Grid */
        .grc-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          margin-top: auto;
        }

        .grc-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          font-size: 0.88rem;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.25s ease;
          box-sizing: border-box;
          text-align: center;
        }

        .grc-btn-primary {
          background: linear-gradient(135deg, var(--razzmatazz), #d81b62);
          color: var(--white);
          box-shadow: 0 6px 18px rgba(237, 41, 116, 0.28);
          border: none;
        }

        .grc-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(237, 41, 116, 0.4);
          color: var(--white);
        }

        .grc-btn-secondary {
          background: var(--white);
          color: var(--twilight-indigo);
          border: 1.5px solid rgba(27, 47, 81, 0.15);
        }

        .grc-btn-secondary:hover {
          background: rgba(43, 196, 218, 0.08);
          border-color: var(--pacific-blue);
          color: var(--twilight-indigo);
          transform: translateY(-2px);
        }
          .grc-btn-closed {
  background: linear-gradient(135deg, #6B7280, #4B5563);
  color: #FFFFFF;
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 18px rgba(75, 85, 99, 0.25);
}

.grc-btn-closed:hover {
  transform: translateY(-2px);
  background: linear-gradient(135deg, #5B6472, #374151);
  color: #FFFFFF;
}

        @media (max-width: 640px) {
          .grc-special-page {
            padding: 3rem 1rem;
          }
          .grc-title {
            font-size: 2.1rem;
          }
          .grc-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Hero Header */}
      <header className="grc-header">
        <h1 className="grc-title">Special Events</h1>
        <p className="grc-subtitle">
          Experience world-class races, push your limits, and run alongside Gojra's premier running community.
        </p>
      </header>

      {/* Events Grid */}
      <section className="grc-events-grid">
        {events.map((event, idx) => {
          const time = timeLeftList[idx] || { days: 0, hours: 0, minutes: 0, seconds: 0 };

          return (
            <article key={event.id} className="grc-event-card">
              {/* Event Banner Container */}
              <div className="grc-banner-container">
                <span className="grc-category-badge">{event.eventType}</span>
                <span className="grc-status-pill">
                  <span className="grc-pulse-dot"></span>
                  {event.registrationStatus}
                </span>
                <img
                  src={
                    `${import.meta.env.VITE_API_URL}/uploads/annual-events/banners/${event.banner.split("/").pop()}`
                  }
                  alt={event.eventName}
                  className="grc-banner-img"
                  loading="lazy"
                />
                <div className="grc-banner-overlay" />
              </div>

              {/* Card Body */}
              <div className="grc-card-body">
                <h2 className="grc-event-heading">{event.eventName}</h2>

                {/* Live Digital Countdown */}
                <div className="grc-ticker-box">
                  <div className="grc-ticker-label">Race Starts In</div>
                  <div className="grc-ticker-grid">
                    <div className="grc-time-block">
                      <span className="grc-time-number">
                        {String(time.days).padStart(2, '0')}
                      </span>
                      <span className="grc-time-unit">Days</span>
                    </div>
                    <div className="grc-time-block">
                      <span className="grc-time-number">
                        {String(time.hours).padStart(2, '0')}
                      </span>
                      <span className="grc-time-unit">Hours</span>
                    </div>
                    <div className="grc-time-block">
                      <span className="grc-time-number">
                        {String(time.minutes).padStart(2, '0')}
                      </span>
                      <span className="grc-time-unit">Mins</span>
                    </div>
                    <div className="grc-time-block">
                      <span className="grc-time-number">
                        {String(time.seconds).padStart(2, '0')}
                      </span>
                      <span className="grc-time-unit">Secs</span>
                    </div>
                  </div>
                </div>

                {/* Call To Action Buttons */}
                <div className="grc-actions">
                  <NavLink
                    to={`/events/special/description/${event._id}`}
                    className={`grc-btn ${event.registrationStatus === "Open"
                      ? "grc-btn-primary"
                      : "grc-btn-closed"
                      }`}
                  >
                    {event.registrationStatus === "Open"
                      ? "Register Now"
                      : "Registration Closed"}
                  </NavLink>

                  <NavLink
                    to={event.resultsUrl}
                    className="grc-btn grc-btn-secondary"
                  >
                    View Results
                  </NavLink>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default Special;