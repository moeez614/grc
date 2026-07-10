import React from 'react'
import "../css/Policy.css";
import {
    FaUserShield,
    FaLock,
    FaCookieBite,
    FaDatabase,
    FaCamera,
    FaUserCheck,
    FaEnvelope,
    FaShieldAlt,
} from "react-icons/fa";
import Navbar from './Navbar';
const PrivacyPolicy = () => {
    return (
        <div>
            <Navbar />
            <div className="privacy aliceblue">

                <div className="privacyHero">
                    <h1>Privacy Policy</h1>
                    <p>
                        Gojra Running Club values your privacy. This Privacy Policy explains
                        how we collect, use, protect, and manage your personal information
                        when you use our website or participate in our running events.
                    </p>

                </div>

                <div className="policyContainer">

                    <section className="policyCard">
                        <FaDatabase className="icon-privacy" />
                        <h2>1. Information We Collect</h2>

                        <ul>
                            <li>Full Name</li>
                            <li>Email Address</li>
                            <li>Phone Number</li>
                            <li>Age & Gender</li>
                            <li>Emergency Contact Information</li>
                            <li>Race Category</li>
                            <li>Payment Proof (Screenshot)</li>
                            <li>Profile Photo (if uploaded)</li>
                            <li>IP Address & Browser Information</li>
                        </ul>
                    </section>

                    <section className="policyCard">
                        <FaUserCheck className="icon-privacy" />
                        <h2>2. How We Use Your Information</h2>

                        <ul>
                            <li>Register participants for events.</li>
                            <li>Verify payments.</li>
                            <li>Issue participant IDs and certificates.</li>
                            <li>Send event announcements.</li>
                            <li>Respond to support requests.</li>
                            <li>Improve website performance.</li>
                            <li>Maintain participant records.</li>
                        </ul>
                    </section>

                    <section className="policyCard">
                        <FaLock className="icon-privacy" />
                        <h2>3. Payment Information</h2>

                        <p>
                            Gojra Running Club does not store your bank account or payment
                            credentials. We only collect payment confirmation screenshots to
                            verify successful registration.
                        </p>
                    </section>

                    <section className="policyCard">
                        <FaCookieBite className="icon-privacy" />
                        <h2>4. Cookies</h2>

                        <p>
                            Our website may use cookies to improve user experience, remember
                            preferences, analyze website traffic, and enhance security.
                        </p>
                    </section>

                    <section className="policyCard">
                        <FaShieldAlt className="icon-privacy" />
                        <h2>5. Third-Party Services</h2>

                        <p>
                            We may use trusted third-party services such as Google Maps,
                            Email services, Analytics tools, or Cloud Hosting providers.
                            These services have their own privacy policies.
                        </p>
                    </section>

                    <section className="policyCard">
                        <FaUserShield className="icon-privacy" />
                        <h2>6. Data Security</h2>

                        <p>
                            We implement reasonable administrative and technical measures to
                            protect your personal information from unauthorized access,
                            alteration, disclosure, or destruction.
                        </p>
                    </section>

                    <section className="policyCard">
                        <FaUserCheck className="icon-privacy" />
                        <h2>7. Your Rights</h2>

                        <ul>
                            <li>Request access to your personal data.</li>
                            <li>Request corrections if information is incorrect.</li>
                            <li>Request deletion of your data where applicable.</li>
                            <li>Withdraw consent for future communications.</li>
                        </ul>
                    </section>

                    <section className="policyCard">
                        <FaCamera className="icon-privacy" />
                        <h2>8. Event Photography & Media</h2>

                        <p>
                            During club activities and events, photographs and videos may be
                            taken. These may be used on our website and social media pages for
                            promotional purposes unless otherwise requested.
                        </p>
                    </section>

                    <section className="policyCard">
                        <FaDatabase className="icon-privacy" />
                        <h2>9. Data Retention</h2>

                        <p>
                            We retain participant information only as long as necessary for
                            event management, legal obligations, record keeping, and club
                            administration.
                        </p>
                    </section>

                    <section className="policyCard">
                        <FaUserShield className="icon-privacy" />
                        <h2>10. Children's Privacy</h2>

                        <p>
                            Participants under the required age should register only with the
                            consent of a parent or legal guardian. We do not knowingly collect
                            information from children without appropriate permission.
                        </p>
                    </section>

                    <section className="policyCard">
                        <FaShieldAlt className="icon-privacy" />
                        <h2>11. Changes to This Policy</h2>

                        <p>
                            Gojra Running Club may update this Privacy Policy periodically.
                            Updated versions will be posted on this page with the latest update
                            date.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicy
