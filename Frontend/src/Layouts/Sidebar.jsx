
import React from 'react'
import { NavLink } from "react-router-dom";
import Logoo from '../assets/grc-logo.webp'
import {
    FaChartPie,
    FaUsers,
    FaRunning,
    FaClipboardList,
    FaImages,
    FaHandshake,
    FaCog,
} from "react-icons/fa";

const links = [
    {
        name: "Dashboard Statistics",
        path: "/dashboard",
        icon: <FaChartPie />,
    },
    {
        name: "Members Management",
        path: "membermanagement",
        icon: <FaUsers />,
    },
    {
        name: "Events Management",
        path: "/admin/events",
        icon: <FaRunning />,
    },
    {
        name: "Registration Management",
        path: "/admin/registrations",
        icon: <FaClipboardList />,
    },
    {
        name: "Upload Gallery Images",
        path: "/admin/gallery",
        icon: <FaImages />,
    },
    {
        name: "Manage Sponsors",
        path: "sponsors-management",
        icon: <FaHandshake />,
    },
    {
        name: "Settings",
        path: "/admin/settings",
        icon: <FaCog />,
    },
];

const Sidebar = () => {
    return (
        <div>
            <aside
                style={{
                    width: "250px",
                    height: "100vh",
                    background: "#1B2F51",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    position: "fixed",
                    left: 0,
                    top: 0,
                    padding: "20px 12px",
                    boxSizing: "border-box",
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px",
                    textAlign: "center",
                    gap: "10px",
                }}>

                    <img src={Logoo} alt="Grc Logo" loading="lazy" width={70} height={70} />
                    <h2
                        style={{
                            color: "#2BC4DA",
                            textAlign: "center",
                            fontSize: "22px",
                            fontWeight: "bold",
                        }}
                    >
                        GRC Admin
                    </h2>
                </div>

                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                    }}
                >
                    {links.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            style={({ isActive }) => ({
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                padding: "12px",
                                borderRadius: "8px",
                                textDecoration: "none",
                                color: isActive ? "#fff" : "#E8E8E8",
                                background: isActive ? "#ED2974" : "transparent",
                                fontWeight: isActive ? "600" : "500",
                                transition: "0.3s",
                                fontSize: "14px",
                            })}
                        >
                            <span style={{ fontSize: "16px" }}>{item.icon}</span>
                            <span>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div
                    style={{
                        marginTop: "auto",
                        textAlign: "center",
                        color: "#2BC4DA",
                        fontSize: "12px",
                        paddingTop: "20px",
                    }}
                >
                    © 2026 Gojra Running Club
                </div>
            </aside>
        </div>
    )
}

export default Sidebar
