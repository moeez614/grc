
import React, { useState } from "react";
import {
  FaFileContract,
  FaRunning,
  FaShieldAlt,
  FaHeartbeat,
  FaMoneyBillWave,
  FaCamera,
  FaUsers,
  FaBalanceScale,
  FaSearch,
  FaBan,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaGlobe,
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

const TERMS_SECTIONS = [
  {
    id: "acceptance",
    icon: <FaFileContract />,
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing this website, registering for an event, or participating in any
        Gojra Running Club (GRC) session, you acknowledge that you have read,
        understood, and agreed to be bound by these official Terms & Conditions.
      </p>
    ),
  },
  {
    id: "eligibility",
    icon: <FaRunning />,
    title: "2. Participant Eligibility",
    content: (
      <ul>
        <li>Runners must provide complete and truthful registration details.</li>
        <li>Participants under 18 require signed parent or legal guardian consent.</li>
        <li>All runners must abide by official course limits, marshals, and rules.</li>
      </ul>
    ),
  },
  {
    id: "registration-payment",
    icon: <FaMoneyBillWave />,
    title: "3. Registration & Payment",
    content: (
      <ul>
        <li>Event spots are confirmed only upon manual or automated payment verification.</li>
        <li>Runners must upload valid, unaltered payment receipts/proofs.</li>
        <li>Race entries cannot be transferred or resold without organizer clearance.</li>
        <li>Providing fraudulent information leads to instant registration cancellation.</li>
      </ul>
    ),
  },
  {
    id: "refund-policy",
    icon: <FaBan />,
    title: "4. Refund Policy",
    content: (
      <ul>
        <li>All registration fees are non-refundable once processed.</li>
        <li>Refunds/credits are evaluated strictly if GRC cancels an event outright.</li>
        <li>No refunds or roll-overs are granted for personal absence or weather delays.</li>
      </ul>
    ),
  },
  {
    id: "health-declaration",
    icon: <FaHeartbeat />,
    title: "5. Health Declaration",
    content: (
      <p>
        Runners certify that they are physically fit and adequately trained to complete
        registered distances. Consult a certified medical professional before taking on
        high-intensity running activities.
      </p>
    ),
  },
  {
    id: "safety-rules",
    icon: <FaShieldAlt />,
    title: "6. Safety Protocol & Conduct",
    content: (
      <ul>
        <li>Obey instructions given by race marshals, traffic police, and medical personnel.</li>
        <li>Stay within marked race courses and designated running paths.</li>
        <li>Avoid obstructing, endangering, or impeding other participants.</li>
        <li>Organizer decisions on safety and route deviations are final.</li>
      </ul>
    ),
  },
  {
    id: "media-rights",
    icon: <FaCamera />,
    title: "7. Media & Photography Consent",
    content: (
      <p>
        By participating, you grant Gojra Running Club explicit permission to capture
        photographs and videos of you during events for social media highlights,
        promotional material, and website galleries without monetary compensation.
      </p>
    ),
  },
  {
    id: "code-of-conduct",
    icon: <FaUsers />,
    title: "8. Code of Conduct",
    content: (
      <ul>
        <li>Maintain respect, inclusion, and good sportsmanship at all times.</li>
        <li>Zero tolerance for abusive language, harassment, or discrimination.</li>
        <li>Cheating, taking unauthorized course shortcuts, or pacing illegally causes DQ.</li>
      </ul>
    ),
  },
  {
    id: "liability-waiver",
    icon: <FaBalanceScale />,
    title: "9. Liability Waiver",
    content: (
      <p>
        Gojra Running Club, event sponsors, volunteers, and crew members carry no liability
        for injuries, medical emergencies, property losses, or accidents sustained before,
        during, or after an event.
      </p>
    ),
  },
  {
    id: "event-changes",
    icon: <FaExclamationTriangle />,
    title: "10. Event Schedule & Modifications",
    content: (
      <ul>
        <li>GRC reserves the right to alter routes, start times, or venue locations.</li>
        <li>Events may be postponed or reformatted in severe weather or security risks.</li>
      </ul>
    ),
  },
  {
    id: "privacy-policy",
    icon: <FaGlobe />,
    title: "11. Privacy Guarantee",
    content: (
      <p>
        Personal runner details are safely stored for race operations, leaderboards,
        and direct communications only. We do not monetize or sell participant data.
      </p>
    ),
  },
  {
    id: "intellectual-property",
    icon: <FaShieldAlt />,
    title: "12. Intellectual Property",
    content: (
      <p>
        The Gojra Running Club logo, race branding, digital media, and website assets
        remain the exclusive intellectual property of GRC and may not be copied without consent.
      </p>
    ),
  },
  {
    id: "contact-terms",
    icon: <FaQuestionCircle />,
    title: "13. Contact & Support",
    content: (
      <p>
        Have questions or concerns about our community guidelines or event rules? Reach
        out to our team via the official GRC Contact page.
      </p>
    ),
  },
];

const TermCondition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState(TERMS_SECTIONS[0].id);

  // Filter sections based on user search
  const filteredSections = TERMS_SECTIONS.filter(
    (sec) =>
      sec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sec.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.pageWrapper}>
      <Navbar />

      {/* Decorative Background Glow Orbs */}
      <div style={styles.bgOrb1} />
      <div style={styles.bgOrb2} />

      <main style={styles.mainContainer}>
        {/* Hero Section */}
        <header style={styles.heroSection}>
          <h1 style={styles.heroTitle}>TERMS & CONDITIONS</h1>
          <p style={styles.heroSubtitle}>
            Welcome to Gojra Running Club (GRC). By registering for an event,
            joining club runs, or using our platform, you agree to these ground rules.
          </p>
        </header>

        {/* Search Bar */}
        <div style={styles.searchBarWrapper}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search terms (e.g., 'Refund', 'Safety', 'Conduct')..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        {/* Content Layout Grid */}
        <div style={styles.layoutGrid}>
          {/* Quick Nav Side Panel */}
          <aside style={styles.sideNav}>
            <h4 style={styles.sideNavTitle}>TERMS INDEX</h4>
            <div style={styles.navList}>
              {TERMS_SECTIONS.map((sec) => (
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
              <TermCard key={section.id} section={section} />
            ))}

            {filteredSections.length === 0 && (
              <div style={styles.noResults}>
                No terms found matching "{searchTerm}".
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

// Interactive Term Card Sub-Component
const TermCard = ({ section }) => {
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
    border: "2px solid transparent",
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

export default TermCondition;