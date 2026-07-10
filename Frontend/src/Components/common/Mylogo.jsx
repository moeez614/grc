import React from 'react'
import ary from '../../assets/ary.webp'
import grc from '../../assets/grc-logo.webp'
import gt from '../../assets/gatorade-logo.webp'
import j from '../../assets/J.webp'
import { NavLink } from 'react-router-dom'
const Mylogo = () => {
    const titleSponsor = [
            { id: 1, src: ary, alt: "ary"},
        ];
    
        const sponsors = [
            { id: 1, src: grc, alt: "" },
            { id: 2, src: gt, alt: "" },
            { id: 3, src: j, alt: "" , url: "https://www.junaidjamshed.com/" },
            { id: 4, src: ary, alt: "" },
        ];
    
        const partners = [
            { id: 1, logo: "/sponsors/logo6.png" },
            { id: 2, logo: "/sponsors/logo7.png" },
            { id: 3, logo: "/sponsors/logo8.png" },
        ];
    
        const supportingPartners = [
            { id: 1, logo: "/sponsors/logo9.png" },
            { id: 2, logo: "/sponsors/logo10.png" },
            { id: 3, logo: "/sponsors/logo11.png" },
            { id: 4, logo: "/sponsors/logo12.png" },
        ];
    
        const renderCategory = (title, data) => (
            <section className="category">
                <h2>{title}</h2>
    
                <div className="sponsor-grid">
                    {data.map((item) => (
                        <div className="sponsor-card" key={item.id}>
                            <NavLink to={item?.url} target="_blank">
                            <img src={item.src} alt="Sponsor Logo" loading='lazy' />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </section>
        );
  return (
    <div>
      <div className="sponsor-page aliceblue" >

                    <div className="section-title">
                        <h2>Sponsorship Categories</h2>
                        <p>
                            We proudly recognize every organization contributing to the success
                            of Gojra Running Club.
                        </p>
                    </div>
                    {renderCategory("Title Sponsor", titleSponsor)}

                    {renderCategory("Sponsors", sponsors)}

                    {renderCategory("Partners / Collaboration Partners", partners)}

                    {renderCategory("Supporting Partners", supportingPartners)}
                </div>
    </div>
  )
}

export default Mylogo
