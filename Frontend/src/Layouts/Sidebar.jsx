
import React from 'react'
import { NavLink } from "react-router-dom";
import Logoo from '../assets/grc-logo.webp'
import { useState } from "react";
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
        path: "event-management",
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
    const [openEvents, setOpenEvents] = useState(false);
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
                    padding: "12px",
                    boxSizing: "border-box",
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "12px 0",
                    textAlign: "center",
                    gap: "10px",
                    marginBottom: "10px"
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
                    {/* {links.map((item) => (
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
                    ))} */}
                    {links.map((item) => (
                        <React.Fragment key={item.name}>
                            {item.name === "Events Management" ? (
                                <>
                                    <div
                                        onClick={() => setOpenEvents(!openEvents)}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            padding: "12px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            color: "#E8E8E8",
                                            fontWeight: "500",
                                            fontSize: "14px",
                                        }}
                                    >
                                        <span style={{ fontSize: "16px" }}>{item.icon}</span>
                                        <span style={{ flex: 1 }}>{item.name}</span>
                                        <span>{openEvents ? "▲" : "▼"}</span>
                                    </div>

                                    {openEvents && (
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: "28px",
                                                gap: "6px",
                                            }}
                                        >
                                            <NavLink
                                                to="event-management/weekly-events"
                                                style={({ isActive }) => ({
                                                    padding: "8px 12px",
                                                    borderRadius: "6px",
                                                    textDecoration: "none",
                                                    color: isActive ? "#fff" : "#E8E8E8",
                                                    background: isActive ? "#ED2974" : "transparent",
                                                    fontSize: "13px",
                                                })}
                                            >
                                                Weekly Events
                                            </NavLink>

                                            <NavLink
                                                to="event-management/annual-events"
                                                style={({ isActive }) => ({
                                                    padding: "8px 12px",
                                                    borderRadius: "6px",
                                                    textDecoration: "none",
                                                    color: isActive ? "#fff" : "#E8E8E8",
                                                    background: isActive ? "#ED2974" : "transparent",
                                                    fontSize: "13px",
                                                })}
                                            >
                                                Annual Events
                                            </NavLink>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <NavLink
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
                            )}
                        </React.Fragment>
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
                    GRC v1.0.0
                </div>
            </aside>
        </div>
    )
}

export default Sidebar
