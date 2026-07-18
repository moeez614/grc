
import { useMemo, useState, useEffect } from "react";
import {
    FaUsers,
    FaUserCheck,
    FaUserTimes,
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
} from "react-icons/fa";
import MemberModal from '../Components/MemberModal'
import MemberActions from '../Components/MemberActions'
import axios from "axios";
import Swal from "sweetalert2";
export default function MemberManagement() {
    const API = `${import.meta.env.VITE_API_URL}/api/members`;
    const colors = {
        primary: "#1B2F51",
        secondary: "#2BC4DA",
        accent: "#ED2974",
        white: "#FFFFFF",
        bg: "#F5F7FB",
        border: "#E6E8EC",
    };
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [editMember, setEditMember] = useState(null);
    const [members, setMembers] = useState([]);
    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const membersPerPage = 5;

    const filteredMembers = useMemo(() => {

        const searchText = search.trim().toLowerCase();

        return members.filter((member) => {

            const matchesSearch =
                member.name?.toLowerCase().includes(searchText) ||
                member.title?.toLowerCase().includes(searchText) ||
                member.email?.toLowerCase().includes(searchText) ||
                member.memberId?.toLowerCase().includes(searchText);

            const matchesFilter =
                filter === "All"
                    ? true
                    : filter === "Active"
                        ? member.isActive
                        : !member.isActive;

            return matchesSearch && matchesFilter;

        });

    }, [members, search, filter]);

    const totalPages = Math.ceil(
        filteredMembers.length / membersPerPage
    );

    const currentMembers = filteredMembers.slice(
        (currentPage - 1) * membersPerPage,
        currentPage * membersPerPage
    );
    const total = members.length;
    const active = members.filter((m) => m.isActive).length;
    const inactive = total - active;

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Delete Member?",
            text: "This member will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ED2974",
            cancelButtonColor: "#6c757d",
            confirmButtonText: "Yes, Delete",
        });
        if (!result.isConfirmed) return;


        try {

            await axios.delete(
                `${API}/${id}`
            );


            setMembers(
                members.filter(
                    member => member._id !== id
                )
            );
            Swal.fire({
                icon: "success",
                title: "Deleted",
                text: "Member deleted successfully.",
                timer: 1500,
                showConfirmButton: false,
            });
        }
        catch (error) {

            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || "Delete failed",
            });

        }

    };
    const fetchMembers = async () => {

        try {

            const res = await axios.get(API);

            setMembers(res.data);

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchMembers();

    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [search, filter]);
    return (
        <div
            style={{
                minHeight: "100vh",
                background: colors.bg,
                padding: 25,
            }}
        >
            {/* Header */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 25,
                }}
            >
                <div>
                    <h2
                        style={{
                            color: colors.primary,
                            marginBottom: 5,
                        }}
                    >
                        Member Management
                    </h2>

                    <span style={{ color: "#666" }}>
                        Manage all club members.
                    </span>
                </div>

                <button
                    style={{
                        background: colors.accent,
                        color: colors.white,
                        border: "none",
                        borderRadius: 8,
                        padding: "12px 18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 600,
                    }}
                    onClick={() => {
                        setEditMember(null);
                        setShowModal(true);
                    }}
                >
                    <FaPlus />
                    Add Member
                </button>
            </div>

            {/* Statistics */}

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
                    gap: 20,
                    marginBottom: 30,
                }}
            >
                <StatCard
                    icon={<FaUsers />}
                    title="Total Members"
                    value={total}
                    color={colors.primary}
                />

                <StatCard
                    icon={<FaUserCheck />}
                    title="Active Members"
                    value={active}
                    color={colors.secondary}
                />

                <StatCard
                    icon={<FaUserTimes />}
                    title="Inactive Members"
                    value={inactive}
                    color={colors.accent}
                />
            </div>

            {/* Search */}

            <div
                style={{
                    background: colors.white,
                    padding: 20,
                    borderRadius: 12,
                    marginBottom: 20,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 15,
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        flex: 1,
                        minWidth: 250,
                        display: "flex",
                        alignItems: "center",
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            padding: "12px",
                            color: colors.primary,
                        }}
                    >
                        <FaSearch />
                    </div>

                    <input
                        type="text"
                        placeholder="Search by Name, Member ID, Email or Title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            padding: "12px",
                        }}
                    />
                </div>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        padding: 12,
                        borderRadius: 8,
                        border: `1px solid ${colors.border}`,
                    }}
                >
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                </select>
            </div>
            {/* download me */}
            <MemberActions

                members={members}
                onDelete={handleDelete}


            />
            {/* Table */}

            <div
                style={{
                    background: colors.white,
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 5px 12px rgba(0,0,0,.08)",
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
                            color: colors.white,
                        }}
                    >
                        <tr>
                            <th style={th}>Photo</th>
                            <th style={th}>Member ID</th>
                            <th style={th}>Name</th>
                            <th style={th}>Email</th>
                            <th style={th}>Title</th>
                            <th style={th}>Status</th>
                            <th style={th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentMembers.map((member) => (
                            <tr key={member._id}>
                                <td style={td}>
                                    <img
                                        src={
                                            member.photo
                                                ? `${import.meta.env.VITE_API_URL}/${member.photo}`
                                                : "https://via.placeholder.com/60"
                                        }
                                        alt=""
                                        style={{
                                            width: 55,
                                            height: 55,
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </td>
                                <td style={td}>
                                    {member.memberId}
                                </td>

                                <td style={td}>{member.name}</td>
                                <td style={td}>
                                    {member.email}
                                </td>

                                <td style={td}>{member.title}</td>

                                <td style={td}>
                                    <span
                                        style={{
                                            padding: "6px 12px",
                                            borderRadius: 20,
                                            background: member.isActive
                                                ? "#D9F9EE"
                                                : "#FFE3E3",
                                            color: member.isActive
                                                ? "#0E8B52"
                                                : "#C62828",
                                            fontWeight: 600,
                                        }}
                                    >
                                        {member.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>

                                <td style={td}>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: 10,
                                        }}
                                    >
                                        <button
                                            style={{
                                                background: colors.secondary,
                                                color: colors.white,
                                                border: "none",
                                                padding: 10,
                                                borderRadius: 8,
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                setEditMember(member);
                                                setShowModal(true);
                                            }}
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            style={{
                                                background: colors.accent,
                                                color: colors.white,
                                                border: "none",
                                                padding: 10,
                                                borderRadius: 8,
                                                cursor: "pointer",
                                            }}
                                            onClick={() => handleDelete(member._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {currentMembers.length === 0 && (
                            <tr>
                                <td
                                    colSpan={7}
                                    style={{
                                        textAlign: "center",
                                        padding: 35,
                                        color: "#777",
                                    }}
                                >
                                    No members found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 10,
                        padding: 20,
                    }}
                >
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            style={{
                                background:
                                    currentPage === i + 1
                                        ? colors.primary
                                        : "#fff",
                                color:
                                    currentPage === i + 1
                                        ? "#fff"
                                        : "#000",
                                border: "1px solid #ccc",
                                padding: "8px 14px",
                                cursor: "pointer",
                            }}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
            <MemberModal
                isOpen={showModal}

                onClose={() => {
                    setShowModal(false);
                    setEditMember(null);
                }}

                editMember={editMember}

                members={members}
                onSave={async (data) => {


                    try {


                        const formData = new FormData();


                        formData.append(
                            "name",
                            data.name
                        );
                        formData.append(
                            "email",
                            data.email
                        );


                        formData.append(
                            "memberId",
                            data.memberId
                        );

                        formData.append(
                            "title",
                            data.title
                        );


                        formData.append(
                            "isActive",
                            data.isActive
                        );


                        if (data.photo instanceof File) {

                            formData.append(
                                "photo",
                                data.photo
                            );

                        }



                        if (editMember) {
                            await axios.put(
                                `${API}/${editMember._id}`,
                                formData,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                }
                            );
                        }
                        else {
                            await axios.post(
                                API,
                                formData,
                                {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                }
                            );
                        }
                        fetchMembers();
                        setCurrentPage(1);
                        setShowModal(false);
                        setEditMember(null);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }}
            />

        </div>
    );
}

function StatCard({ icon, title, value, color }) {
    return (
        <div
            style={{
                background: "#FFFFFF",
                borderRadius: 12,
                padding: 22,
                boxShadow: "0 4px 10px rgba(0,0,0,.08)",
            }}
        >
            <div
                style={{
                    width: 55,
                    height: 55,
                    borderRadius: "50%",
                    background: color,
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    marginBottom: 15,
                }}
            >
                {icon}
            </div>

            <h4
                style={{
                    margin: 0,
                    color: "#666",
                }}
            >
                {title}
            </h4>

            <h2
                style={{
                    marginTop: 8,
                    color,
                }}
            >
                {value}
            </h2>
        </div>
    );
}

const th = {
    padding: 16,
    textAlign: "left",
};

const td = {
    padding: 16,
    borderBottom: "1px solid #ECECEC",
};