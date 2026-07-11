import React from 'react'
import Navbar from '../Components/Navbar'
import { useState } from "react";
import { FaEye, FaEyeSlash, FaRunning } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import Paka from '../assets/grc-logo.webp'
const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        setErrors({
            ...errors,
            [e.target.name]: "",
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validate();

        if (Object.keys(validation).length > 0) {
            setErrors(validation);
            return;
        }

        setLoading(true);

        try {

            const response = await API.post("/admin/login", {
                email: form.email,
                password: form.password
            });


            // Store JWT Token
            localStorage.setItem(
                "adminToken",
                response.data.token
            );


            // Store admin info (optional)
            localStorage.setItem(
                "admin",
                JSON.stringify(response.data.admin)
            );


            navigate("/dashboard");


        } catch (error) {


            setErrors({
                api:
                    error.response?.data?.message ||
                    "Login failed. Try again."
            });


        } finally {

            setLoading(false);

        }
    };

    const validate = () => {
        let newErrors = {};

        if (!form.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email)
        ) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!form.password) {
            newErrors.password = "Password is required.";
        } else if (form.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }

        return newErrors;
    };

    return (
        <div>
            <div
                style={{
                    minHeight: "100vh",
                    background: "#1B2F51",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                    fontFamily: "Arial",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "420px",
                        background: "#fff",
                        borderRadius: "18px",
                        padding: "35px",
                        boxShadow: "0 15px 35px rgba(0,0,0,.2)",
                    }}
                >
                    <div style={{ textAlign: "center", marginBottom: "30px" }}>
                        <img src={Paka} alt="GRC logo" loading='lazy' width={70} height={70} />
                        <h2
                            style={{
                                color: "#1B2F51",
                                marginBottom: "5px",
                            }}
                        >
                            Admin Login
                        </h2>

                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Email */}

                        <div style={{ marginBottom: "20px" }}>
                            <label
                                style={{
                                    color: "#1B2F51",
                                    fontWeight: "bold",
                                }}
                            >
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="admin@example.com"
                                style={{
                                    width: "100%",
                                    marginTop: "8px",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: "2px solid #2BC4DA",
                                    outline: "none",
                                    fontSize: "15px",
                                }}
                            />

                            {errors.email && (
                                <p
                                    style={{
                                        color: "#ED2974",
                                        marginTop: "6px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password */}

                        <div style={{ marginBottom: "10px" }}>
                            <label
                                style={{
                                    color: "#1B2F51",
                                    fontWeight: "bold",
                                }}
                            >
                                Password
                            </label>

                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "2px solid #2BC4DA",
                                    borderRadius: "8px",
                                    marginTop: "8px",
                                }}
                            >
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter Password"
                                    style={{
                                        flex: 1,
                                        padding: "12px",
                                        border: "none",
                                        outline: "none",
                                        fontSize: "15px",
                                    }}
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    style={{
                                        border: "none",
                                        background: "transparent",
                                        cursor: "pointer",
                                        padding: "10px",
                                    }}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash color="#1B2F51" />
                                    ) : (
                                        <FaEye color="#1B2F51" />
                                    )}
                                </button>
                            </div>

                            {/* {errors.password && (
                                <p
                                    style={{
                                        color: "#ED2974",
                                        marginTop: "6px",
                                        fontSize: "14px",
                                    }}
                                >
                                    {errors.password}
                                </p>
                            )} */}
                            {errors.api && (
                                <p
                                    style={{
                                        color: "#ED2974",
                                        textAlign: "center",
                                        marginTop: "15px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {errors.api}
                                </p>
                            )}
                        </div>

                        {/* Forgot */}

                        <div
                            style={{
                                textAlign: "right",
                                marginBottom: "25px",
                            }}
                        >
                            <a
                                href="/forgot-password"
                                style={{
                                    color: "#ED2974",
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                }}
                            >
                                Forgot Password?
                            </a>
                        </div>

                        {/* Login */}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: "100%",
                                padding: "14px",
                                border: "none",
                                borderRadius: "10px",
                                background: "#2BC4DA",
                                color: "#1B2F51",
                                fontWeight: "bold",
                                fontSize: "17px",
                                cursor: loading ? "not-allowed" : "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                            }}
                        >
                            {loading ? (
                                <>
                                    <div
                                        style={{
                                            width: "18px",
                                            height: "18px",
                                            border: "3px solid white",
                                            borderTop: "3px solid #ED2974",
                                            borderRadius: "50%",
                                            animation: "spin 1s linear infinite",
                                        }}
                                    ></div>

                                    Logging In...
                                </>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>

                <style>{`
        @keyframes spin{
          from{
            transform:rotate(0deg);
          }
          to{
            transform:rotate(360deg);
          }
        }
      `}</style>
            </div>
        </div>
    )
}

export default Login
