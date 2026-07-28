import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/common/Footer';
import QR from '../assets/qr.png';
import { useForm } from "react-hook-form";
import { NavLink, useParams } from "react-router-dom";
import API from "../api/axios";
import {
  FaUser,
  FaEnvelope,
  FaHashtag,
  FaRunning,
  FaPhoneAlt,
  FaCloudUploadAlt,
  FaCheckCircle,
  FaDownload,
  FaTimes,
  FaQrcode,
  FaShieldAlt
} from "react-icons/fa";

const RegisterRun = () => {
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [participant, setParticipant] = useState(null);
  const [event, setEvent] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await API.get(`/annual-events/${id}`);

        setEvent(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingEvent(false);
      }
    };

    getEvent();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("eventId", id);
      formData.append("fullName", data.fullName);
      formData.append("email", data.email);
      formData.append("age", data.age);
      formData.append("category", data.category);
      formData.append("emergency", data.emergency);
      formData.append("transactionId", data.transactionId);

      // uploaded image
      formData.append("payment", data.payment[0]);

      const res = await API.post(
        "/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        reset();
        setParticipant(data);
        setSuccess(true);
        setPreview(null);
      }
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  const downloadSlip = () => {
    const slip = `
========================================
         GOJRA RUNNING CLUB
       Official Participant Slip
========================================

Participant Details:
--------------------
Full Name:        ${participant?.fullName}
Email Address:    ${participant?.email}
Age:              ${participant?.age}
Race Category:    ${participant?.category}
Emergency Contact:${participant?.emergency}
Transaction ID:   ${participant?.transactionId}

Status: Pending Verification
Event Date: ${new Date(event?.eventDate).toLocaleDateString()}
Venue: ${event?.location}

Thank you for registering with Gojra Running Club!
========================================
`;

    const blob = new Blob([slip], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `GojraRun-${participant?.fullName?.replace(/\s+/g, '_') || 'Slip'}.txt`;
    a.click();
  };
  const registrationClosed =
    event?.registrationStatus !== "Open" ||
    new Date(event.registrationDeadline) < new Date();
  if (registrationClosed) {
    return (
      <>
        <Navbar />

        <div
          style={{
            minHeight: "70vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            textAlign: "center",
            padding: "40px"
          }}
        >
          <h1>Registration Closed</h1>

          <p>
            Registration for <strong>{event?.eventName}</strong> has
            ended.
          </p>

          <NavLink
            to={`/events/special/description/${id}`}
            className="submit-btn"
            style={{ maxWidth: 250, marginTop: 20 }}
          >
            Back to Event
          </NavLink>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <div className="register-page-wrapper">
      <style>{`
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
      `}</style>

      <Navbar />

      {/* Hero Header */}
      <section className="register-hero">
        <div className="hero-glow" />
        <h1>{event?.eventName} <span>Registration</span></h1>
        <p>Complete your registration for {"\u00A0"}
          {event?.eventName}
          {"\u00A0"} before
          {"\u00A0"}
          {new Date(event?.registrationDeadline).toLocaleDateString()}</p>
      </section>

      {/* Main Form Container */}
      <main className="register-main">
        <div className="form-card">
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* Section 1: Participant Info */}
            <div className="form-section-title">
              <FaUser style={{ color: 'var(--pacific-blue)' }} />
              Participant Information
            </div>

            <div className="form-grid">
              {/* Full Name */}
              <div className="input-group full-width">
                <label>Full Name</label>
                <div className="input-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="input-field"
                    {...register("fullName", { required: "Full Name is required" })}
                  />
                </div>
                {errors.fullName && <span className="error-msg">{errors.fullName.message}</span>}
              </div>

              {/* Email */}
              <div className="input-group full-width">
                <label>Email Address</label>
                <div className="input-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="runner@example.com"
                    className="input-field"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    })}
                  />
                </div>
                {errors.email && <span className="error-msg">{errors.email.message}</span>}
              </div>

              {/* Age */}
              <div className="input-group">
                <label>Age</label>
                <div className="input-wrapper">
                  <FaHashtag className="input-icon" />
                  <input
                    type="number"
                    className="input-field"

                    {...register("age", {

                      required: "Age is required",

                      validate: value => {

                        if (!selectedCategory)
                          return "Select category first";

                        if (
                          Number(value) <
                          Number(selectedCategory.ageLimit)
                        ) {

                          return `Minimum age for ${selectedCategory.raceDistance} is ${selectedCategory.ageLimit}`;

                        }

                        return true;

                      }

                    })}
                  />
                </div>
                {errors.age && <span className="error-msg">{errors.age.message}</span>}
              </div>

              {/* Race Category */}
              <div className="input-group">
                <label>Race Category</label>
                <div className="input-wrapper">
                  <FaRunning className="input-icon" />
                  <select
                    className="input-field"
                    {...register("category", {
                      required: "Please select a category",
                      onChange: (e) => {

                        const cat = event.categories.find(
                          c => c.raceDistance === e.target.value
                        );

                        setSelectedCategory(cat);
                      }
                    })}
                  >
                    {event?.categories?.map((cat, index) => (

                      <option
                        key={index}
                        value={cat.raceDistance}
                      >
                        {cat.raceDistance}
                      </option>

                    ))}
                  </select>
                </div>
                {errors.category && <span className="error-msg">{errors.category.message}</span>}
              </div>

              {/* Emergency Contact */}
              <div className="input-group full-width">
                <label>Emergency Contact Number</label>
                <div className="input-wrapper">
                  <FaPhoneAlt className="input-icon" />
                  <input
                    type="tel"
                    placeholder="03XXXXXXXXX"
                    className="input-field"
                    {...register("emergency", { required: "Emergency contact is required" })}
                  />
                </div>
                {errors.emergency && <span className="error-msg">{errors.emergency.message}</span>}
              </div>
            </div>

            {/* Section 2: Payment Details */}
            <div className="payment-box">
              <div className="payment-header">
                <FaQrcode style={{ color: 'var(--pacific-blue)' }} />
                Payment Information
              </div>

              <div className="payment-content">
                <div className="payment-details">
                  <p><strong>Fee:</strong>PKR {selectedCategory?.registrationFee ?? "--"}</p>
                  <p>

                    <strong>Payment Method:</strong>

                    {event?.paymentMethod}

                  </p>

                  <p>

                    <strong>Account Title:</strong>

                    {event?.accountTitle}

                  </p>

                  <p>

                    <strong>Account Number:</strong>

                    {event?.accountNumber}

                  </p>
                </div>

                <div className="qr-card">
                  <img
                    src={`${import.meta.env.VITE_API_URL}/uploads/annual-events/qr/${event?.qrImage.split("/").pop()}`}
                    alt="QR"
                  />
                  <span>Scan to Pay</span>
                </div>
              </div>

              <div className="instructions-list">
                <strong>Instructions:</strong>
                <ol>
                  <li>Transfer the fee to the account above.</li>
                  <li>Copy the Transaction ID (TID) from your digital receipt.</li>
                  <li>Upload a screenshot of the payment receipt below.</li>
                </ol>
              </div>
            </div>

            {/* Transaction ID & Screenshot */}
            <div className="form-grid">
              <div className="input-group full-width">
                <label>Transaction ID (TID)</label>
                <div className="input-wrapper">
                  <FaHashtag className="input-icon" />
                  <input
                    type="text"
                    placeholder="Enter payment transaction ID"
                    className="input-field"
                    {...register("transactionId", {
                      required: "Transaction ID is required",
                    })}
                  />
                </div>
                {errors.TId && <span className="error-msg">{errors.TId.message}</span>}
              </div>

              <div className="input-group full-width">
                <label>Payment Proof (Screenshot)</label>
                <div className="file-upload-box">
                  <FaCloudUploadAlt className="upload-icon" />
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem' }}>
                    Click or drag image to upload proof
                  </p>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    PNG, JPG, or WEBP supported
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input-hidden"
                    {...register("payment", {
                      required: "Payment screenshot is required",
                      onChange: (e) => {

                        const file = e.target.files[0];

                        if (!file) return;

                        const allowed = [
                          "image/jpeg",
                          "image/png",
                          "image/webp",
                        ];

                        if (!allowed.includes(file.type)) {

                          alert("Only JPG, PNG and WEBP images are allowed.");

                          e.target.value = "";

                          return;
                        }

                        if (file.size > 2 * 1024 * 1024) {

                          alert("Maximum file size is 2 MB.");

                          e.target.value = "";

                          return;
                        }

                        setPreview(URL.createObjectURL(file));

                      }
                    })}
                  />
                </div>
                {errors.payment && <span className="error-msg">{errors.payment.message}</span>}

                {preview && (
                  <div style={{ textAlign: 'center' }}>
                    <img className="preview-img" src={preview} alt="Payment Proof Preview" />
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions Row */}
            <div className="terms-row">
              <input
                type="checkbox"
                id="termsCheck"
                className="custom-checkbox"
                {...register("terms", { required: true })}
              />
              <label htmlFor="termsCheck" className="terms-label">
                I agree to the <NavLink to="/termsconditions" className="terms-link" target="_blank">Terms & Conditions</NavLink>
              </label>
            </div>
            {errors.terms && <p className="error-msg" style={{ marginTop: '-18px', marginBottom: '20px' }}>You must accept the terms to register.</p>}

            {/* Submit Button */}
            <button type="submit" disabled={loading} className="submit-btn" disabled={registrationClosed || loading}>
              {loading ? <div className="spinner" /> : "Complete Registration"}
            </button>
          </form>
        </div>
      </main>

      {/* Success Modal */}
      {success && (
        <div className="modal-overlay">
          <div className="modal-card">
            <FaCheckCircle className="success-icon" />
            <h2>You're Registered!</h2>
            <p>Thank you for signing up. Your details and payment proof have been submitted for verification.</p>

            <div className="modal-actions">
              <button onClick={downloadSlip} className="btn-modal-primary">
                <FaDownload /> Download Registration Slip
              </button>

              <button onClick={() => setSuccess(false)} className="btn-modal-close">
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
      {registrationClosed && (

        <p className="error-msg">

          Registration Closed

        </p>

      )}
      <Footer />
    </div>
  );
};

export default RegisterRun;