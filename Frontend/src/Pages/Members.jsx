import Verified from '../assets/verified.png'
import Navbar from '../Components/Navbar'
import Footer from '../Components/common/Footer'
import { useEffect, useState } from "react";
import hollow from "../assets/hollow.webp"
import API from "../api/axios";

// Color Palette
const PALETTE = {
  bg: '#F0F8FF',         // Aliceblue Base
  indigo: '#1B2F51',     // Twilight Indigo (Primary Text & Bold Headers)
  pacific: '#2BC4DA',    // Pacific Blue (Vibrant Accent)
  razzmatazz: '#ED2974', // Razzmatazz (High-Energy Accent)
  white: '#FFFFFF',      // White (Cards & Inputs)
  subtext: '#5B6E8C'     // Muted Blue-Grey for secondary details
};


export default function GojraRunningClub() {
    // Sample Club Data
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const { data } = await API.get("/members");
      setMembers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  // Filter Logic
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(search.toLowerCase()) ||
      member.email.toLowerCase().includes(search.toLowerCase());

    const matchesRole =
      selectedRole === "All" || member.title === selectedRole;

    return matchesSearch && matchesRole;
  });

  // Statistics
  const totalKm = members.reduce(
    (acc, m) => acc + (m.runningStats?.totalDistance || 0),
    0
  );

  const totalEvents = members.reduce(
    (acc, m) => acc + (m.runningStats?.totalEvents || 0),
    0
  );

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        {/* Background Soft Glow Orbs */}
        <div style={styles.bgOrb1}></div>
        <div style={styles.bgOrb2}></div>

        <div style={styles.contentWrapper}>
          {/* Header */}
          <header style={styles.header}>
            <h1 style={styles.title}>GRC Family</h1>
            <p style={styles.subtitle}>
              Chasing miles, breaking PRs, and setting the pace in Gojra.
            </p>
          </header>

          {/* Club Metric Highlights */}
          <section style={styles.statsCard}>
            <div style={styles.statBox}>
              <span style={styles.statNumber}>{members.filter((m) => m.isActive).length}</span>
              <span style={styles.statLabel}>Active Runners</span>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.statBox}>
              <span style={{ ...styles.statNumber, color: PALETTE.razzmatazz }}>
                {totalKm} <small style={{ fontSize: '14px' }}>KM</small>
              </span>
              <span style={styles.statLabel}>Total Distance</span>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.statBox}>
              <span style={styles.statNumber}>{totalEvents}</span>
              <span style={styles.statLabel}>Events Done</span>
            </div>
          </section>

          {/* Controls: Search & Role Filters */}
          <div style={styles.controlsRow}>
            <input
              type="text"
              placeholder="Search runner or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />

            <div style={styles.filterGroup}>
              {["All", "Admin", "Member"].map(role => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  style={{
                    ...styles.filterBtn,
                    ...(selectedRole === role ? styles.filterBtnActive : {})
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Members Grid */}
          <div style={styles.grid}>
            {filteredMembers.map(member => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div style={styles.noResults}>
              No family members match your search standard.
            </div>
          )}
        </div>
      </div>

      <Footer />  
    </div>
  );
}

// Card Component
function MemberCard({ member }) {
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic styling based on role
  const getRoleStyle = (role) => {
    switch (role) {
      case 'Admin':
        return { background: PALETTE.razzmatazz, color: PALETTE.white };
      case 'Coach':
        return { background: PALETTE.indigo, color: PALETTE.white };
      default:
        return { background: 'rgba(43, 196, 218, 0.15)', color: PALETTE.indigo };
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.card,
        transform: isHovered ? 'translateY(-8px)' : 'none',
        boxShadow: isHovered
          ? `0 20px 30px -10px ${PALETTE.pacific}50`
          : '0 10px 25px -5px rgba(27, 47, 81, 0.05)',
      }}
    >
      <div style={styles.cardHeader}>
        <div style={styles.avatarGlowWrapper}>
          <img
  src={
    member.photo
      ? `${import.meta.env.VITE_API_URL}/${member.photo.replace(/\\/g, "/")}`
      : hollow
  }
  alt={member.name}
  style={styles.avatar}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = hollow;
  }}
/>
        </div>
        <span style={{ ...styles.roleBadge, ...getRoleStyle(member.title) }}>
          {member.title}
        </span>
      </div>

      <div style={styles.nameRow}>
        <h3 style={styles.memberName}>{member.name}</h3>

        {member.isActive && (
          <img
            src={Verified}
            alt="Verified"
            style={styles.verifiedIcon}
            title='verified'
          />
        )}
      </div>
      <p style={styles.memberEmail}>{member.memberId}</p>

      <div style={styles.statsContainer}>
        <div style={styles.miniStat}>
          <span style={styles.miniStatValue}>{member.runningStats?.totalEvents ?? 0}</span>
          <span style={styles.miniStatLabel}>EVENTS</span>
        </div>
        <div style={styles.miniStat}>
          <span style={{ ...styles.miniStatValue, color: PALETTE.razzmatazz }}>
            {member.runningStats?.totalDistance ?? 0} <small style={{ fontSize: '11px' }}>KM</small>
          </span>
          <span style={styles.miniStatLabel}>DISTANCE</span>
        </div>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: {
    backgroundColor: PALETTE.bg,
    color: PALETTE.indigo,
    minHeight: '100vh',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    position: 'relative',
    overflow: 'hidden',
    padding: '50px 20px',
    boxSizing: 'border-box',
  },
  bgOrb1: {
    position: 'absolute',
    top: '-5%',
    right: '-5%',
    width: '450px',
    height: '450px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${PALETTE.pacific}30 0%, rgba(240,248,255,0) 70%)`,
    pointerEvents: 'none',
  },
  bgOrb2: {
    position: 'absolute',
    bottom: '-5%',
    left: '-5%',
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${PALETTE.razzmatazz}20 0%, rgba(240,248,255,0) 70%)`,
    pointerEvents: 'none',
  },
  contentWrapper: {
    maxWidth: '1080px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: '36px',
  },
  badgeTag: {
    backgroundColor: `${PALETTE.pacific}25`,
    color: PALETTE.indigo,
    padding: '6px 16px',
    borderRadius: '20px',
    fontWeight: '800',
    fontSize: '12px',
    letterSpacing: '1.5px',
    display: 'inline-block',
    marginBottom: '12px',
  },
  title: {
    fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
    fontWeight: '900',
    letterSpacing: '-1.5px',
    margin: '0 0 8px 0',
    color: PALETTE.indigo,
  },
  nameRow: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    marginBottom: "4px",
  },

  verifiedIcon: {
    width: "20px",
    height: "20px",
    objectFit: "contain",
    paddingBottom: "4px",
  },
  subtitle: {
    color: PALETTE.subtext,
    fontSize: '16px',
    margin: 0,
    fontWeight: '500',
  },
  statsCard: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: PALETTE.white,
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 12px 30px -10px rgba(27, 47, 81, 0.08)',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: '1',
    minWidth: '130px',
  },
  statNumber: {
    fontSize: '28px',
    fontWeight: '900',
    color: PALETTE.indigo,
  },
  statLabel: {
    fontSize: '11px',
    color: PALETTE.subtext,
    marginTop: '4px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    fontWeight: '700',
  },
  divider: {
    width: '1px',
    height: '40px',
    backgroundColor: '#E2E8F0',
  },
  controlsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginBottom: '32px',
  },
  searchInput: {
    backgroundColor: PALETTE.white,
    border: '2px solid transparent',
    borderRadius: '30px',
    padding: '14px 22px',
    color: PALETTE.indigo,
    outline: 'none',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    maxWidth: '320px',
    boxShadow: '0 4px 15px rgba(27, 47, 81, 0.04)',
    transition: 'all 0.2s ease',
  },
  filterGroup: {
    display: 'flex',
    gap: '8px',
    overflowX: 'auto',
    paddingBottom: '4px',
  },
  filterBtn: {
    backgroundColor: PALETTE.white,
    border: 'none',
    color: PALETTE.subtext,
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '700',
    boxShadow: '0 4px 12px rgba(27, 47, 81, 0.04)',
    transition: 'all 0.2s ease',
  },
  filterBtnActive: {
    backgroundColor: PALETTE.indigo,
    color: PALETTE.white,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: PALETTE.white,
    borderRadius: '24px',
    padding: '24px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(255, 255, 255, 0.8)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '16px',
  },
  avatarGlowWrapper: {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    padding: '3px',
    background: `linear-gradient(135deg, ${PALETTE.pacific}, ${PALETTE.razzmatazz})`,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  roleBadge: {
    fontSize: '11px',
    fontWeight: '800',
    padding: '6px 12px',
    borderRadius: '20px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  memberName: {
    fontSize: '19px',
    fontWeight: '800',
    margin: '0 0 4px 0',
    color: PALETTE.indigo,
  },
  memberEmail: {
    fontSize: '13px',
    color: PALETTE.subtext,
    margin: '0 0 20px 0',
    wordBreak: 'break-all',
  },
  statsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginTop: 'auto',
    backgroundColor: PALETTE.bg,
    padding: '14px',
    borderRadius: '16px',
  },
  miniStat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  miniStatValue: {
    fontSize: '18px',
    fontWeight: '800',
    color: PALETTE.indigo,
  },
  miniStatLabel: {
    fontSize: '10px',
    color: PALETTE.subtext,
    marginTop: '2px',
    fontWeight: '700',
  },
  noResults: {
    textAlign: 'center',
    padding: '50px 0',
    color: PALETTE.subtext,
    fontSize: '15px',
    fontWeight: '600',
  }
};