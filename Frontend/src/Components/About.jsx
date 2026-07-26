
import React from 'react';
import {
  FaRunning,
  FaHeartbeat,
  FaUsers,
  FaMedal,
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaHandsHelping,
  FaSmile,
} from "react-icons/fa";

const About = () => {
  const benefits = [
    {
      icon: <FaRunning />,
      title: "Train Together",
      text: "Run with passionate runners and stay motivated every step of the way.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Improve Your Health",
      text: "Build endurance, improve fitness, and enjoy a healthier lifestyle.",
    },
    {
      icon: <FaUsers />,
      title: "Friendly Community",
      text: "Meet people who share your passion for running and fitness.",
    },
    {
      icon: <FaMedal />,
      title: "Exciting Events",
      text: "Participate in races, marathons, and fun community runs.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Scenic Routes",
      text: "Explore beautiful running routes throughout Gojra.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Regular Activities",
      text: "Weekly group runs and special seasonal events.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Supportive Environment",
      text: "Encouragement from beginners to experienced runners.",
    },
    {
      icon: <FaSmile />,
      title: "Enjoy Every Run",
      text: "Because running is more fun when you do it together.",
    },
  ];

  return (
    <div className="grc-about-container">
      {/* Self-contained CSS */}
      <style>{`
        :root {
          --twilight-indigo: #1B2F51;
          --pacific-blue: #2BC4DA;
          --razzmatazz: #ED2974;
          --white: #FFFFFF;
          --bg-aliceblue: #F0F8FF;
          --text-muted: #5B6E8A;
          --card-bg: rgba(255, 255, 255, 0.85);
          --shadow-sm: 0 10px 30px -10px rgba(27, 47, 81, 0.08);
          --shadow-hover: 0 20px 40px -10px rgba(27, 47, 81, 0.16);
        }

        .grc-about-container {
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

        /* Header Styling */
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
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 0.4rem 1.1rem;
          border-radius: 50px;
          margin-bottom: 1.25rem;
          box-shadow: 0 4px 14px rgba(237, 41, 116, 0.25);
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

        /* Benefits Grid Section */
        .grc-benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 1.75rem;
          width: 100%;
          max-width: 1200px;
        }

        /* Benefit Card Styling */
        .grc-benefit-card {
          background: var(--card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .grc-benefit-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--pacific-blue), var(--razzmatazz));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .grc-benefit-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--shadow-hover);
        }

        .grc-benefit-card:hover::before {
          opacity: 1;
        }

        /* Icon Badge */
        .grc-icon-badge {
          width: 52px;
          height: 52px;
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(43, 196, 218, 0.15), rgba(237, 41, 116, 0.1));
          color: var(--razzmatazz);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-bottom: 1.25rem;
          transition: transform 0.3s ease, background 0.3s ease, color 0.3s ease;
        }

        .grc-benefit-card:hover .grc-icon-badge {
          transform: scale(1.08) rotate(-4deg);
          background: linear-gradient(135deg, var(--razzmatazz), var(--pacific-blue));
          color: var(--white);
          box-shadow: 0 6px 16px rgba(237, 41, 116, 0.3);
        }

        .grc-card-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--twilight-indigo);
          margin: 0 0 0.6rem 0;
          line-height: 1.3;
        }

        .grc-card-text {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.55;
          margin: 0;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .grc-about-container {
            padding: 3rem 1.25rem;
          }
          .grc-title {
            font-size: 2.1rem;
          }
          .grc-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>

      {/* Header Section */}
      <header className="grc-header">
        <h1 className="grc-title">Why Run With Us?</h1>
        <p className="grc-subtitle">
          Join Gojra Running Club and become part of a community that inspires healthier lifestyles, stronger friendships, and unforgettable experiences.
        </p>
      </header>

      {/* Benefits Grid */}
      <section className="grc-benefits-grid">
        {benefits.map((item, index) => (
          <article className="grc-benefit-card" key={index}>
            <div className="grc-icon-badge">{item.icon}</div>
            <h2 className="grc-card-title">{item.title}</h2>
            <p className="grc-card-text">{item.text}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default About;