import { useMemo, useState, useEffect } from "react";
import WeeklyEventForm from "../Components/WeeklyEventForm";
import {
    FaFilePdf,
    FaFileExcel,
    FaRunning,
    FaCheckCircle,
    FaClock,
    FaTimesCircle,
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaFilter,
} from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import weeklyApi from "../api/weeklyEventApi.js";


export default function WeeklyEvents() {
    const colors = {
        primary: "#1B2F51",
        secondary: "#2BC4DA",
        accent: "#ED2974",
        white: "#FFFFFF",
        bg: "#F4F7FB",
    };

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);

    const [editingEvent, setEditingEvent] = useState(null);
    const [events, setEvents] = useState([]);

    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchSearch = event.name
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchFilter =
                filter === "All" || event.status === filter;

            return matchSearch && matchFilter;
        });
    }, [search, filter, events]);

    const [stats, setStats] = useState({
        total: 0,
        completed: 0,
        upcoming: 0,
        cancelled: 0
    });


    const fetchStats = async () => {

        try {

            const res = await weeklyApi.get("/stats");

            setStats(res.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    const cardStyle = (color) => ({
        background: colors.white,
        borderRadius: "15px",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        borderLeft: `6px solid ${color}`,
    });

    useEffect(() => {

        fetchEvents();
        fetchStats();

    }, []);


    const fetchEvents = async () => {

        try {

            const res = await weeklyApi.get("/");

            setEvents(res.data);

        }
        catch (error) {

            console.log(error);

        }

    };
    // const handleSave = async (data) => {

    //     try {

    //         if (editingEvent) {

    //             await weeklyApi.put(
    //                 `/${editingEvent._id}`,
    //                 data
    //             );

    //         }
    //         else {

    //             await weeklyApi.post(
    //                 "/",
    //                 data
    //             );

    //         }


    //         fetchEvents();
    //         fetchStats();

    //         setShowForm(false);

    //     }
    //     catch (error) {

    //         console.log(error);

    //     }

    // };

    const handleSave = async (data) => {

        try {

            const formData = new FormData();


            if (data.banner?.[0]) {
                formData.append(
                    "banner",
                    data.banner[0]
                );
            }


            formData.append(
                "name",
                data.name
            );

            formData.append(
                "date",
                data.date
            );

            formData.append(
                "time",
                data.time
            );

            formData.append(
                "location",
                data.location
            );

            formData.append(
                "distance",
                data.distance
            );

            formData.append(
                "status",
                data.status
            );

            formData.append(
                "description",
                data.description
            );



            if (editingEvent) {

                await weeklyApi.put(
                    `/${editingEvent._id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

            }
            else {

                await weeklyApi.post(
                    "/",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );

            }


            fetchEvents();
            fetchStats();

            setShowForm(false);
            setEditingEvent(null);


        }
        catch (error) {

            console.log(error);

        }

    };
    const deleteEvent = async (id) => {

        try {

            await weeklyApi.delete(
                `/${id}`
            );


            fetchEvents();
            fetchStats();


        }
        catch (error) {

            console.log(error);

        }

    };
    const exportPDF = () => {

        const doc = new jsPDF();

        doc.text("Weekly Events Report", 14, 15);

        autoTable(doc, {
            startY: 25,

            head: [
                [
                    "Event Name",
                    "Date",
                    "Time",
                    "Location",
                    "Distance",
                    "Status"
                ]
            ],

            body: filteredEvents.map((event) => [
                event.name,
                event.date,
                event.time,
                event.location,
                event.distance,
                event.status,
            ]),
        });

        doc.save("weekly-events.pdf");
    };
    const exportExcel = () => {

        const worksheet = XLSX.utils.json_to_sheet(
            filteredEvents.map((event) => ({
                "Event Name": event.name,
                "Date": event.date,
                "Time": event.time,
                "Location": event.location,
                "Distance": event.distance,
                "Status": event.status,
            }))
        );


        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Weekly Events"
        );


        XLSX.writeFile(
            workbook,
            "weekly-events.xlsx"
        );

    };
    return (
        <div
            style={{
                background: colors.bg,
                minHeight: "100vh",
                padding: "30px",
            }}
        >
            {/* Heading */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px",
                    flexWrap: "wrap",
                    gap: "15px",
                }}
            >
                <div>
                    <h2
                        style={{
                            color: colors.primary,
                            margin: 0,
                            fontWeight: "700",
                        }}
                    >
                        Weekly Events Management
                    </h2>

                    <p style={{ color: "#666" }}>
                        Manage all weekly running events.
                    </p>
                </div>

                <button
                    style={{
                        background: colors.accent,
                        color: "#fff",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "600",
                    }}
                    onClick={() => {
                        setEditingEvent(null);
                        setShowForm(true);
                    }}
                >
                    <FaPlus />
                    Add Event
                </button>
            </div>

            {/* Stats */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: "20px",
                    marginBottom: "30px",
                }}
            >
                <div style={cardStyle(colors.secondary)}>
                    <div>
                        <h3>{stats.total}</h3>
                        <p>Total Events</p>
                    </div>

                    <FaRunning size={35} color={colors.secondary} />
                </div>

                <div style={cardStyle("green")}>
                    <div>
                        <h3>{stats.completed}</h3>
                        <p>Completed</p>
                    </div>

                    <FaCheckCircle size={35} color="green" />
                </div>

                <div style={cardStyle("#f39c12")}>
                    <div>
                        <h3>{stats.upcoming}</h3>
                        <p>Upcoming</p>
                    </div>

                    <FaClock size={35} color="#f39c12" />
                </div>

                <div style={cardStyle(colors.accent)}>
                    <div>
                        <h3>{stats.cancelled}</h3>
                        <p>Cancelled</p>
                    </div>

                    <FaTimesCircle size={35} color={colors.accent} />
                </div>
            </div>

            {/* Search */}
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "25px",
                    flexWrap: "wrap",
                }}
            >
                {/* Search */}

                <div
                    style={{
                        flex: 1,
                        minWidth: "280px",
                        background: colors.white,
                        padding: "12px 15px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                    }}
                >
                    <FaSearch color={colors.primary} />

                    <input
                        type="text"
                        placeholder="Search event..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                        }}
                    />
                </div>

                {/* Filter */}

                <div
                    style={{
                        background: colors.white,
                        padding: "12px 15px",
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                    }}
                >
                    <FaFilter color={colors.primary} />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            cursor: "pointer",
                        }}
                    >
                        <option>All</option>
                        <option>Upcoming</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                    </select>
                </div>
            </div>
            {/* event exports file */}
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                }}
            >

                <button
                    onClick={exportPDF}
                    style={{
                        background: "#ED2974",
                        color: "#FFFFFF",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "600"
                    }}
                >
                    <FaFilePdf />
                    Export PDF
                </button>


                <button
                    onClick={exportExcel}
                    style={{
                        background: "#2BC4DA",
                        color: "#1B2F51",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontWeight: "600"
                    }}
                >
                    <FaFileExcel />
                    Export Excel
                </button>

            </div>
            {/* Events Table */}

            <div
                style={{
                    background: colors.white,
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 8px 20px rgba(0,0,0,.08)",
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                    }}
                >
                    <thead
                        style={{
                            background: colors.primary,
                            color: "#fff",
                        }}
                    >
                        <tr>
                            <th style={{ padding: "15px" }}>Event Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Distance</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredEvents.map((event) => (
                            <tr
                                key={event._id}
                                style={{
                                    textAlign: "center",
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                <td style={{ padding: "15px" }}>{event.name}</td>

                                <td>{new Date(event.date).toLocaleDateString("en-GB")}</td>

                                <td>{event.time}</td>
                                <td>{event.location}</td>

                                <td>{event.distance}</td>

                                <td>
                                    <span
                                        style={{
                                            padding: "6px 14px",
                                            borderRadius: "20px",
                                            color: "#fff",
                                            background:
                                                event.status === "Completed"
                                                    ? "green"
                                                    : event.status === "Upcoming"
                                                        ? "#f39c12"
                                                        : colors.accent,
                                        }}
                                    >
                                        {event.status}
                                    </span>
                                </td>

                                <td>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: "12px",
                                        }}
                                    >
                                        <button
                                            style={{
                                                background: colors.secondary,
                                                color: "#fff",
                                                border: "none",
                                                padding: "8px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                setEditingEvent(event);
                                                setShowForm(true);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            onClick={() => deleteEvent(event._id)}
                                            style={{
                                                background: colors.accent,
                                                color: "#fff",
                                                border: "none",
                                                padding: "8px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {filteredEvents.length === 0 && (
                            <tr>
                                <td colSpan="7" style={{ padding: "25px" }}>
                                    No events found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showForm && (
                <div className="modal">
                    <WeeklyEventForm
                        onSubmit={handleSave}
                        onCancel={() => setShowForm(false)}
                        defaultValues={editingEvent || {}}
                        isEdit={!!editingEvent}
                    />
                </div>
            )}
        </div>
    );
}
