
import React, { useState } from "react";
import {
  FaUserShield,
  FaLock,
  FaCookieBite,
  FaDatabase,
  FaCamera,
  FaUserCheck,
  FaShieldAlt,
  FaSearch,
  FaChild,
  FaHistory,
} from "react-icons/fa";
import Navbar from "./Navbar";

// Color Palette Constants
const COLORS = {
  bg: "#F0F8FF",          // Aliceblue Base
  indigo: "#1B2F51",      // Twilight Indigo (Primary Text & Heavy Accents)
  pacific: "#2BC4DA",     // Pacific Blue (Vibrant Accent)
  razzmatazz: "#ED2974",  // Razzmatazz (High Energy Accent)
  white: "#FFFFFF",
  cardBg: "#FFFFFF",
  subtext: "#5B6E8C",
  border: "rgba(27, 47, 81, 0.08)",
};

const POLICY_SECTIONS = [
  {
    id: "info-collect",
    icon: <FaDatabase />,
    title: "1. Information We Collect",
    content: (
      <ul>
        <li>Full Name & Age/Gender</li>
        <li>Email Address & Phone Number</li>
        <li>Emergency Contact Information</li>
        <li>Race Category Preferences</li>
        <li>Payment Proof (Screenshots)</li>
        <li>Profile Photo (Optional upload)</li>
        <li>IP Address & Technical Browser Info</li>
      </ul>
    ),
  },
  {
    id: "how-we-use",
    icon: <FaUserCheck />,
    title: "2. How We Use Your Data",
    content: (
      <ul>
        <li>Register participants seamlessly for events.</li>
        <li>Verify payments and issue official participant IDs.</li>
        <li>Generate performance certificates and leaderboard stats.</li>
        <li>Send critical event announcements & schedule updates.</li>
        <li>Respond directly to runner support requests.</li>
      </ul>
    ),
  },
  {
    id: "payment-info",
    icon: <FaLock />,
    title: "3. Payment Information",
    content: (
      <p>
        Gojra Running Club <strong>does not store</strong> your bank details or
        credit card credentials. We only collect payment verification screenshots
        to confirm event fees safely and manually.
      </p>
    ),
  },
  {
    id: "cookies",
    icon: <FaCookieBite />,
    title: "4. Cookies & Trackers",
    content: (
      <p>
        We use essential cookies to personalize your session, remember login
        states, analyze site speed, and keep our platform secure while you navigate.
      </p>
    ),
  },
  {
    id: "third-party",
    icon: <FaShieldAlt />,
    title: "5. Third-Party Integrations",
    content: (
      <p>
        We leverage trusted external tools like Google Maps, cloud database providers,
        and email APIs. These platforms maintain their own strict privacy protocols.
      </p>
    ),
  },
  {
    id: "data-security",
    icon: <FaUserShield />,
    title: "6. Data Security Protocol",
    content: (
      <p>
        Your data is protected behind multi-layer technical and organizational
        safeguards to prevent unauthorized access, alteration, or leaks.
      </p>
    ),
  },
  {
    id: "your-rights",
    icon: <FaUserCheck />,
    title: "7. Your Rights as a Runner",
    content: (
      <ul>
        <li>Request full access to your stored personal data.</li>
        <li>Request instant corrections to inaccurate records.</li>
        <li>Request complete deletion of your account/data.</li>
        <li>Opt-out of non-essential emails anytime.</li>
      </ul>
    ),
  },
  {
    id: "media",
    icon: <FaCamera />,
    title: "8. Event Photography & Media",
    content: (
      <p>
        Photos and video footage captured during club runs/marathons may be featured
        on our website and social channels to hype the community unless you inform us otherwise.
      </p>
    ),
  },
  {
    id: "data-retention",
    icon: <FaHistory />,
    title: "9. Data Retention",
    content: (
      <p>
        We hold onto runner records only as long as required for event tracking,
        legal verification, and continuous race history stats.
      </p>
    ),
  },
  {
    id: "children",
    icon: <FaChild />,
    title: "10. Youth Privacy",
    content: (
      <p>
        Participants under 18 must have parent or legal guardian consent to join.
        We do not knowingly collect information from minors without permission.
      </p>
    ),
  },
  {
    id: "policy-changes",
    icon: <FaShieldAlt />,
    title: "11. Policy Updates",
    content: (
      <p>
        This privacy policy may evolve over time as our crew grows. Any changes
        will be updated directly on this page with an active date stamp.
      </p>
    ),
  },
];

const PrivacyPolicy = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(POLICY_SECTIONS[0].id);

  // Filter sections based on user search
  const filteredSections = POLICY_SECTIONS.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      {/* Decorative Background Orbs */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      <main style={styles.mainContainer}>
        {/* Hero Section */}
        <header style={styles.heroSection}>
          <h1 style={styles.heroTitle}>PRIVACY POLICY</h1>
          <p style={styles.heroSubtitle}>
            Your privacy matters as much as your personal records. Here is how we
            collect, protect, and respect your data at Gojra Running Club.
          </p>
        </header>

        {/* Quick Search & Filter Bar */}
        <div style={styles.searchBarWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search privacy topics (e.g., 'Cookies', 'Payment')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Content Layout Grid */}
        <div style={styles.layoutGrid}>
          {/* Quick Nav Side Panel */}
          <aside style={styles.sideNav}>
            <h4 style={styles.sideNavTitle}>QUICK NAVIGATION</h4>
            <div style={styles.navList}>
              {POLICY_SECTIONS.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => {
                    setActiveTab(sec.id);
                    document
                      .getElementById(sec.id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    ...styles.navItem,
                    ...(activeTab === sec.id ? styles.activeNavItem : {}),
                  }}
                >
                  <span style={styles.navIcon}>{sec.icon}</span>
                  <span style={styles.navText}>{sec.title}</span>
                </button>
              ))}
            </div>
          </aside>

          {/* Cards Content Area */}
          <div style={styles.cardsColumn}>
            {filteredSections.map((section) => (
              <PolicyCard key={section.id} section={section} />
            ))}

            {filteredSections.length === 0 && (
              <div style={styles.noResults}>
                No policy items found matching "{searchTerm}".
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Interactive Policy Card Sub-Component
const PolicyCard = ({ section }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      id={section.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.card,
        transform: hovered ? "translateY(-6px)" : "none",
        boxShadow: hovered
          ? `0 20px 35px -10px ${COLORS.pacific}35`
          : "0 10px 25px -5px rgba(27, 47, 81, 0.05)",
        borderColor: hovered ? COLORS.pacific : COLORS.border,
      }}
    >
      <div style={styles.cardHeader}>
        <div style={styles.cardIconWrapper}>{section.icon}</div>
        <h2 style={styles.cardTitle}>{section.title}</h2>
      </div>
      <div style={styles.cardBody}>{section.content}</div>
    </section>
  );
};

// Inline Stylesheet
const styles = {
  pageWrapper: {
    backgroundColor: COLORS.bg,
    color: COLORS.indigo,
    minHeight: "100vh",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "80px",
  },
  bgOrb1: {
    position: "absolute",
    top: "-5%",
    right: "-5%",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${COLORS.pacific}25 0%, rgba(240,248,255,0) 70%)`,
    pointerEvents: "none",
  },
  bgOrb2: {
    position: "absolute",
    bottom: "10%",
    left: "-5%",
    width: "550px",
    height: "550px",
    borderRadius: "50%",
    background: `radial-gradient(circle, ${COLORS.razzmatazz}18 0%, rgba(240,248,255,0) 70%)`,
    pointerEvents: "none",
  },
  mainContainer: {
    maxWidth: "1180px",
    margin: "0 auto",
    padding: "40px 24px",
    position: "relative",
    zIndex: 1,
  },
  heroSection: {
    textAlign: "center",
    marginBottom: "40px",
  },
  heroBadge: {
    backgroundColor: `${COLORS.pacific}20`,
    color: COLORS.indigo,
    padding: "6px 16px",
    borderRadius: "20px",
    fontWeight: "800",
    fontSize: "12px",
    letterSpacing: "1.5px",
    display: "inline-block",
    marginBottom: "12px",
  },
  heroTitle: {
    fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
    fontWeight: "900",
    letterSpacing: "-1.5px",
    margin: "0 0 12px 0",
    color: COLORS.indigo,
  },
  heroSubtitle: {
    color: COLORS.subtext,
    fontSize: "16px",
    maxWidth: "680px",
    margin: "0 auto",
    lineHeight: "1.6",
    fontWeight: "500",
  },
  searchBarWrapper: {
    position: "relative",
    maxWidth: "600px",
    margin: "0 auto 40px auto",
  },
  searchIcon: {
    position: "absolute",
    left: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    color: COLORS.subtext,
    fontSize: "16px",
  },
  searchInput: {
    width: "100%",
    padding: "16px 20px 16px 50px",
    borderRadius: "30px",
    border: `2px solid transparent`,
    backgroundColor: COLORS.white,
    color: COLORS.indigo,
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 8px 25px rgba(27, 47, 81, 0.06)",
    outline: "none",
    boxSizing: "border-box",
  },
  layoutGrid: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "32px",
    alignItems: "start",
  },
  sideNav: {
    backgroundColor: COLORS.white,
    borderRadius: "24px",
    padding: "24px 16px",
    boxShadow: "0 10px 30px rgba(27, 47, 81, 0.04)",
    position: "sticky",
    top: "20px",
  },
  sideNavTitle: {
    fontSize: "11px",
    fontWeight: "800",
    color: COLORS.subtext,
    letterSpacing: "1.5px",
    margin: "0 0 16px 12px",
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    borderRadius: "14px",
    border: "none",
    backgroundColor: "transparent",
    color: COLORS.subtext,
    fontSize: "13px",
    fontWeight: "600",
    textAlign: "left",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  activeNavItem: {
    backgroundColor: COLORS.indigo,
    color: COLORS.white,
  },
  navIcon: {
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
  },
  navText: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  cardsColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: "24px",
    padding: "28px 32px",
    border: `1px solid ${COLORS.border}`,
    transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
    scrollMarginTop: "30px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  },
  cardIconWrapper: {
    width: "44px",
    height: "44px",
    borderRadius: "14px",
    backgroundColor: `${COLORS.pacific}20`,
    color: COLORS.indigo,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    flexShrink: 0,
  },
  cardTitle: {
    fontSize: "20px",
    fontWeight: "800",
    margin: 0,
    color: COLORS.indigo,
    letterSpacing: "-0.5px",
  },
  cardBody: {
    color: COLORS.subtext,
    fontSize: "15px",
    lineHeight: "1.7",
    fontWeight: "500",
  },
  noResults: {
    textAlign: "center",
    padding: "40px",
    color: COLORS.subtext,
    fontWeight: "600",
  },
};

export default PrivacyPolicy;