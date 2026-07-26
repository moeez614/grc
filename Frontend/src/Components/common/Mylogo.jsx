import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import API from "../../api/axios";
const Mylogo = () => {
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        const fetchSponsors = async () => {
            try {
                const res = await API.get("/sponsors");
                setSponsors(res.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchSponsors();
    }, []);


    const categories = [
        "Title Sponsor",
        "Sponsor",
        "Community Partner",
        "Nutrition Partner",
        "Collaboration",
        "Medical Partner",
        "Media Partner",
        "Supporting Partner",
    ];
    const renderCategory = (title, data) => {
        if (data.length === 0) return null;

        return (
            <section className="category" key={title}>
                <h2>{title}</h2>

                <div className="sponsor-grid">
                    {data.map((item) => (
                        <div className="sponsor-card" key={item._id}>
                            <NavLink
                                to={item.website || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/uploads/${item.logo}`}
                                    alt={item.name}
                                    loading="lazy"
                                />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </section>
        );
    };
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
                {categories.map((category) =>
                    renderCategory(
                        category,
                        sponsors.filter((item) => item.category === category)
                    )
                )}
            </div>
        </div>
    )
}

export default Mylogo
