import React from 'react'
import { NavLink } from 'react-router-dom'
import J from '../assets/J.webp'
import grc from '../assets/grc-logo.webp'
import ARY from '../assets/ary.webp'
import GT from '../assets/gatorade-logo.webp'

const Sponsors = () => {
    return (
        <section className='Sponsors'>
            <div>
                <h4>Sponsor</h4>
                <NavLink to='https://www.junaidjamshed.com/' target='_blank'><img src={J} alt="J. logo" width={100} /></NavLink>
            </div>

            <div>
                <h4>Title Sponsor</h4>
                <NavLink to='https://www.junaidjamshed.com/' target='_blank'><img src={grc} alt="J. logo" width={100} /></NavLink>
            </div>
            <div>
                <h4>Collaboration</h4>
                <NavLink to='https://www.junaidjamshed.com/' target='_blank'><img src={J} alt="J. logo" width={100} /></NavLink>
            </div>
            <div>
                <h4>Supporting Partners</h4>
                <NavLink to='https://www.junaidjamshed.com/' target='_blank'><img src={J} alt="J. logo" width={100} /></NavLink>
            </div>
            <div>
                <h4>Nutrition & Hydration Partners</h4>
                <NavLink to='https://www.junaidjamshed.com/' target='_blank'><img src={GT} alt="J. logo" width={100} /></NavLink>
            </div>
            <div>
                <h4>Media Partners</h4>
                <NavLink to='https://www.junaidjamshed.com/' target='_blank'><img src={ARY} alt="J. logo" width={100} /></NavLink>
            </div>
            <div>
                <h4>Medical Partners</h4>
                <NavLink to='https://www.junaidjamshed.com/' target='_blank'><img src={J} alt="J. logo" width={100} /></NavLink>
            </div>
            <div>
                <h4>Community Partners</h4>
                <NavLink to='https://www.junaidjamshed.com/' target='_blank'><img src={J} alt="J. logo" width={100} /></NavLink>
            </div>
        </section>
    )
}

export default Sponsors
