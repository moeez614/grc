import { useMemo, useState, useEffect } from "react";
import {
    FaRunning,
    FaCheckCircle,
    FaSearch,
    FaCheck,
    FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../api/axios";



export default function Attendance() {
    const [events, setEvents] = useState([]);

    const [selectedEvent, setSelectedEvent] = useState(null);

    const [members, setMembers] = useState([]);
    const [search, setSearch] = useState("");
    const [saving, setSaving] = useState(false);
    const [memberFilter, setMemberFilter] = useState("active");

    const filteredMembers = useMemo(() => {

        return members.filter((member) => {

            const matchesSearch =
                member.name.toLowerCase().includes(search.toLowerCase()) ||
                member.memberId.toLowerCase().includes(search.toLowerCase()) ||
                member.email.toLowerCase().includes(search.toLowerCase());


            const matchesStatus =
                memberFilter === "all"
                    ? true
                    : memberFilter === "active"
                        ? member.isActive
                        : !member.isActive;


            return matchesSearch && matchesStatus;

        });

    }, [members, search, memberFilter]);
    const handleSelectAll = () => {
        setMembers((prev) =>
            prev.map((member) => ({
                ...member,
                checked: true,
            }))
        );
    };

    const handleUnselectAll = () => {
        setMembers((prev) =>
            prev.map((member) => ({
                ...member,
                checked: false,
            }))
        );
    };
    const handleMemberToggle = (_id) => {
        setMembers((prev) =>
            prev.map((member) =>
                member._id === _id
                    ? { ...member, checked: !member.checked }
                    : member
            )
        );
    };

    const handleSave = async () => {

        try {

            setSaving(true);


            const selectedMembers = members
                .filter(member => member.checked)
                .map(member => member._id);



            if (selectedMembers.length === 0) {

                toast.error("Please select at least one member");

                return;
            }



            const data = {

                eventId: selectedEvent._id,

                members: selectedMembers

            };


            await API.post(
                "/attendance",
                data
            );


            toast.success(
                "Attendance saved successfully"
            );


        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to save attendance"
            );


        } finally {

            setSaving(false);

        }

    };
    useEffect(() => {

        const fetchData = async () => {

            try {

                const eventRes = await API.get(
                    "/weekly-events"
                );
                setEvents(eventRes.data);
                if (eventRes.data.length > 0) {
                    setSelectedEvent(eventRes.data[0]);
                }
                const memberRes = await API.get(
                    "/members"
                );


                setMembers(
                    memberRes.data.map(member => ({
                        ...member,
                        checked: false
                    }))
                );
            }
            catch (error) {

                console.log(error);

                toast.error(
                    "Failed to load attendance data"
                );

            }

        };


        fetchData();


    }, []);

    return (
        <div
            style={{
                background: "#f5f8fb",
                minHeight: "100vh",
                padding: "40px",
            }}
        >
            <div
                style={{
                    maxWidth: "800px",
                    margin: "auto",
                    background: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 8px 25px rgba(0,0,0,.08)",
                    overflow: "hidden",
                }}
            >
                {/* Header */}

                <div
                    style={{
                        background: "#1B2F51",
                        color: "#fff",
                        padding: "20px 30px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                    }}
                >
                    <FaRunning size={28} color="#2BC4DA" />

                    <div>
                        <h2 style={{ margin: 0 }}>Attendance Management</h2>
                        <p
                            style={{
                                margin: "5px 0 0",
                                opacity: ".8",
                                fontSize: "14px",
                            }}
                        >
                            Mark attendance for completed events
                        </p>
                    </div>
                </div>

                <div style={{ padding: "30px" }}>
                    {/* Event */}

                    <h3
                        style={{
                            color: "#1B2F51",
                            marginBottom: "15px",
                        }}
                    >
                        Select Event
                    </h3>

                    <select
                        value={selectedEvent?._id || ""}
                        onChange={(e) => {
                            const event = events.find(
                                (item) => item._id === e.target.value
                            );
                            setSelectedEvent(event);
                        }}
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "10px",
                            border: "2px solid #2BC4DA",
                            outline: "none",
                            fontSize: "16px",
                        }}
                    >
                        {events.map((event) => (
                            <option key={event._id} value={event._id}
                                style={{
                                    background: "#FFFFFF",
                                    color: "#1B2F51",
                                    fontWeight: "600",
                                }}>
                                {event.name}
                            </option>
                        ))}
                    </select>

                    {/* Distance */}

                    <div
                        style={{
                            marginTop: "25px",
                            background: "#eefcff",
                            borderLeft: "5px solid #2BC4DA",
                            padding: "15px",
                            borderRadius: "10px",
                        }}
                    >
                        <strong
                            style={{
                                color: "#1B2F51",
                            }}
                        >
                            Distance
                        </strong>

                        <h2
                            style={{
                                color: "#ED2974",
                                marginTop: "8px",
                            }}
                        >
                            {selectedEvent?.distance} KM
                        </h2>
                    </div>

                    {/* Members */}

                    <h3
                        style={{
                            color: "#1B2F51",
                            marginTop: "35px",
                            marginBottom: "15px",
                        }}
                    >
                        Active Members
                    </h3>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 20,
                            gap: 15,
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                border: "2px solid #2BC4DA",
                                borderRadius: 10,
                                padding: "10px 15px",
                                flex: 1,
                            }}
                        >
                            <FaSearch color="#1B2F51" />

                            <input
                                placeholder="Search member..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                style={{
                                    border: "none",
                                    outline: "none",
                                    marginLeft: 10,
                                    width: "100%",
                                }}
                            />
                        </div>

                        <select
                            value={memberFilter}
                            onChange={(e) => setMemberFilter(e.target.value)}
                            style={{
                                padding: "10px",
                                borderRadius: "8px",
                                border: "2px solid #2BC4DA",
                                color: "#1B2F51",
                                fontWeight: "600"
                            }}
                        >
                            <option value="active">
                                Active Members
                            </option>

                            <option value="inactive">
                                Inactive Members
                            </option>

                            <option value="all">
                                All Members
                            </option>

                        </select>

                        <button
                            onClick={() => {

                                const allSelected = filteredMembers.every(
                                    member => member.checked
                                );


                                setMembers(prev =>
                                    prev.map(member => {

                                        const isFilteredMember = filteredMembers.some(
                                            item => item._id === member._id
                                        );


                                        if (isFilteredMember) {

                                            return {
                                                ...member,
                                                checked: !allSelected
                                            };

                                        }


                                        return member;

                                    })
                                );

                            }}
                            style={{
                                background: "#2BC4DA",
                                color: "#fff",
                                border: "none",
                                padding: "12px 18px",
                                borderRadius: 8,
                                cursor: "pointer",
                            }}
                        >
                            <FaCheck />
                            {
                                filteredMembers.length > 0 &&
                                    filteredMembers.every(member => member.checked)
                                    ? "Unselect All"
                                    : "Select All"
                            }
                        </button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",
                            marginTop: "20px",
                        }}
                    >
                        {filteredMembers.map((member) => (
                            <div
                                key={member._id}
                                onClick={() => handleMemberToggle(member._id)}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "15px 20px",
                                    borderRadius: "12px",
                                    background: member.checked ? "#eefcff" : "#fff",
                                    border: member.checked
                                        ? "2px solid #2BC4DA"
                                        : "1px solid #ddd",
                                    boxShadow: "0 3px 8px rgba(0,0,0,.05)",
                                    cursor: "pointer",
                                    transition: "0.2s ease",
                                }}
                            >
                                {/* Left */}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 15,
                                    }}
                                >
                                    <img
                                        src={
                                            `${import.meta.env.VITE_API_URL}/${member.photo}`
                                        }
                                        alt={member.name}
                                        style={{
                                            width: 55,
                                            height: 55,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />

                                    <div>
                                        <h4
                                            style={{
                                                margin: 0,
                                                color: "#1B2F51",
                                            }}
                                        >
                                            {member.name}
                                        </h4>

                                        <p
                                            style={{
                                                margin: "4px 0",
                                                color: "#666",
                                                fontSize: 14,
                                            }}
                                        >
                                            {member.memberId}
                                        </p>
                                    </div>
                                </div>

                                {/* Right */}
                                <input
                                    type="checkbox"
                                    checked={member.checked}
                                    onChange={() => handleMemberToggle(member._id)}
                                    onClick={(e) => e.stopPropagation()}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        accentColor: "#ED2974",
                                    }}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Save Button */}
                    <div
                        style={{
                            marginTop: 20,
                            display: "flex",
                            justifyContent: "space-between",
                            background: "#eefcff",
                            padding: 15,
                            borderRadius: 10,
                            fontWeight: 600,
                            color: "#1B2F51",
                        }}
                    >
                        <span>Total Members: {members.length}</span>

                        <span>
                            Selected: {members.filter((m) => m.checked).length}
                        </span>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        style={{
                            marginTop: 35,
                            width: "100%",
                            background: saving ? "#b0b0b0" : "#ED2974",
                            color: "#fff",
                            border: "none",
                            padding: "16px",
                            borderRadius: "12px",
                            fontSize: "17px",
                            fontWeight: "bold",
                            cursor: saving ? "not-allowed" : "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        {saving ? (
                            <>
                                <div className="spinner" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <FaCheckCircle />
                                SAVE ATTENDANCE
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}