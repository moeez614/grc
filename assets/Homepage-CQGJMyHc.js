import"./rolldown-runtime-QTnfLwEv.js";import{a as e,f as t,r as n}from"./index-BLB1U2dP.js";import{B as r,G as i,M as a,R as o,Y as s,a as c,k as l,st as u}from"./fa-BmxbZfmw.js";import{n as d,t as f}from"./Navbar-EPzl9pqr.js";import{t as p}from"./Footer-CsLB0qvE.js";import m from"./Special-Bsc1xdBq.js";import{t as h}from"./Mylogo-2k9rKZ6e.js";t();var g=n(),_=()=>(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(`section`,{className:`containers-stats`,style:{flexDirection:d({maxWidth:768})?`column`:`row`},children:[(0,g.jsxs)(`div`,{children:[(0,g.jsxs)(`h4`,{children:[(0,g.jsx)(`i`,{className:`fa-solid fa-people-group`}),`Members`]}),(0,g.jsx)(`h3`,{children:`50+`})]}),(0,g.jsxs)(`div`,{children:[(0,g.jsxs)(`h4`,{children:[(0,g.jsx)(`i`,{className:`fa-solid fa-person-running`}),`Event Organized`]}),(0,g.jsx)(`h3`,{children:`300+`})]}),(0,g.jsxs)(`div`,{children:[(0,g.jsxs)(`h4`,{children:[(0,g.jsx)(`i`,{className:`fa-solid fa-medal`}),`Race Finishes`]}),(0,g.jsx)(`h3`,{children:`5000+`})]}),(0,g.jsxs)(`div`,{children:[(0,g.jsxs)(`h4`,{children:[(0,g.jsx)(`i`,{class:`fa-solid fa-handshake`}),`Sponsors`]}),(0,g.jsx)(`h3`,{children:`15+`})]})]})}),v=()=>(0,g.jsxs)(`div`,{className:`grc-about-container`,children:[(0,g.jsx)(`style`,{children:`
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
      `}),(0,g.jsxs)(`header`,{className:`grc-header`,children:[(0,g.jsx)(`h1`,{className:`grc-title`,children:`Why Run With Us?`}),(0,g.jsx)(`p`,{className:`grc-subtitle`,children:`Join Gojra Running Club and become part of a community that inspires healthier lifestyles, stronger friendships, and unforgettable experiences.`})]}),(0,g.jsx)(`section`,{className:`grc-benefits-grid`,children:[{icon:(0,g.jsx)(i,{}),title:`Train Together`,text:`Run with passionate runners and stay motivated every step of the way.`},{icon:(0,g.jsx)(a,{}),title:`Improve Your Health`,text:`Build endurance, improve fitness, and enjoy a healthier lifestyle.`},{icon:(0,g.jsx)(u,{}),title:`Friendly Community`,text:`Meet people who share your passion for running and fitness.`},{icon:(0,g.jsx)(r,{}),title:`Exciting Events`,text:`Participate in races, marathons, and fun community runs.`},{icon:(0,g.jsx)(o,{}),title:`Scenic Routes`,text:`Explore beautiful running routes throughout Gojra.`},{icon:(0,g.jsx)(c,{}),title:`Regular Activities`,text:`Weekly group runs and special seasonal events.`},{icon:(0,g.jsx)(l,{}),title:`Supportive Environment`,text:`Encouragement from beginners to experienced runners.`},{icon:(0,g.jsx)(s,{}),title:`Enjoy Every Run`,text:`Because running is more fun when you do it together.`}].map((e,t)=>(0,g.jsxs)(`article`,{className:`grc-benefit-card`,children:[(0,g.jsx)(`div`,{className:`grc-icon-badge`,children:e.icon}),(0,g.jsx)(`h2`,{className:`grc-card-title`,children:e.title}),(0,g.jsx)(`p`,{className:`grc-card-text`,children:e.text})]},t))})]}),y=[{name:`Ali Raza`,role:`5K Finisher`,image:`https://i.pravatar.cc/150?img=12`,rating:`★★★★★`,text:`Joining Gojra Running Club completely changed my lifestyle. The supportive community motivates me every single week.`},{name:`Ayesha Khan`,role:`10K Runner`,image:`https://i.pravatar.cc/150?img=32`,rating:`★★★★★`,text:`Professional event management, friendly runners, and an amazing atmosphere. Every event feels memorable.`},{name:`Muhammad Usman`,role:`Club Member`,image:`https://i.pravatar.cc/150?img=18`,rating:`★★★★★`,text:`I started as a beginner and now regularly complete 10K runs. GRC helped me become healthier and more confident.`}],b=()=>(0,g.jsxs)(`div`,{className:`aliceblue`,children:[(0,g.jsxs)(`section`,{className:`testimonial-section aliceblue`,children:[(0,g.jsxs)(`div`,{className:`title`,children:[(0,g.jsx)(`span`,{children:`Community Voices`}),(0,g.jsx)(`h2`,{children:`What Our Runners Say`}),(0,g.jsx)(`p`,{children:`Every step tells a story. Hear from the runners who have become part of the Gojra Running Club family.`})]}),(0,g.jsx)(`div`,{className:`testimonial-grid`,children:y.map((e,t)=>(0,g.jsxs)(`div`,{className:`testimonial-card`,children:[(0,g.jsxs)(`div`,{className:`profile`,children:[(0,g.jsx)(`img`,{src:e.image,alt:e.name}),(0,g.jsxs)(`div`,{children:[(0,g.jsx)(`h3`,{children:e.name}),(0,g.jsx)(`p`,{children:e.role})]})]}),(0,g.jsx)(`div`,{className:`stars`,children:e.rating}),(0,g.jsxs)(`p`,{className:`message`,children:[`"`,e.text,`"`]})]},t))})]}),(0,g.jsx)(`section`,{className:`cta-section`,children:(0,g.jsxs)(`div`,{className:`cta-overlay`,children:[(0,g.jsx)(`h2`,{children:`Ready to Start Your Running Journey?`}),(0,g.jsx)(`p`,{children:`Whether you're taking your very first step or preparing for your next marathon, Gojra Running Club welcomes runners of every age and fitness level.`}),(0,g.jsxs)(`div`,{className:`buttons919`,children:[(0,g.jsx)(`button`,{className:`event-btn`,children:`View Events`}),(0,g.jsx)(`button`,{className:`join-btn`,children:`Join Now`})]})]})})]}),x=()=>(0,g.jsx)(g.Fragment,{children:(0,g.jsxs)(`section`,{className:`homepage`,children:[(0,g.jsx)(f,{}),(0,g.jsxs)(`section`,{className:`desktop`,children:[(0,g.jsx)(`div`,{class:`blur blur1`}),(0,g.jsx)(`div`,{class:`blur blur2`}),(0,g.jsx)(`div`,{class:`blur blur3`}),(0,g.jsxs)(`div`,{class:`content`,children:[(0,g.jsxs)(`h1`,{children:[`Gojra `,(0,g.jsx)(`span`,{className:`marg`,children:`Running`}),` `,(0,g.jsx)(`span`,{className:`blue1`,children:`Club`})]}),(0,g.jsx)(`h3`,{children:`Discipline Beats Motivation`}),(0,g.jsxs)(`section`,{className:`btn-hero`,children:[(0,g.jsx)(e,{to:`/events/regular`,children:`Join Us`}),(0,g.jsx)(e,{to:`/events/special`,children:`Upcoming Events`})]})]})]}),(0,g.jsx)(_,{}),(0,g.jsx)(m,{}),(0,g.jsx)(v,{}),(0,g.jsx)(h,{}),(0,g.jsx)(b,{}),(0,g.jsx)(p,{})]})});export{x as default};