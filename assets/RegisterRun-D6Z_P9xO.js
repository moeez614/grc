import{r as e}from"./rolldown-runtime-QTnfLwEv.js";import{a as t,p as n,r}from"./index-B6YeD71D.js";import{J as i,K as a,P as o,Z as s,_ as c,l,p as u,ut as d,y as f}from"./fa-B_eQKyNc.js";import{t as p}from"./Navbar-CJcU0dES.js";import{t as m}from"./Footer-EGP_SKsI.js";import{t as h}from"./index.esm-HLKYGBrd.js";var g=e(n(),1),_=`/grc/assets/qr-CMs5cfv7.png`,v=r(),y=()=>{let{register:e,handleSubmit:n,formState:{errors:r}}=h(),[y,b]=(0,g.useState)(null),[x,S]=(0,g.useState)(!1),[C,w]=(0,g.useState)(!1),[T,E]=(0,g.useState)(null),D=e=>{S(!0),setTimeout(()=>{S(!1),E(e),w(!0)},1800)},O=()=>{let e=`
========================================
         GOJRA RUNNING CLUB
       Official Participant Slip
========================================

Participant Details:
--------------------
Full Name:        ${T?.fullName}
Email Address:    ${T?.email}
Age:              ${T?.age}
Race Category:    ${T?.category}
Emergency Contact:${T?.emergency}
Transaction ID:   ${T?.TId}

Status: Pending Verification
Event Date: 14 August 2026
Venue: Gojra Sports Complex

Thank you for registering with Gojra Running Club!
========================================
`,t=new Blob([e],{type:`text/plain`}),n=URL.createObjectURL(t),r=document.createElement(`a`);r.href=n,r.download=`GojraRun-${T?.fullName?.replace(/\s+/g,`_`)||`Slip`}.txt`,r.click()};return(0,v.jsxs)(`div`,{className:`register-page-wrapper`,children:[(0,v.jsx)(`style`,{children:`
        :root {
          --twilight-indigo: #1B2F51;
          --pacific-blue: #2BC4DA;
          --razzmatazz: #ED2974;
          --bg-alice: aliceblue;
          --card-white: #FFFFFF;
          --text-dark: #111827;
          --text-muted: #6B7280;
          --border-color: #E5E7EB;
        }

        .register-page-wrapper {
          background-color: var(--bg-alice);
          min-height: 100vh;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          color: var(--text-dark);
          display: flex;
          flex-direction: column;
        }

        .register-hero {
          background: linear-gradient(135deg, var(--twilight-indigo) 0%, #0d1a30 100%);
          color: #FFFFFF;
          padding: 60px 20px 100px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .hero-glow {
          position: absolute;
          top: -100px;
          right: 50%;
          transform: translateX(50%);
          width: 500px;
          height: 300px;
          background: radial-gradient(circle, rgba(43, 196, 218, 0.2) 0%, rgba(237, 41, 116, 0.15) 50%, rgba(0,0,0,0) 100%);
          filter: blur(80px);
          pointer-events: none;
        }

        .register-hero h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 800;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }

        .register-hero h1 span {
          background: linear-gradient(90deg, var(--pacific-blue), var(--razzmatazz));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .register-hero p {
          color: #D1D5DB;
          max-width: 550px;
          margin: 0 auto;
          font-size: 1rem;
        }

        .register-main {
          max-width: 800px;
          width: 100%;
          margin: -60px auto 80px;
          padding: 0 20px;
          position: relative;
          z-index: 2;
        }

        .form-card {
          background: var(--card-white);
          border-radius: 28px;
          padding: 40px;
          box-shadow: 0 20px 40px rgba(27, 47, 81, 0.08);
          border: 1px solid rgba(27, 47, 81, 0.06);
        }

        .form-section-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--twilight-indigo);
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 2px solid var(--bg-alice);
          padding-bottom: 10px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .input-group.full-width {
          grid-column: span 2;
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--twilight-indigo);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          
        }

        .input-icon {
          position: absolute;
          left: 18px;
          color: var(--text-muted);
          font-size: 1rem;
          pointer-events: none;
        }

        .input-field {
          width: 100%;
          padding: 14px 16px 14px 44px !important;
          border-radius: 14px;
          border: 1.5px solid var(--border-color);
          background: #FAFAFA;
          font-size: 0.95rem;
          color: var(--text-dark);
          transition: all 0.2s ease;
          outline: none;
        }

        .input-field:focus {
          border-color: var(--pacific-blue);
          background: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(43, 196, 218, 0.15);
        }

        select.input-field {
          cursor: pointer;
          appearance: none;
        }

        .error-msg {
          color: var(--razzmatazz);
          font-size: 0.78rem;
          font-weight: 600;
          margin-top: 2px;
        }

        /* Payment Section Card */
        .payment-box {
          background: linear-gradient(135deg, rgba(27, 47, 81, 0.03) 0%, rgba(43, 196, 218, 0.06) 100%);
          border: 1.5px dashed var(--pacific-blue);
          border-radius: 20px;
          padding: 24px;
          margin: 32px 0;
        }

        .payment-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--twilight-indigo);
          margin-bottom: 16px;
        }

        .payment-content {
          display: flex;
          gap: 20px;
          align-items: center;
          justify-content: space-between;
        }

        .payment-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.92rem;
        }

        .payment-details p strong {
          color: var(--twilight-indigo);
        }

        .qr-card {
          background: #FFFFFF;
          padding: 10px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .qr-card img {
          width: 110px;
          height: 110px;
          object-fit: contain;
        }

        .qr-card span {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .instructions-list {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(27, 47, 81, 0.1);
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .instructions-list ol {
          margin: 6px 0 0 18px;
          padding: 0;
        }

        /* Upload Area */
        .file-upload-box {
          border: 2px dashed var(--border-color);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          background: #FAFAFA;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
        }

        .file-upload-box:hover {
          border-color: var(--pacific-blue);
          background: rgba(43, 196, 218, 0.03);
        }

        .upload-icon {
          font-size: 2rem;
          color: var(--pacific-blue);
          margin-bottom: 8px;
        }

        .file-input-hidden {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
          width: 100%;
          height: 100%;
        }

        .preview-img {
          max-height: 120px;
          border-radius: 10px;
          margin-top: 12px;
          border: 1px solid var(--border-color);
        }

        /* Terms Checkbox */
        .terms-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 28px 0;
        }

        .custom-checkbox {
          width: 20px;
          height: 20px;
          accent-color: var(--razzmatazz);
          cursor: pointer;
        }

        .terms-label {
          font-size: 0.9rem;
          color: var(--text-dark);
          font-weight: 500;
        }

        .terms-link {
          color: var(--razzmatazz);
          font-weight: 700;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .terms-link:hover {
          color: var(--twilight-indigo);
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          padding: 16px;
          border-radius: 50px;
          border: none;
          background: linear-gradient(135deg, var(--razzmatazz) 0%, #c41e5b 100%);
          color: #FFFFFF;
          font-size: 1.05rem;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 10px 25px rgba(237, 41, 116, 0.35);
          transition: all 0.25s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 30px rgba(237, 41, 116, 0.5);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #FFFFFF;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Success Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(27, 47, 81, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-card {
          background: #FFFFFF;
          border-radius: 28px;
          padding: 40px 32px;
          max-width: 460px;
          width: 100%;
          text-align: center;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
          animation: modalUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .success-icon {
          font-size: 3.5rem;
          color: #10B981;
          margin-bottom: 16px;
        }

        .modal-card h2 {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--twilight-indigo);
          margin-bottom: 8px;
        }

        .modal-card p {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 28px;
        }

        .modal-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn-modal-primary {
          padding: 14px;
          border-radius: 12px;
          border: none;
          background: var(--twilight-indigo);
          color: #FFFFFF;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .btn-modal-primary:hover {
          background: #12223d;
        }

        .btn-modal-close {
          padding: 12px;
          border-radius: 12px;
          border: 1.5px solid var(--border-color);
          background: transparent;
          color: var(--text-muted);
          font-weight: 700;
          cursor: pointer;
        }

        /* Responsiveness */
        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .input-group.full-width {
            grid-column: span 1;
          }
          .payment-content {
            flex-direction: column;
            align-items: flex-start;
          }
          .qr-card {
            align-self: center;
          }
          .form-card {
            padding: 24px 18px;
          }
        }
      `}),(0,v.jsx)(p,{}),(0,v.jsxs)(`section`,{className:`register-hero`,children:[(0,v.jsx)(`div`,{className:`hero-glow`}),(0,v.jsxs)(`h1`,{children:[`Special Event `,(0,v.jsx)(`span`,{children:`Registration`})]}),(0,v.jsx)(`p`,{children:`Lock in your spot for the Independence Day Run 2026. Fill out the form below to confirm your bib.`})]}),(0,v.jsx)(`main`,{className:`register-main`,children:(0,v.jsx)(`div`,{className:`form-card`,children:(0,v.jsxs)(`form`,{onSubmit:n(D),children:[(0,v.jsxs)(`div`,{className:`form-section-title`,children:[(0,v.jsx)(d,{style:{color:`var(--pacific-blue)`}}),`Participant Information`]}),(0,v.jsxs)(`div`,{className:`form-grid`,children:[(0,v.jsxs)(`div`,{className:`input-group full-width`,children:[(0,v.jsx)(`label`,{children:`Full Name`}),(0,v.jsxs)(`div`,{className:`input-wrapper`,children:[(0,v.jsx)(d,{className:`input-icon`}),(0,v.jsx)(`input`,{type:`text`,placeholder:`John Doe`,className:`input-field`,...e(`fullName`,{required:`Full Name is required`})})]}),r.fullName&&(0,v.jsx)(`span`,{className:`error-msg`,children:r.fullName.message})]}),(0,v.jsxs)(`div`,{className:`input-group full-width`,children:[(0,v.jsx)(`label`,{children:`Email Address`}),(0,v.jsxs)(`div`,{className:`input-wrapper`,children:[(0,v.jsx)(f,{className:`input-icon`}),(0,v.jsx)(`input`,{type:`email`,placeholder:`runner@example.com`,className:`input-field`,...e(`email`,{required:`Email is required`,pattern:{value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,message:`Invalid email address`}})})]}),r.email&&(0,v.jsx)(`span`,{className:`error-msg`,children:r.email.message})]}),(0,v.jsxs)(`div`,{className:`input-group`,children:[(0,v.jsx)(`label`,{children:`Age`}),(0,v.jsxs)(`div`,{className:`input-wrapper`,children:[(0,v.jsx)(o,{className:`input-icon`}),(0,v.jsx)(`input`,{type:`number`,placeholder:`e.g. 24`,className:`input-field`,...e(`age`,{required:`Age is required`,min:{value:10,message:`Minimum age is 10`}})})]}),r.age&&(0,v.jsx)(`span`,{className:`error-msg`,children:r.age.message})]}),(0,v.jsxs)(`div`,{className:`input-group`,children:[(0,v.jsx)(`label`,{children:`Race Category`}),(0,v.jsxs)(`div`,{className:`input-wrapper`,children:[(0,v.jsx)(s,{className:`input-icon`}),(0,v.jsxs)(`select`,{className:`input-field`,...e(`category`,{required:`Please select a category`}),children:[(0,v.jsx)(`option`,{value:``,children:`Select Distance`}),(0,v.jsx)(`option`,{value:`5 KM`,children:`5 KM Fun Run`}),(0,v.jsx)(`option`,{value:`10 KM`,children:`10 KM Challenge`})]})]}),r.category&&(0,v.jsx)(`span`,{className:`error-msg`,children:r.category.message})]}),(0,v.jsxs)(`div`,{className:`input-group full-width`,children:[(0,v.jsx)(`label`,{children:`Emergency Contact Number`}),(0,v.jsxs)(`div`,{className:`input-wrapper`,children:[(0,v.jsx)(a,{className:`input-icon`}),(0,v.jsx)(`input`,{type:`tel`,placeholder:`03XXXXXXXXX`,className:`input-field`,...e(`emergency`,{required:`Emergency contact is required`})})]}),r.emergency&&(0,v.jsx)(`span`,{className:`error-msg`,children:r.emergency.message})]})]}),(0,v.jsxs)(`div`,{className:`payment-box`,children:[(0,v.jsxs)(`div`,{className:`payment-header`,children:[(0,v.jsx)(i,{style:{color:`var(--pacific-blue)`}}),`Payment Information`]}),(0,v.jsxs)(`div`,{className:`payment-content`,children:[(0,v.jsxs)(`div`,{className:`payment-details`,children:[(0,v.jsxs)(`p`,{children:[(0,v.jsx)(`strong`,{children:`Fee:`}),` PKR 500`]}),(0,v.jsxs)(`p`,{children:[(0,v.jsx)(`strong`,{children:`Payment Method:`}),` Easypaisa / JazzCash`]}),(0,v.jsxs)(`p`,{children:[(0,v.jsx)(`strong`,{children:`Account Title:`}),` Gojra Running Club`]}),(0,v.jsxs)(`p`,{children:[(0,v.jsx)(`strong`,{children:`Account Number:`}),` 0300-1234567`]})]}),(0,v.jsxs)(`div`,{className:`qr-card`,children:[(0,v.jsx)(`img`,{src:_,alt:`Payment QR Code`}),(0,v.jsx)(`span`,{children:`Scan to Pay`})]})]}),(0,v.jsxs)(`div`,{className:`instructions-list`,children:[(0,v.jsx)(`strong`,{children:`Instructions:`}),(0,v.jsxs)(`ol`,{children:[(0,v.jsx)(`li`,{children:`Transfer the PKR 500 fee to the account above.`}),(0,v.jsx)(`li`,{children:`Copy the Transaction ID (TID) from your digital receipt.`}),(0,v.jsx)(`li`,{children:`Upload a screenshot of the payment receipt below.`})]})]})]}),(0,v.jsxs)(`div`,{className:`form-grid`,children:[(0,v.jsxs)(`div`,{className:`input-group full-width`,children:[(0,v.jsx)(`label`,{children:`Transaction ID (TID)`}),(0,v.jsxs)(`div`,{className:`input-wrapper`,children:[(0,v.jsx)(o,{className:`input-icon`}),(0,v.jsx)(`input`,{type:`text`,placeholder:`Enter payment transaction ID`,className:`input-field`,...e(`TId`,{required:`Transaction ID is required`})})]}),r.TId&&(0,v.jsx)(`span`,{className:`error-msg`,children:r.TId.message})]}),(0,v.jsxs)(`div`,{className:`input-group full-width`,children:[(0,v.jsx)(`label`,{children:`Payment Proof (Screenshot)`}),(0,v.jsxs)(`div`,{className:`file-upload-box`,children:[(0,v.jsx)(u,{className:`upload-icon`}),(0,v.jsx)(`p`,{style:{margin:0,fontWeight:700,fontSize:`0.9rem`},children:`Click or drag image to upload proof`}),(0,v.jsx)(`span`,{style:{fontSize:`0.78rem`,color:`var(--text-muted)`},children:`PNG, JPG, or WEBP supported`}),(0,v.jsx)(`input`,{type:`file`,accept:`image/*`,className:`file-input-hidden`,...e(`payment`,{required:`Payment screenshot is required`,onChange:e=>{e.target.files[0]&&b(URL.createObjectURL(e.target.files[0]))}})})]}),r.payment&&(0,v.jsx)(`span`,{className:`error-msg`,children:r.payment.message}),y&&(0,v.jsx)(`div`,{style:{textAlign:`center`},children:(0,v.jsx)(`img`,{className:`preview-img`,src:y,alt:`Payment Proof Preview`})})]})]}),(0,v.jsxs)(`div`,{className:`terms-row`,children:[(0,v.jsx)(`input`,{type:`checkbox`,id:`termsCheck`,className:`custom-checkbox`,...e(`terms`,{required:!0})}),(0,v.jsxs)(`label`,{htmlFor:`termsCheck`,className:`terms-label`,children:[`I agree to the `,(0,v.jsx)(t,{to:`/termsconditions`,className:`terms-link`,target:`_blank`,children:`Terms & Conditions`})]})]}),r.terms&&(0,v.jsx)(`p`,{className:`error-msg`,style:{marginTop:`-18px`,marginBottom:`20px`},children:`You must accept the terms to register.`}),(0,v.jsx)(`button`,{type:`submit`,disabled:x,className:`submit-btn`,children:x?(0,v.jsx)(`div`,{className:`spinner`}):`Complete Registration`})]})})}),C&&(0,v.jsx)(`div`,{className:`modal-overlay`,children:(0,v.jsxs)(`div`,{className:`modal-card`,children:[(0,v.jsx)(l,{className:`success-icon`}),(0,v.jsx)(`h2`,{children:`You're Registered!`}),(0,v.jsx)(`p`,{children:`Thank you for signing up. Your details and payment proof have been submitted for verification.`}),(0,v.jsxs)(`div`,{className:`modal-actions`,children:[(0,v.jsxs)(`button`,{onClick:O,className:`btn-modal-primary`,children:[(0,v.jsx)(c,{}),` Download Registration Slip`]}),(0,v.jsx)(`button`,{onClick:()=>w(!1),className:`btn-modal-close`,children:`Close Window`})]})]})}),(0,v.jsx)(m,{})]})};export{y as default};