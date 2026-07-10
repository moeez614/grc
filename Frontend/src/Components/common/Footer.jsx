import React from 'react'
import logo from "../../assets/grc-logo.webp";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

import { SiStrava } from "react-icons/si";
import { Link , NavLink} from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-top">

        {/* Club Info */}
        <div className="footer-section">
          <img src={logo} alt="GRC" className="footer-logo" loading='lazy' />

          <h2>Gojra Running Club</h2>

          <p>
            Discipline Beats Motivation
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/events/regular">Events</Link></li>
            <li><Link to="/membership">Membership</Link></li>
            <li><Link to="/results">Results</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact</h3>

          <p>📞 +92 313 6543823</p>
          <p>✉️ gojrarunningclub@gmail.com</p>
          <p>📍 Gojra, Punjab, Pakistan</p>
        </div>
      </div>

      {/* Social */}
      <div className="socials">
        <NavLink to='https://www.facebook.com/share/1Eaf5QhX6V/' target="_blank"><FaFacebookF /></NavLink>
        <NavLink to="https://www.instagram.com/gojrarunningclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank"><FaInstagram /></NavLink>
        <NavLink to='https://www.tiktok.com/@gojra.running.club?_r=1&_t=ZS-97o5RKhtRC8' target="_blank"><FaTiktok /></NavLink>
        <NavLink><FaWhatsapp /></NavLink>
        <NavLink><SiStrava /></NavLink>
      </div>

      {/* Legal */}
      <div className="legal">
        <NavLink to="/privacypolicy">Privacy Policy</NavLink>
        <NavLink to='/termsconditions'>Term & Conditions</NavLink>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <p>
          &copy; 2026 Gojra Running Club.
          All Rights Reserved.
        </p>

        <p>
          Designed & Developed by
          <NavLink to="https://moeez614.github.io/moeezian/" target="_blank"> Moeez Ali</NavLink>
        </p>
      </div>

    </footer>
  )
}

export default Footer
