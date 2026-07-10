import React from 'react'
import Navbar from '../Components/Navbar'
import { useState } from 'react';
import Footer from '../Components/common/Footer'
import August from '../assets/august.webp'

const runners = [
    {
        pos: 1,
        bib: 1001,
        pid: "GRC-001",
        name: "Ali Hassan",
        gender: "M",
        age: 24,
        category: "10 KM",
        club: "GRC",
        gun: "37:45",
        net: "37:15",
        pace: "3:43",
        genderRank: 1,
        categoryRank: 1,
        status: "Finished",
    },
    {
        pos: 2,
        bib: 1045,
        pid: "GRC-002",
        name: "Ahmad Raza",
        gender: "M",
        age: 28,
        category: "10 KM",
        club: "GRC",
        gun: "38:20",
        net: "38:02",
        pace: "3:48",
        genderRank: 2,
        categoryRank: 2,
        status: "Finished",
    },
    {
        pos: 3,
        bib: 1017,
        pid: "GRC-003",
        name: "Usman Ali",
        gender: "M",
        age: 30,
        category: "10 KM",
        club: "GRC",
        gun: "39:30",
        net: "39:11",
        pace: "3:55",
        genderRank: 3,
        categoryRank: 3,
        status: "Finished",
    },
    {
        pos: 4,
        bib: 1091,
        pid: "GRC-011",
        name: "Moeez Ali",
        gender: "M",
        age: 21,
        category: "10 KM",
        club: "GRC",
        gun: "39:34",
        net: "39:19",
        pace: "3:59",
        genderRank: 4,
        categoryRank: 4,
        status: "Finished",
    },
];
const ResultRun = () => {
    const [search, setSearch] = useState("");

    const filtered = runners.filter(
        (r) =>
            r.name.toLowerCase().includes(search.toLowerCase()) ||
            r.pid.toLowerCase().includes(search.toLowerCase()) ||
            r.bib.toString().includes(search)
    );
    return (
        <div>
            <Navbar />
            <div className="results aliceblue">

                {/* <section className="hero">
                    <h1>Independence Day Run 2026</h1>
                    <p>Official Race Results - 10 KM</p>
                </section> */}
                <img src={August} alt="banner" className='result-banner' />

                <section className="stats">
                    <div className="card">
                        <h2>500+</h2>
                        <p>Total Participants</p>
                    </div>

                    <div className="card">
                        <h2>478</h2>
                        <p>Finishers</p>
                    </div>

                    <div className="card">
                        <h2>47:15</h2>
                        <p>Average Time</p>
                    </div>

                    <div className="card">
                        <h2>37:15</h2>
                        <p>Fastest Runner</p>
                    </div>
                </section>
                <section className="my-edit card">
                    <h3>A Monumental Achievement in Gojra Running</h3>
                    <p>On Sunday, August 14th, 2026, Gojra Running Club proudly presented the second edition of the Adam's Lahore Heritage Run, building upon the tremendous success of our inaugural event. This year's race witnessed an incredible turnout of over 850 passionate runners from across Pakistan and neighboring countries, all united by their love for running and appreciation for Lahore's magnificent cultural heritage.
                        <br />
                        Starting and finishing at the iconic Badshahi Mosque, participants embarked on a meticulously designed 7K route that showcased the architectural splendor of Lahore's Walled City. The course featured breathtaking views of the Wazir Khan Mosque, winding through centuries-old streets that echo with the stories of Mughal emperors and legendary poets. With professional timing, comprehensive safety measures, and exceptional post-race facilities, we delivered an unforgettable experience that exceeded all expectations.</p>
                </section>

                <section className="filters">

                    <input
                        type="text"
                        placeholder="Search by Name, Bib or Participant ID"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select>
                        <option>All Events</option>
                        <option>Independence Run</option>
                    </select>

                    <select>
                        <option>All Categories</option>
                        <option>5 KM</option>
                        <option>10 KM</option>
                    </select>

                    <select>
                        <option>All Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                    </select>
                </section>

                <section className="table-container">

                    <table>
                        <thead>
                            <tr>
                                <th>Pos</th>
                                <th>Bib</th>
                                <th>PID</th>
                                <th>Name</th>
                                <th>Gen</th>
                                <th>Age</th>
                                <th>Category</th>
                                <th>Club</th>
                                <th>Gun</th>
                                <th>Net</th>
                                <th>Pace</th>
                                <th>G.Rank</th>
                                <th>C.Rank</th>
                                <th>Status</th>
                                <th>Certificate</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filtered.map((runner) => (
                                <tr key={runner.pid}>
                                    <td>{runner.pos}</td>
                                    <td>{runner.bib}</td>
                                    <td>{runner.pid}</td>
                                    <td>{runner.name}</td>
                                    <td>{runner.gender}</td>
                                    <td>{runner.age}</td>
                                    <td>{runner.category}</td>
                                    <td>{runner.club}</td>
                                    <td>{runner.gun}</td>
                                    <td>{runner.net}</td>
                                    <td>{runner.pace}</td>
                                    <td>{runner.genderRank}</td>
                                    <td>{runner.categoryRank}</td>
                                    <td>{runner.status}</td>
                                    <td>
                                        <button>PDF</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="awards">
                    <h2>🏆 Celebrating Our Champions</h2>

                    <div className="podium">

                        <div className="award second">
                            <h3>🥈</h3>
                            <p>Runner-up</p>
                            <span>Ahmad Raza</span>
                        </div>

                        <div className="award first">
                            <h3>🥇</h3>
                            <p>Winner</p>
                            <span>Ali Hassan</span>
                        </div>

                        <div className="award third">
                            <h3>🥉</h3>
                            <p>Third</p>
                            <span>Usman Ali</span>
                        </div>

                    </div>

                    <div className="special-awards">
                        <div>🏆 Best Female Runner</div>
                        <div>🏆 Best Veteran Runner</div>
                        <div>🏆 Best Club Team</div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    )
}

export default ResultRun
