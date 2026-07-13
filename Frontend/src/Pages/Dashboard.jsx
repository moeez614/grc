import React from 'react'
import Sidebar from '../Layouts/Sidebar'
// import MemberManagement from '../Layouts/MemberManagement'
import { NavLink, Outlet } from 'react-router-dom'
const Dashboard = () => {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />

            <div
                style={{
                    flex: 1,
                    padding: "25px",
                    background: "#F5F7FA",
                    minHeight: "100vh",
                }}
            >
                {/* Your dashboard content */}
                {/* <MemberManagement /> */}
                <div style={{marginLeft: "250px"}}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
