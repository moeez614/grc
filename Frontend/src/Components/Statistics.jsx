import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import API from "../api/axios"; // adjust path if needed


const Statistics = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [memberCount, setMemberCount] = useState(0);
    const [sponsorCount, setSponsorCount] = useState(0);
    useEffect(() => {
  const fetchData = async () => {
    try {
      const [membersRes, sponsorsRes] = await Promise.all([
        API.get("/members"),
        API.get("/sponsors"),
      ]);

      // Total members
      setMemberCount(membersRes.data.length);

      // Total sponsors
      setSponsorCount(sponsorsRes.data.length);

    } catch (error) {
      console.error(error);
    }
  };

  fetchData();
}, []);
    return (
        <>
            <section className="containers-stats" style={{ flexDirection: isMobile ? "column" : "row" }}>
                <div>
                    <h4>
                        <i className="fa-solid fa-people-group"></i>
                        Members</h4>
                    <h3>{memberCount}+</h3>
                </div>
                <div>
                    <h4><i className="fa-solid fa-person-running"></i>Event Organized</h4>
                    <h3>300+</h3>
                </div>
                <div>
                    <h4><i className="fa-solid fa-medal"></i>Race Finishes</h4>
                    <h3>5000+</h3>
                </div>
                <div>
                    <h4><i class="fa-solid fa-handshake"></i>Sponsors</h4>
                    <h3>{sponsorCount}+</h3>
                </div>
            </section>
        </>
    )
}

export default Statistics
