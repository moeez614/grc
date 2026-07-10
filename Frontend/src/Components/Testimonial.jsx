import React from 'react'
import '../css/Testimonisal.css'
const testimonials = [
    {
        name: "Ali Raza",
        role: "5K Finisher",
        image: "https://i.pravatar.cc/150?img=12",
        rating: "★★★★★",
        text: "Joining Gojra Running Club completely changed my lifestyle. The supportive community motivates me every single week."
    },
    {
        name: "Ayesha Khan",
        role: "10K Runner",
        image: "https://i.pravatar.cc/150?img=32",
        rating: "★★★★★",
        text: "Professional event management, friendly runners, and an amazing atmosphere. Every event feels memorable."
    },
    {
        name: "Muhammad Usman",
        role: "Club Member",
        image: "https://i.pravatar.cc/150?img=18",
        rating: "★★★★★",
        text: "I started as a beginner and now regularly complete 10K runs. GRC helped me become healthier and more confident."
    }
];
const Testimonial = () => {
    return (
        <div className='aliceblue'>
            <section className="testimonial-section aliceblue">

                <div className="title">
                    <span>Community Voices</span>
                    <h2>What Our Runners Say</h2>
                    <p>
                        Every step tells a story. Hear from the runners who have become
                        part of the Gojra Running Club family.
                    </p>
                </div>

                <div className="testimonial-grid">
                    {testimonials.map((item, index) => (
                        <div className="testimonial-card" key={index}>

                            <div className="profile">
                                <img src={item.image} alt={item.name} />

                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.role}</p>
                                </div>
                            </div>

                            <div className="stars">{item.rating}</div>

                            <p className="message">
                                "{item.text}"
                            </p>

                        </div>
                    ))}
                </div>

            </section>

            <section className="cta-section">

                <div className="cta-overlay">

                    <h2>Ready to Start Your Running Journey?</h2>

                    <p>
                        Whether you're taking your very first step or preparing for your
                        next marathon, Gojra Running Club welcomes runners of every age
                        and fitness level.
                    </p>

                    <div className="buttons919">
                        <button className="event-btn">
                            View Events
                        </button>
                        <button className="join-btn">
                            Join Now
                        </button>


                    </div>

                </div>

            </section>
        </div>
    )
}

export default Testimonial
