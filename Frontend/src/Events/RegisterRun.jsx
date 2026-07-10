import React from 'react'
import Navbar from '../Components/Navbar'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import Footer from '../Components/common/Footer';
import QR from '../assets/qr.png'
import { useMediaQuery } from "react-responsive";

const RegisterRun = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [participant, setParticipant] = useState(null);

    const onSubmit = (data) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setParticipant(data);
            setSuccess(true);
        }, 2000);
    };

    const downloadSlip = () => {
        const slip = `
GOJRA RUNNING CLUB
-------------------------
Participant Slip

Name: ${participant.fullName}
Phone: ${participant.phone}
Email: ${participant.email}
Age: ${participant.age}
Gender: ${participant.gender}
Category: ${participant.category}
Emergency Contact: ${participant.emergency}

Status: will be updated soon
`;

        const blob = new Blob([slip], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "participant-slip.txt";
        a.click();
    };
    return (
        <>
            <Navbar />
            <div className="register-container aliceblue">
                <div className="register-card">
                    <h1>Special Event Registration</h1>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                {...register("fullName", {
                                    required: "Name required",
                                })}
                            />
                            <span>{errors.fullName?.message}</span>
                        </div>

                        <div className="input-group">
                            <label>Phone Number</label>
                            <input
                                {...register("phone", {
                                    required: "Phone required",
                                    pattern: {
                                        value: /^[0-9]{11}$/,
                                        message: "Enter valid number",
                                    },
                                })}
                            />
                            <span>{errors.phone?.message}</span>
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input
                                {...register("email", {
                                    required: "Email required",
                                })}
                            />
                            <span>{errors.email?.message}</span>
                        </div>

                        <div className="input-group">
                            <label>Age</label>
                            <input
                                type="number"
                                {...register("age", {
                                    required: "Age required",
                                })}
                            />
                            <span>{errors.age?.message}</span>
                        </div>

                        <div className="input-group">
                            <label>Gender</label>
                            <select
                                {...register("gender", {
                                    required: "Gender required",
                                })}
                            >
                                <option value="">Select</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <span>{errors.gender?.message}</span>
                        </div>

                        <div className="input-group">
                            <label>Race Category</label>
                            <select
                                {...register("category", {
                                    required: "Category required",
                                })}
                            >
                                <option value="">Select</option>
                                <option>5 KM</option>
                                <option>10 KM</option>
                                <option>Other</option>
                            </select>
                            <span>{errors.category?.message}</span>
                        </div>

                        <div className="input-group">
                            <label>Emergency Contact</label>
                            <input
                                {...register("emergency", {
                                    required: "Required",
                                })}
                            />
                            <span>{errors.emergency?.message}</span>
                        </div>
                        {/* method to pay */}
                        <div className="payment-card">
                            <h3>💳 Registration Fee & Payment Details</h3>

                            <div className="payment-info">
                                <section className='jazz' style={{display: "flex",flexDirection: isMobile ? "column" : "row"}}>
                                    <div>
                                        <p><strong>Registration Fee:</strong> PKR 500</p>
                                        <p><strong>Payment Method:</strong> Easypaisa</p>
                                        <p><strong>Account Title:</strong> Gojra Running Club</p>
                                        <p><strong>Account Number:</strong> 0300-1234567</p>
                                    </div>
                                    <img src={QR} alt="Scan me" width="100px" />
                                </section>
                                <div className="instruction">
                                    <strong>Instructions:</strong>
                                    <ol>
                                        <li>Send the registration fee.</li>
                                        <li>Take a screenshot of the payment receipt.</li>
                                        <li>Upload TId & screenshot below.</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                         <div className="input-group">
                            <label>TId</label>
                            <input
                                type="number"
                                {...register("TId", {
                                    required: "TId required",
                                })}
                            />
                            <span>{errors.TId?.message}</span>
                        </div>
                        <div className="input-group">
                            <label>Payment Screenshot</label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("payment", {
                                    required: "Payment proof required",
                                })}
                                onChange={(e) => {
                                    if (e.target.files[0]) {
                                        setPreview(
                                            URL.createObjectURL(e.target.files[0])
                                        );
                                    }
                                }}
                            />
                            <span>{errors.payment?.message}</span>

                            {preview && (
                                <img
                                    className="preview"
                                    src={preview}
                                    alt=""
                                />
                            )}
                        </div>

                        <div className="checkbox">
                            <input
                                type="checkbox"
                                {...register("terms", {
                                    required: true,
                                })}
                            />
                            <label>
                                I accept Terms & Conditions
                            </label>
                        </div>

                        {errors.terms && (
                            <p className="error">
                                Accept terms first
                            </p>
                        )}

                        <button disabled={loading} className="button">
                            {loading ? (
                                <div className="spinner"></div>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {success && (
                <div className="modal">
                    <div className="modal-box">
                        <h2>Registration Successful</h2>

                        <p>
                            Thank you for registering.
                        </p>

                        <button onClick={downloadSlip} className="button">
                            Download Slip
                        </button>

                        <button
                            onClick={() => setSuccess(false)}
                            className="button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </>
    )
}

export default RegisterRun
