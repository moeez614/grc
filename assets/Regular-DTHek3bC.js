import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{f as t,r as n}from"./index-BLB1U2dP.js";import{t as r}from"./axios-DTHlHFwR.js";var i=e(t(),1),a=n(),o=()=>{let[e,t]=(0,i.useState)([]),[n,o]=(0,i.useState)(!0);return(0,i.useEffect)(()=>{(async()=>{try{let e=await r.get(`/weekly-events`);t(e.data)}catch(e){console.error(e)}finally{o(!1)}})()},[]),(0,a.jsxs)(`div`,{className:`grc-page-container`,children:[(0,a.jsx)(`style`,{children:`
        :root {
          --twilight-indigo: #1B2F51;
          --pacific-blue: #2BC4DA;
          --razzmatazz: #ED2974;
          --white: #FFFFFF;
          --bg-aliceblue: #F0F8FF;
          --text-muted: #5B6E8A;
          --card-bg: rgba(255, 255, 255, 0.85);
          --shadow-sm: 0 10px 30px -10px rgba(27, 47, 81, 0.08);
          --shadow-hover: 0 20px 40px -10px rgba(27, 47, 81, 0.18);
        }

        .grc-page-container {
          background-color: var(--bg-aliceblue);
          min-height: 100vh;
          padding: 3.5rem 1.5rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          color: var(--twilight-indigo);
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
        }

        .grc-header {
          text-align: center;
          max-width: 680px;
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
          margin-bottom: 1rem;
          box-shadow: 0 4px 14px rgba(237, 41, 116, 0.25);
        }

        .grc-title {
          font-size: 2.75rem;
          font-weight: 900;
          letter-spacing: -0.03em;
          margin: 0 0 0.8rem 0;
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

        .grc-events-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1240px;
        }

        .grc-event-card {
          background: var(--card-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .grc-event-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        /* Banner Styling */
        .grc-banner {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
          background: #1B2F51;
        }

        .grc-banner-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .grc-event-card:hover .grc-banner-img {
          transform: scale(1.05);
        }

        /* Fallback Banner */
        .grc-banner-fallback {
          width: 100%;
          height: 180px;
          background: linear-gradient(135deg, var(--twilight-indigo) 0%, #101E36 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .grc-banner-fallback::after {
          content: '';
          position: absolute;
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(43, 196, 218, 0.3) 0%, transparent 70%);
          top: -30px;
          right: -30px;
          border-radius: 50%;
        }

        .grc-fallback-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--pacific-blue);
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
          z-index: 1;
        }

        /* Content Wrapper */
        .grc-card-content {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .grc-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }

        .grc-event-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--twilight-indigo);
          margin: 0;
          line-height: 1.3;
        }

        /* Dynamic Status Badges */
        .grc-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          font-weight: 800;
          padding: 0.35rem 0.85rem;
          border-radius: 50px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .grc-status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
        }

        .grc-status-active {
          background-color: rgba(237, 41, 116, 0.12);
          color: var(--razzmatazz);
        }
        .grc-status-active .grc-status-dot {
          background-color: var(--razzmatazz);
          box-shadow: 0 0 8px var(--razzmatazz);
        }

        .grc-status-upcoming {
          background-color: rgba(43, 196, 218, 0.14);
          color: #0b7f90;
        }
        .grc-status-upcoming .grc-status-dot {
          background-color: var(--pacific-blue);
        }

        .grc-status-completed {
          background-color: rgba(27, 47, 81, 0.08);
          color: var(--text-muted);
        }
        .grc-status-completed .grc-status-dot {
          background-color: var(--text-muted);
        }

        /* Event Details */
        .grc-details-list {
          list-style: none;
          padding: 0;
          margin: 0 0 1.25rem 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .grc-details-list li {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-size: 0.92rem;
          color: var(--twilight-indigo);
          font-weight: 500;
        }

        .grc-icon-wrapper {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: rgba(43, 196, 218, 0.12);
          color: var(--pacific-blue);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          font-size: 0.9rem;
        }

        .grc-description {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
          padding-top: 1rem;
          border-top: 1px dashed rgba(27, 47, 81, 0.12);
          flex-grow: 1;
        }

        /* Open Attendance Callout UX */
        .grc-join-callout {
          background: linear-gradient(135deg, rgba(27, 47, 81, 0.04), rgba(43, 196, 218, 0.08));
          border: 1px solid rgba(43, 196, 218, 0.2);
          border-radius: 14px;
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: auto;
        }

        .grc-join-icon {
          color: var(--razzmatazz);
          font-size: 1.1rem;
        }

        .grc-join-text {
          font-size: 0.83rem;
          font-weight: 700;
          color: var(--twilight-indigo);
          line-height: 1.3;
        }

        .grc-join-text span {
          display: block;
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--text-muted);
        }

        .grc-completed-callout {
          background: rgba(27, 47, 81, 0.05);
          border-color: rgba(27, 47, 81, 0.1);
        }

        .grc-loading-state {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
          font-weight: 700;
          color: var(--pacific-blue);
        }

        @media (max-width: 640px) {
          .grc-page-container {
            padding: 2.5rem 1rem;
          }
          .grc-title {
            font-size: 2.1rem;
          }
        }
      `}),(0,a.jsxs)(`header`,{className:`grc-header`,children:[(0,a.jsx)(`h1`,{className:`grc-title`,children:`Weekly Run Lineup`}),(0,a.jsx)(`p`,{className:`grc-subtitle`,children:`No tickets required. Pick a session, lace up your shoes, and meet us at the location!`})]}),n?(0,a.jsx)(`div`,{className:`grc-loading-state`,children:`Loading runs...`}):(0,a.jsx)(`section`,{className:`grc-events-grid`,children:e.map(e=>{let t=(e.status||`upcoming`).toLowerCase(),n=t===`completed`;return(0,a.jsxs)(`article`,{className:`grc-event-card`,children:[e.banner?(0,a.jsx)(`div`,{className:`grc-banner`,children:(0,a.jsx)(`img`,{src:`http://localhost:5000/uploads/${e.banner}`,alt:e.name,className:`grc-banner-img`})}):(0,a.jsx)(`div`,{className:`grc-banner-fallback`,children:(0,a.jsxs)(`div`,{className:`grc-fallback-badge`,children:[(0,a.jsx)(`i`,{className:`fa-solid fa-person-running`}),(0,a.jsxs)(`span`,{children:[e.distance,` KM`]})]})}),(0,a.jsxs)(`div`,{className:`grc-card-content`,children:[(0,a.jsxs)(`div`,{className:`grc-card-header`,children:[(0,a.jsx)(`h2`,{className:`grc-event-title`,children:e.name}),(0,a.jsxs)(`span`,{className:`grc-status-pill grc-status-${t}`,children:[(0,a.jsx)(`span`,{className:`grc-status-dot`}),e.status]})]}),(0,a.jsxs)(`ul`,{className:`grc-details-list`,children:[(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`div`,{className:`grc-icon-wrapper`,children:(0,a.jsx)(`i`,{className:`fa-solid fa-calendar-day`})}),(0,a.jsx)(`span`,{children:new Date(e.date).toLocaleDateString(`en-GB`,{day:`numeric`,month:`short`,year:`numeric`})})]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`div`,{className:`grc-icon-wrapper`,children:(0,a.jsx)(`i`,{className:`fa-solid fa-clock`})}),(0,a.jsx)(`span`,{children:e.time})]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`div`,{className:`grc-icon-wrapper`,children:(0,a.jsx)(`i`,{className:`fa-solid fa-location-dot`})}),(0,a.jsx)(`span`,{children:e.location})]}),(0,a.jsxs)(`li`,{children:[(0,a.jsx)(`div`,{className:`grc-icon-wrapper`,children:(0,a.jsx)(`i`,{className:`fa-solid fa-route`})}),(0,a.jsxs)(`span`,{children:[`Distance: `,(0,a.jsxs)(`strong`,{children:[e.distance,` KM`]})]})]})]}),(0,a.jsx)(`p`,{className:`grc-description`,children:e.description}),(0,a.jsxs)(`div`,{className:`grc-join-callout ${n?`grc-completed-callout`:``}`,children:[(0,a.jsx)(`i`,{className:`fa-solid ${n?`fa-flag-checkered`:`fa-bolt`} grc-join-icon`}),(0,a.jsx)(`div`,{className:`grc-join-text`,children:n?(0,a.jsxs)(a.Fragment,{children:[`Session Completed`,(0,a.jsx)(`span`,{children:`Check back next week for the next drop!`})]}):(0,a.jsxs)(a.Fragment,{children:[`Open to Everyone`,(0,a.jsx)(`span`,{children:`No registration needed — just arrive at location!`})]})})]})]})]},e._id)})})]})};export{o as default};