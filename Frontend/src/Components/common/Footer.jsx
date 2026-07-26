import React, { useState } from "react";
import logo from "../../assets/grc-logo.webp";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

import { SiStrava } from "react-icons/si";
import { Link, NavLink } from "react-router-dom";

// Theme Palette Constants
const COLORS = {
  indigo: "#1B2F51",     // Deep Base / Twilight Indigo
  pacific: "#2BC4DA",    // Neon Accent / Pacific Blue
  razzmatazz: "#ED2974", // Energetic Accent / Razzmatazz
  white: "#FFFFFF",      // Primary Text
  cardBg: "rgba(255, 255, 255, 0.04)",
  border: "rgba(255, 255, 255, 0.08)",
  textMuted: "#94A3B8",
};

const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Glow Orbs for Gen-Z Aesthetic Background */}
      <div style={styles.bgGlow1} />
      <div style={styles.bgGlow2} />

      <div style={styles.container}>
        {/* Main Footer Layout */}
        <div style={styles.footerMain}>
          {/* Brand Info */}
          <div style={styles.brandCol}>
            <div style={styles.logoWrapper}>
              <img src={logo} alt="Gojra Running Club" style={styles.logo} loading="lazy" />
              <div>
                <h2 style={styles.brandTitle}>GOJRA</h2>
                <span style={styles.brandSubtitle}>RUNNING CLUB</span>
              </div>
            </div>

            <p style={styles.motto}>
              <span style={{ color: COLORS.razzmatazz }}>Discipline</span> Beats Motivation.
            </p>
            <p style={styles.brandDescription}>
              Building Gojra’s premier athletic community. Run fast, train hard, set PRs.
            </p>

            {/* Social Icons Strip */}
            <div style={styles.socialsWrapper}>
              <SocialIcon href="https://www.facebook.com/share/1Eaf5QhX6V/" icon={<FaFacebookF />} label="Facebook" />
              <SocialIcon href="https://www.instagram.com/gojrarunningclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" icon={<FaInstagram />} label="Instagram" />
              <SocialIcon href="https://www.tiktok.com/@gojra.running.club?_r=1&_t=ZS-97o5RKhtRC8" icon={<FaTiktok />} label="TikTok" />
              <SocialIcon href="https://wa.me/" icon={<FaWhatsapp />} label="WhatsApp" />
              <SocialIcon href="https://www.strava.com/" icon={<SiStrava />} label="Strava" />
            </div>
          </div>

          {/* Navigation Links Column */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>EXPLORE</h4>
            <ul style={styles.linkList}>
              <li><FooterLink to="/">Home</FooterLink></li>
              <li><FooterLink to="/about">About Us</FooterLink></li>
              <li><FooterLink to="/events/regular">Events</FooterLink></li>
              <li><FooterLink to="/membership">Membership</FooterLink></li>
              <li><FooterLink to="/results">Results</FooterLink></li>
            </ul>
          </div>

          {/* Resources Column */}
          <div style={styles.linksCol}>
            <h4 style={styles.colTitle}>COMMUNITY</h4>
            <ul style={styles.linkList}>
              <li><FooterLink to="/gallery">Gallery</FooterLink></li>
              <li><FooterLink to="/contact">Contact Us</FooterLink></li>
              <li><FooterLink to="/faq">FAQs</FooterLink></li>
              <li><FooterLink to="/privacypolicy">Privacy Policy</FooterLink></li>
              <li><FooterLink to="/termsconditions">Terms & Conditions</FooterLink></li>
            </ul>
          </div>

          {/* Contact Details Card Column */}
          <div style={styles.contactCol}>
            <h4 style={styles.colTitle}>HEADQUARTERS</h4>
            <div style={styles.contactCard}>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📞</span>
                <div>
                  <div style={styles.contactLabel}>PHONE</div>
                  <a href="tel:+923136543823" style={styles.contactValue}>+92 313 6543823</a>
                </div>
              </div>
              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>✉️</span>
                <div>
                  <div style={styles.contactLabel}>EMAIL</div>
                  <a href="mailto:gojrarunningclub@gmail.com" style={styles.contactValue}>gojrarunningclub@gmail.com</a>
                </div>
              </div>

              <div style={styles.contactItem}>
                <span style={styles.contactIcon}>📍</span>
                <div>
                  <div style={styles.contactLabel}>LOCATION</div>
                  <span style={styles.contactValue}>Gojra, Punjab, Pakistan</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Credits */}
        <div style={styles.bottomBar}>
          <p style={styles.copyrightText}>
            &copy; 2026 <strong style={{ color: COLORS.white }}>Gojra Running Club</strong>. All rights reserved.
          </p>

          <div style={styles.developerText}>
            Developed by{" "}
            <a
              href="https://moeez614.github.io/moeezian/"
              target="_blank"
              rel="noreferrer"
              style={styles.devLink}
            >
              Moeez Ali
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Sub-component: Hoverable Footer Links
const FooterLink = ({ to, children }) => {
  const [hover, setHover] = useState(false);
  return (
    <Link
      to={to}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.footerLink,
        color: hover ? COLORS.pacific : COLORS.textMuted,
        transform: hover ? "translateX(4px)" : "none",
      }}
    >
      <span style={{ ...styles.linkArrow, opacity: hover ? 1 : 0 }}>›</span> {children}
    </Link>
  );
};

// Sub-component: Social Icons
const SocialIcon = ({ href, icon, label }) => {
  const [hover, setHover] = useState(false);
  return (
    <NavLink
      to={href}
      target="_blank"
      aria-label={label}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...styles.socialIconBtn,
        borderColor: hover ? COLORS.pacific : COLORS.border,
        backgroundColor: hover ? COLORS.pacific : "rgba(255, 255, 255, 0.05)",
        color: hover ? COLORS.indigo : COLORS.white,
        transform: hover ? "translateY(-4px)" : "none",
        boxShadow: hover ? `0 8px 18px ${COLORS.pacific}50` : "none",
      }}
    >
      {icon}
    </NavLink>
  );
};

// Inline CSS Stylesheet
const styles = {
  footer: {
    backgroundColor: COLORS.indigo,
    color: COLORS.white,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "relative",
    overflow: "hidden",
    paddingTop: "60px",
    paddingBottom: "30px",
    borderTop: `1px solid ${COLORS.border}`,
  },
  bgGlow1: {
    position: "absolute",
    top: "-10%",
    left: "-10%",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${COLORS.pacific}15 0%, rgba(0,0,0,0) 70%)`,
    pointerEvents: "none",
  },
  bgGlow2: {
    position: "absolute",
    bottom: "-10%",
    right: "-5%",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${COLORS.razzmatazz}15 0%, rgba(0,0,0,0) 70%)`,
    pointerEvents: "none",
  },
  container: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "0 24px",
    position: "relative",
    zIndex: 1,
  },
  footerMain: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "40px",
    marginBottom: "40px",
  },
  brandCol: {
    gridColumn: "span 1",
  },
  logoWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
  },
  logo: {
    width: "48px",
    height: "48px",
    objectFit: "contain",
  },
  brandTitle: {
    fontSize: "20px",
    fontWeight: "900",
    margin: 0,
    letterSpacing: "1px",
    lineHeight: "1",
  },
  brandSubtitle: {
    fontSize: "10px",
    fontWeight: "800",
    color: COLORS.pacific,
    letterSpacing: "2px",
  },
  motto: {
    fontSize: "15px",
    fontWeight: "800",
    margin: "0 0 10px 0",
    letterSpacing: "-0.3px",
  },
  brandDescription: {
    fontSize: "13px",
    color: COLORS.textMuted,
    lineHeight: "1.6",
    margin: "0 0 20px 0",
  },
  socialsWrapper: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  socialIconBtn: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "1px solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "15px",
    textDecoration: "none",
    transition: "all 0.3s ease",
  },
  linksCol: {
    display: "flex",
    flexDirection: "column",
  },
  colTitle: {
    fontSize: "13px",
    fontWeight: "800",
    color: COLORS.pacific,
    letterSpacing: "1.5px",
    marginBottom: "20px",
    marginTop: 0,
  },
  linkList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  footerLink: {
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    display: "inline-flex",
    alignItems: "center",
    transition: "all 0.2s ease",
  },
  linkArrow: {
    marginRight: "6px",
    color: COLORS.pacific,
    fontWeight: "bold",
    transition: "opacity 0.2s ease",
  },
  contactCol: {
    display: "flex",
    flexDirection: "column",
  },
  contactCard: {
    backgroundColor: COLORS.cardBg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  contactIcon: {
    fontSize: "16px",
  },
  contactLabel: {
    fontSize: "10px",
    fontWeight: "800",
    color: COLORS.textMuted,
    letterSpacing: "1px",
  },
  contactValue: {
    fontSize: "13px",
    fontWeight: "600",
    color: COLORS.white,
    textDecoration: "none",
    wordBreak: "break-all",
  },
  bottomBar: {
    borderTop: `1px solid ${COLORS.border}`,
    paddingTop: "24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "14px",
  },
  copyrightText: {
    fontSize: "13px",
    color: COLORS.textMuted,
    margin: 0,
  },
  developerText: {
    fontSize: "13px",
    color: COLORS.textMuted,
    margin: 0,
  },
  devLink: {
    color: COLORS.pacific,
    textDecoration: "none",
    fontWeight: "700",
  },
};

export default Footer;