import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import FAQ from '../FAQspecial';
import { FaCalendarAlt, FaStar, FaRunning, FaFire } from 'react-icons/fa';

// Color Palette Constants
const COLORS = {
  bg: '#F0F8FF',          // Aliceblue Base
  indigo: '#1B2F51',      // Twilight Indigo (Primary Text & Heavy Accents)
  pacific: '#2BC4DA',     // Pacific Blue (Vibrant Accent)
  razzmatazz: '#ED2974',  // Razzmatazz (High Energy Accent)
  white: '#FFFFFF',
  cardBg: '#FFFFFF',
  subtext: '#5B6E8C',
  border: 'rgba(27, 47, 81, 0.08)',
};

const EventsCom = () => {
  const location = useLocation();
  // Check active tab based on current path
  const isSpecialActive = location.pathname.includes('special');

  return (
    <div style={styles.pageWrapper}>
      {/* Decorative Background Glow Orbs */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      <main style={styles.mainContainer}>
        {/* Hero Header Section */}
        <header style={styles.heroSection}>
          
          <h1 style={styles.heroTitle}>CLUB EVENTS</h1>
          <p style={styles.heroSubtitle}>
            Join our weekly training sessions, race days, city marathons, and flagship community runs. 
            Find your pace and hit the track with us!
          </p>

          {/* Gen-Z Styled Navigation Pill Bar */}
          <div style={styles.tabContainer}>
            <NavLink
              to="regular"
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...(isActive || (!isSpecialActive && styles.activeTabDefault)
                  ? styles.activeTabRegular
                  : styles.inactiveTab),
              })}
            >
              <FaRunning style={styles.tabIcon} />
              <span>Weekly Events</span>
            </NavLink>

            <NavLink
              to="special"
              style={({ isActive }) => ({
                ...styles.tabLink,
                ...(isActive ? styles.activeTabSpecial : styles.inactiveTab),
              })}
            >
              <FaStar style={styles.tabIcon} />
              <span>Annual Events</span>
            </NavLink>
          </div>
        </header>

        {/* Dynamic Nested Route Output */}
        <section style={styles.outletWrapper}>
          <Outlet />
        </section>

        {/* FAQ Section */}
        <section style={styles.faqSection}>
          <FAQ />
        </section>
      </main>
    </div>
  );
};

// Stylesheet
const styles = {
  pageWrapper: {
    backgroundColor: COLORS.bg,
    color: COLORS.indigo,
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    paddingBottom: '60px',
  },
  bgOrb1: {
    position: 'absolute',
    top: '-5%',
    right: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.pacific}25 0%, rgba(240,248,255,0) 70%)`,
    pointerEvents: 'none',
  },
  bgOrb2: {
    position: 'absolute',
    bottom: '20%',
    left: '-5%',
    width: '550px',
    height: '550px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${COLORS.razzmatazz}18 0%, rgba(240,248,255,0) 70%)`,
    pointerEvents: 'none',
  },
  mainContainer: {
    maxWidth: '1180px',
    margin: '0 auto',
    padding: '40px 24px',
    position: 'relative',
    zIndex: 1,
  },
  heroSection: {
    textAlign: 'center',
    marginBottom: '40px',
  },
  heroBadge: {
    backgroundColor: `${COLORS.pacific}20`,
    color: COLORS.indigo,
    padding: '6px 16px',
    borderRadius: '20px',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '1.5px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
  },
  heroTitle: {
    fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
    fontWeight: '900',
    letterSpacing: '-1.5px',
    margin: '0 0 12px 0',
    color: COLORS.indigo,
  },
  heroSubtitle: {
    color: COLORS.subtext,
    fontSize: '16px',
    maxWidth: '680px',
    margin: '0 auto 32px auto',
    lineHeight: '1.6',
    fontWeight: '500',
  },
  tabContainer: {
    display: 'inline-flex',
    backgroundColor: COLORS.white,
    padding: '6px',
    borderRadius: '30px',
    boxShadow: '0 10px 30px rgba(27, 47, 81, 0.06)',
    border: `1px solid ${COLORS.border}`,
    gap: '8px',
    maxWidth: '100%',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tabLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '24px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '700',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
    color: COLORS.subtext,
  },
  activeTabDefault: {
    backgroundColor: COLORS.indigo,
    color: COLORS.white,
    boxShadow: `0 8px 20px -5px ${COLORS.indigo}50`,
  },
  activeTabRegular: {
    backgroundColor: COLORS.indigo,
    color: COLORS.white,
    boxShadow: `0 8px 20px -5px ${COLORS.indigo}50`,
  },
  activeTabSpecial: {
    backgroundColor: COLORS.razzmatazz,
    color: COLORS.white,
    boxShadow: `0 8px 20px -5px ${COLORS.razzmatazz}60`,
  },
  tabIcon: {
    fontSize: '15px',
  },
  outletWrapper: {
    marginBottom: '60px',
  },
  faqSection: {
    marginTop: '40px',
  },
};

export default EventsCom;