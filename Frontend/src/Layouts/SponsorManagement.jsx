import { useMemo, useState, useEffect } from "react";
import {
    FaHandshake,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch,
    FaPlus,
    FaEdit,
    FaTrash,
    FaFilePdf,
    FaFileExcel,
} from "react-icons/fa";
import SponsorForm from "../Components/SponsorForm";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import api from "../api/axiosSponsor.js";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function SponsorManagement() {
    const colors = {
        primary: "#1B2F51",
        secondary: "#2BC4DA",
        accent: "#ED2974",
        white: "#FFFFFF",
        background: "#F4F7FB",
        border: "#E5E7EB",
    };
    const exportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Gojra Running Club", 14, 15);

        doc.setFontSize(12);
        doc.text("Sponsors List", 14, 24);

        autoTable(doc, {
            startY: 32,
            head: [["Sponsor", "Category", "Website", "Status"]],
            body: sponsors.map((sponsor) => [
                sponsor.name,
                sponsor.category,
                sponsor.website,
                sponsor.isActive ? "Active" : "Inactive",
            ]),
        });

        doc.save("Sponsors.pdf");
    };
    const exportExcel = () => {
        const data = sponsors.map((sponsor) => ({
            Sponsor: sponsor.name,
            Category: sponsor.category,
            Website: sponsor.website,
            Status: sponsor.isActive ? "Active" : "Inactive",
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);

        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Sponsors"
        );

        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });

        const file = new Blob([excelBuffer], {
            type: "application/octet-stream",
        });

        saveAs(file, "Sponsors.xlsx");
    };
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [selectedSponsor, setSelectedSponsor] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sponsors, setSponsors] = useState([]);

    const filteredSponsors = useMemo(() => {
        return sponsors.filter((sponsor) => {
            const matchSearch =
                sponsor.name.toLowerCase().includes(search.toLowerCase()) ||
                sponsor.category.toLowerCase().includes(search.toLowerCase());

            const matchFilter =
                filter === "All"
                    ? true
                    : filter === "Active"
                        ? sponsor.isActive
                        : !sponsor.isActive;

            return matchSearch && matchFilter;
        });
    }, [search, filter, sponsors]);

    const total = sponsors.length;
    const active = sponsors.filter((s) => s.isActive).length;
    const inactive = total - active;

    const getSponsors = async () => {

        try {

            setLoading(true);

            const { data } = await api.get("/sponsors");

            setSponsors(data);

        } catch (err) {

            console.log(err);

            toast.error("Failed to load sponsors");

        } finally {

            setLoading(false);

        }

    };
    const deleteSponsor = async (id) => {
        const result = await Swal.fire({

            title: "Delete Sponsor?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true

        });
        if (!result.isConfirmed)
            return;

        try {
            await api.delete(`/sponsors/${id}`);
            toast.success("Sponsor deleted");
            getSponsors();
        }
        catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {

        getSponsors();

    }, []);

    return (
        <div
            style={{
                background: colors.background,
                minHeight: "100vh",
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
                            margin: 0,
                            color: colors.primary,
                        }}
                    >
                        Sponsor Management
                    </h2>

                    <p
                        style={{
                            color: "#666",
                            marginTop: 5,
                        }}
                    >
                        Manage all club sponsors.
                    </p>
                </div>

                <button
                    style={{
                        background: colors.accent,
                        color: colors.white,
                        border: "none",
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        fontWeight: 600,
                        padding: "12px 20px",
                    }}
                    onClick={() => {
                        setSelectedSponsor(null);   // Add mode
                        setShowForm(true)
                    }}
                >
                    <FaPlus />
                    Add Sponsor
                </button>
            </div>

            {/* Statistics */}

            <div
                style={{
                    display: "flex",
                    gap: 20,
                    marginBottom: 30,
                }}
            >
                <StatCard
                    icon={<FaHandshake />}
                    title="Total Sponsors"
                    value={total}
                    color={colors.primary}
                />

                <StatCard
                    icon={<FaCheckCircle />}
                    title="Active Sponsors"
                    value={active}
                    color={colors.secondary}
                />

                <StatCard
                    icon={<FaTimesCircle />}
                    title="Inactive Sponsors"
                    value={inactive}
                    color={colors.accent}
                />
            </div>

            {/* Search & Filter */}

            <div
                style={{
                    background: colors.white,
                    borderRadius: 10,
                    padding: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20,
                }}
            >
                <div
                    style={{
                        width: 350,
                        display: "flex",
                        border: `1px solid ${colors.border}`,
                        borderRadius: 8,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            width: 45,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: colors.primary,
                        }}
                    >
                        <FaSearch />
                    </div>

                    <input
                        placeholder="Search sponsors..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            flex: 1,
                            border: "none",
                            outline: "none",
                            padding: 12,
                        }}
                    />
                </div>

                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    style={{
                        width: 170,
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

            {/* Table */}


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
            <div
                style={{
                    background: colors.white,
                    borderRadius: 10,
                    overflow: "hidden",
                    boxShadow: "0 5px 10px rgba(0,0,0,.08)",
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
                            <th style={th}>Logo</th>
                            <th style={th}>Sponsor Name</th>
                            <th style={th}>Category</th>
                            <th style={th}>Website</th>
                            <th style={th}>Status</th>
                            <th style={th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan="6" style={{ textAlign: "center", padding: 30 }}>
                                    Loading sponsors...
                                </td>
                            </tr>
                        )}
                        {filteredSponsors.map((sponsor) => (
                            <tr key={sponsor._id || sponsor.id}>
                                <td style={td}>
                                    <img
                                        src={
                                            sponsor.logo
                                                ? `${import.meta.env.VITE_API_URL}/uploads/${sponsor.logo}`
                                                : "https://via.placeholder.com/55"
                                        }
                                        alt={sponsor.name}
                                        style={{
                                            width: 55,
                                            height: 55,
                                            borderRadius: 8,
                                            objectFit: "cover",
                                        }}
                                    />
                                </td>

                                <td style={td}>{sponsor.name}</td>

                                <td style={td}>{sponsor.category}</td>

                                <td style={td}>

                                    <a
                                        href={sponsor.website}
                                        target="_blank"
                                        rel="noreferrer"
                                        style={{
                                            color: colors.secondary,
                                            textDecoration: "none"
                                        }}
                                    >

                                        {sponsor.website}

                                    </a>

                                </td>

                                <td style={td}>
                                    <span
                                        style={{
                                            background: sponsor.isActive
                                                ? "#D7F8EA"
                                                : "#FFE4E4",
                                            color: sponsor.isActive
                                                ? "#118B50"
                                                : "#C62828",
                                            padding: "6px 12px",
                                            borderRadius: 20,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {sponsor.isActive ? "Active" : "Inactive"}
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
                                                width: 38,
                                                height: 38,
                                                borderRadius: 8,
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: 0,
                                            }}
                                            onClick={() => {
                                                setSelectedSponsor(sponsor);
                                                setShowForm(true);
                                            }}
                                        >
                                            <FaEdit size={18}/>
                                        </button>

                                        <button
                                            style={{
                                                background: colors.accent,
                                                color: colors.white,
                                                border: "none",
                                                width: 38,
                                                height: 38,
                                                borderRadius: 8,
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                padding: 0,
                                            }}
                                            onClick={() => deleteSponsor(sponsor._id)}
                                        >
                                            <FaTrash size={18}/>
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}

                        {!loading && filteredSponsors.length === 0 && (
                            <tr>
                                <td colSpan={6} style={{ padding: 30, textAlign: "center" }}>
                                    No sponsors found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {
                showForm && (
                    <SponsorForm
                        sponsor={selectedSponsor}
                        onClose={() => setShowForm(false)}
                        onSave={async (form) => {

                            const formData = new FormData();

                            formData.append("name", form.sponsorName);
                            formData.append("category", form.category);
                            formData.append("website", form.website);
                            formData.append("collaboration", form.collaboration);
                            formData.append("description", form.description);
                            formData.append("isActive", form.isActive);

                            if (form.logo) {
                                formData.append("logo", form.logo);
                            }

                            if (selectedSponsor) {

                                await api.put(
                                    `/sponsors/${selectedSponsor._id}`,
                                    formData,
                                    {
                                        headers: {
                                            "Content-Type": "multipart/form-data"
                                        }
                                    }
                                );

                            } else {

                                await api.post(
                                    "/sponsors",
                                    formData,
                                    {
                                        headers: {
                                            "Content-Type": "multipart/form-data"
                                        }
                                    }
                                );

                            }

                            getSponsors();

                            setShowForm(false);

                        }}
                    />
                )
            }
        </div>

    );
}

function StatCard({ icon, title, value, color }) {
    return (
        <div
            style={{
                flex: 1,
                background: "#FFFFFF",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 4px 8px rgba(0,0,0,.08)",
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
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: 22,
                    marginBottom: 15,
                }}
            >
                {icon}
            </div>

            <div
                style={{
                    color: "#666",
                    marginBottom: 5,
                }}
            >
                {title}
            </div>

            <h2
                style={{
                    margin: 0,
                    color,
                }}
            >
                {value}
            </h2>
        </div>
    );
}

const th = {
    textAlign: "left",
    padding: 16,
};

const td = {
    padding: 16,
    borderBottom: "1px solid #ECECEC",
};