import React from 'react'
import Navbar from '../Components/Navbar'
import Verified from '../assets/verified.png'
const Members = () => {
  return (
    <div>
      <Navbar />
      <div className="runner-card">
        <div className="runner-image">
          <img
            src="https://i.pravatar.cc/200"
            alt="Runner"
          />
        </div>

        <div className="runner-info">
          <div>
            <h2>Muhammad Ali</h2>
            <img src={Verified} alt="Verified" title='Verfied' width="26px" />
          </div>
          <p>
            Member ID:
            <span> GRC-001</span>
          </p>

          <button>
            View Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default Members
