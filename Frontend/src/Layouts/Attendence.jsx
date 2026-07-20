import { useMemo, useState } from "react";
import {
    FaRunning,
    FaCheckCircle,
    FaSearch,
    FaCheck,
    FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

const events = [
    {
        id: 1,
        name: "City Run",
        distance: "10 KM",
    },
    {
        id: 2,
        name: "Night Run",
        distance: "5 KM",
    },
    {
        id: 3,
        name: "Sunday Long Run",
        distance: "21 KM",
    },
];
const initialMembers = [
    {
        id: 1,
        memberId: "GRC001",
        name: "Ali",
        email: "ali@gmail.com",
        photo: "https://i.pravatar.cc/100?img=1",
        checked: true,
    },
    {
        id: 2,
        memberId: "GRC002",
        name: "Ahmed",
        email: "ahmed@gmail.com",
        photo: "https://i.pravatar.cc/100?img=2",
        checked: true,
    },
    {
        id: 3,
        memberId: "GRC003",
        name: "Usman",
        email: "usman@gmail.com",
        photo: "https://i.pravatar.cc/100?img=3",
        checked: false,
    },
    {
        id: 4,
        memberId: "GRC004",
        name: "Hassan",
        email: "hassan@gmail.com",
        photo: "https://i.pravatar.cc/100?img=4",
        checked: true,
    },
];

export default function Attendance() {
    const [selectedEvent, setSelectedEvent] = useState(events[0]);
    const [members, setMembers] = useState(initialMembers);
    const [search, setSearch] = useState("");
    const [saving, setSaving] = useState(false);
    const filteredMembers = useMemo(() => {
        return members.filter((member) =>
            member.name.toLowerCase().includes(search.toLowerCase()) ||
            member.memberId.toLowerCase().includes(search.toLowerCase()) ||
            member.email.toLowerCase().includes(search.toLowerCase())
        );
    }, [members, search]);
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
    const handleMemberToggle = (id) => {
        setMembers((prev) =>
            prev.map((member) =>
                member.id === id
                    ? { ...member, checked: !member.checked }
                    : member
            )
        );
    };

    const handleSave = async () => {
        try {
            setSaving(true);

            const attendance = members.filter((m) => m.checked);

            console.log(attendance);

            // await axios.post(...)

            await new Promise((resolve) => setTimeout(resolve, 2000));

            toast.success("Attendance saved successfully!");
        } catch (err) {
            toast.error("Failed to save attendance");
        } finally {
            setSaving(false);
        }
    };

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
                        value={selectedEvent.id}
                        onChange={(e) => {
                            const event = events.find(
                                (item) => item.id === Number(e.target.value)
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
                            <option key={event.id} value={event.id}>
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
                            {selectedEvent.distance}
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

                        <button
                            onClick={handleSelectAll}
                            style={{
                                background: "#2BC4DA",
                                color: "#fff",
                                border: "none",
                                padding: "12px 18px",
                                borderRadius: 8,
                                cursor: "pointer",
                            }}
                        >
                            <FaCheck /> Select All
                        </button>

                        <button
                            onClick={handleUnselectAll}
                            style={{
                                background: "#ED2974",
                                color: "#fff",
                                border: "none",
                                padding: "12px 18px",
                                borderRadius: 8,
                                cursor: "pointer",
                            }}
                        >
                            <FaTimes /> Unselect
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
            key={member.id}
            onClick={() => handleMemberToggle(member.id)}
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
                    src={member.photo}
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
                onChange={() => handleMemberToggle(member.id)}
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