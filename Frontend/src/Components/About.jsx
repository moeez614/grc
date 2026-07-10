import React from 'react'
import {
  FaRunning,
  FaHeartbeat,
  FaUsers,
  FaMedal,
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaHandsHelping,
  FaSmile,
} from "react-icons/fa";

const About = () => {
    const benefits = [
    {
      icon: <FaRunning />,
      title: "Train Together",
      text: "Run with passionate runners and stay motivated every step of the way.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Improve Your Health",
      text: "Build endurance, improve fitness, and enjoy a healthier lifestyle.",
    },
    {
      icon: <FaUsers />,
      title: "Friendly Community",
      text: "Meet people who share your passion for running and fitness.",
    },
    {
      icon: <FaMedal />,
      title: "Exciting Events",
      text: "Participate in races, marathons, and fun community runs.",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Scenic Routes",
      text: "Explore beautiful running routes throughout Gojra.",
    },
    {
      icon: <FaCalendarAlt />,
      title: "Regular Activities",
      text: "Weekly group runs and special seasonal events.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Supportive Environment",
      text: "Encouragement from beginners to experienced runners.",
    },
    {
      icon: <FaSmile />,
      title: "Enjoy Every Run",
      text: "Because running is more fun when you do it together.",
    },
  ];
    return (
        <div className='about-us'>
            <h4>Why Run With Us?</h4>
            <h5>Join Gojra Running Club and become part of a community that inspires <br />
          healthier lifestyles, stronger friendships, <br /> and unforgettable
          experiences.</h5>
            <div className="why-page">


      <section className="benefits">

        {benefits.map((item, index) => (
          <div className="benefit-card" key={index}>
            <div className="icon339">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}

      </section>


    </div>

        </div>
    )
}

export default About
