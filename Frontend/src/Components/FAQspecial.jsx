import React from 'react'
import { useState } from "react";
import '../css/Faq.css'
const faqData = [
    {
        question: "How to register?",
        answer:
            "Register through our website by selecting your preferred event and completing the registration form and payment."
    },
    {
        question: "Cancellation policy?",
        answer:
            "Participants may cancel registration up to 7 days before the event date."
    },
    {
        question: "Refund policy?",
        answer:
            "Refunds are available according to the event's refund terms and conditions."
    },
    {
        question: "What to bring?",
        answer:
            "Bring your CNIC, running gear, hydration bottle, and registration confirmation."
    },
    {
        question: "Timing and rules?",
        answer:
            "Participants must arrive 45 minutes before race start and follow all race regulations."
    }
];
const FAQspecial = () => {
    const [active, setActive] = useState(0);
    return (
        <div className='aliceblue'>
            <section className="faq-section aliceblue">
                <h2>Frequently Asked Questions</h2>

                {faqData.map((faq, index) => (
                    <div className="faq-card" key={index}>
                        <button
                            className="faq-question"
                            onClick={() =>
                                setActive(active === index ? null : index)
                            }
                        >
                            <span>❓ {faq.question}</span>
                            <span>{active === index ? "−" : "+"}</span>
                        </button>

                        {active === index && (
                            <div className="faq-answer">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </section>
        </div>
    )
}

export default FAQspecial
