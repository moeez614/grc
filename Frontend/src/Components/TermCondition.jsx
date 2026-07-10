import React from 'react'
import { FaFileContract, FaRunning, FaShieldAlt, FaHeartbeat, FaMoneyBillWave, FaCamera, FaUsers, FaBalanceScale } from "react-icons/fa";
import "../css/Policy.css";
import Navbar from './Navbar';
const TermCondition = () => {
  return (
    <div>
      <Navbar />
      <div className="terms-page aliceblue">

      <div className="terms-hero1">
        <h1>Terms & Conditions</h1>
        <p>
          Welcome to Gojra Running Club (GRC). By registering for any event,
          participating in club activities, or using our website, you agree to
          follow these Terms & Conditions.
        </p>
      </div>

      <div className="terms-container">

        <div className="term-card">
          <FaUsers className="term-icon" />
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing this website or participating in any Gojra Running
            Club event, you acknowledge that you have read, understood, and
            agreed to these Terms & Conditions.
          </p>
        </div>

        <div className="term-card">
          <FaRunning className="term-icon" />
          <h2>2. Eligibility</h2>
          <ul>
            <li>Participants must provide accurate registration information.</li>
            <li>Children under 18 should register with parent/guardian consent.</li>
            <li>Participants must comply with event rules and regulations.</li>
          </ul>
        </div>

        <div className="term-card">
          <FaMoneyBillWave className="term-icon" />
          <h2>3. Registration & Payment</h2>
          <ul>
            <li>Registration is confirmed only after payment verification.</li>
            <li>Provide valid payment proof during registration.</li>
            <li>Registration cannot be transferred without organizer approval.</li>
            <li>Incorrect information may result in cancellation.</li>
          </ul>
        </div>

        <div className="term-card">
          <FaMoneyBillWave className="term-icon" />
          <h2>4. Refund Policy</h2>
          <ul>
            <li>Registration fees are generally non-refundable.</li>
            <li>Refunds may be considered only if the event is cancelled by GRC.</li>
            <li>No refund for absence or personal reasons.</li>
          </ul>
        </div>

        <div className="term-card">
          <FaHeartbeat className="term-icon" />
          <h2>5. Health Declaration</h2>
          <p>
            Participants confirm they are medically fit to participate. If you
            have any medical condition, consult your doctor before joining the
            event.
          </p>
        </div>

        <div className="term-card">
          <FaShieldAlt className="term-icon" />
          <h2>6. Safety Rules</h2>
          <ul>
            <li>Follow instructions from race officials and volunteers.</li>
            <li>Use designated running routes only.</li>
            <li>Do not endanger other participants.</li>
            <li>Emergency decisions made by organizers are final.</li>
          </ul>
        </div>

        <div className="term-card">
          <FaCamera className="term-icon" />
          <h2>7. Photography & Media</h2>
          <p>
            By participating, you grant Gojra Running Club permission to use
            photographs and videos taken during events for promotional,
            educational, and social media purposes without additional
            compensation.
          </p>
        </div>

        <div className="term-card">
          <FaUsers className="term-icon" />
          <h2>8. Code of Conduct</h2>
          <ul>
            <li>Respect fellow runners, volunteers, and organizers.</li>
            <li>No abusive language or harassment.</li>
            <li>No cheating or unauthorized race shortcuts.</li>
            <li>Maintain sportsmanship at all times.</li>
          </ul>
        </div>

        <div className="term-card">
          <FaBalanceScale className="term-icon" />
          <h2>9. Liability Waiver</h2>
          <p>
            Gojra Running Club, sponsors, volunteers, and organizers shall not
            be held responsible for injuries, accidents, illness, property
            damage, or losses that occur before, during, or after participation,
            except where required by applicable law.
          </p>
        </div>

        <div className="term-card">
          <FaShieldAlt className="term-icon" />
          <h2>10. Event Changes</h2>
          <ul>
            <li>GRC may change routes, schedules, or event details.</li>
            <li>Events may be postponed or cancelled due to weather or safety concerns.</li>
            <li>Organizer decisions are final.</li>
          </ul>
        </div>

        <div className="term-card">
          <FaShieldAlt className="term-icon" />
          <h2>11. Privacy</h2>
          <p>
            Personal information collected during registration will only be used
            for event management, participant communication, and club-related
            activities. We do not sell participant information.
          </p>
        </div>

        <div className="term-card">
          <FaFileContract className="term-icon" />
          <h2>12. Intellectual Property</h2>
          <p>
            The Gojra Running Club name, logo, website content, and event
            materials are the property of GRC and may not be copied without
            written permission.
          </p>
        </div>

        <div className="term-card">
          <FaUsers className="term-icon" />
          <h2>13. Contact</h2>
          <p>
            If you have any questions regarding these Terms & Conditions,
            please contact Gojra Running Club through the official Contact page.
          </p>
        </div>

      </div>

    </div>
    </div>
  )
}

export default TermCondition
