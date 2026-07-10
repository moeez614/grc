import React from 'react'
import logo from '../assets/grc-logo.webp'
import "../css/Loader.css"
const Loader = () => {
    return (
        <div>
            <div className="loading-page">

                <div className="loader">

                    <img src={logo} alt="GRC Logo" className="logo" loading='lazy' />

                    <div className="orbit orbit1">
                        <span className="dot blue"></span>
                    </div>

                    <div className="orbit orbit2">
                        <span className="dot pink"></span>
                    </div>

                    <div className="orbit orbit3">
                        <span className="dot white"></span>
                    </div>

                    <div className="orbit orbit4">
                        <span className="dot navy"></span>
                    </div>

                </div>

                <h2>Gojra Running Club</h2>

                <p>Your Only Limit Is You</p>

            </div>
        </div>
    )
}

export default Loader
