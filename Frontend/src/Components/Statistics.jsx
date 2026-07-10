import React from 'react'
import { useMediaQuery } from "react-responsive";
import { useState } from 'react';


const Statistics = () => {
        const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
        <section className="containers-stats" style={{flexDirection: isMobile ? "column" : "row"}}>
            <div>
                <h4>
                    <i className="fa-solid fa-people-group"></i>
                    Members</h4>
                <h3>50+</h3>
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
                <h3>15+</h3>
            </div>
        </section>
    </>
  )
}

export default Statistics
