import { useState } from "react";
import { FaUpload, FaSave, FaTimes } from "react-icons/fa";

export default function SponsorForm({
    sponsor,
    onSave,
    onClose,
}) {
    const colors = {
        primary: "#1B2F51",
        secondary: "#2BC4DA",
        accent: "#ED2974",
        white: "#FFFFFF",
        background: "#F5F7FB",
        border: "#E5E7EB",
    };
    // const [form, setForm] = useState({
    //   sponsorName: "",
    //   category: "",
    //   website: "",
    //   collaboration: "",
    //   description: "",
    //   isActive: true,
    //   logo: null,
    // });
    const [form, setForm] = useState(
        sponsor
            ? {
                sponsorName: sponsor.name,
                category: sponsor.category,
                website: sponsor.website,
                collaboration: sponsor.collaboration || "",
                description: sponsor.description || "",
                isActive: sponsor.isActive,
                logo: sponsor.logo,
            }
            : {
                sponsorName: "",
                category: "",
                website: "",
                collaboration: "",
                description: "",
                isActive: true,
                logo: null,
            }
    );
    const [preview, setPreview] = useState(
    sponsor?.logo || ""
);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleLogo = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setForm({
            ...form,
            logo: file,
        });

        setPreview(URL.createObjectURL(file));
    };

   const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.sponsorName || !form.category) {
        alert("Sponsor name and category are required");
        return;
    }

    try {

        await onSave(form);

    } catch (error) {

        console.log(error);

    }

};
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    // width: 850,
                    // margin: "0 auto",
                    width: 850,
                    maxHeight: "90vh",
                    overflowY: "auto",
                    background: colors.white,
                    borderRadius: 12,
                    padding: 30,
                    boxShadow: "0 5px 15px rgba(0,0,0,.08)",
                }}
            >
                <h2
                    style={{
                        marginTop: 0,
                        color: colors.primary,
                        marginBottom: 25,
                    }}
                >
                    Add / Edit Sponsor
                </h2>

                <form onSubmit={handleSubmit}>

                    {/* Sponsor Name */}

                    <div style={{ marginBottom: 20 }}>
                        <label style={label}>Sponsor Name</label>

                        <input
                            type="text"
                            name="sponsorName"
                            value={form.sponsorName}
                            onChange={handleChange}
                            placeholder="Enter sponsor name"
                            style={input}
                        />
                    </div>

                    {/* Category */}

                    <div style={{ marginBottom: 20 }}>
                        <label style={label}>Category</label>

                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            style={input}
                        >
                            <option value="">Select Category</option>

                            <option>Title Sponsor</option>

                            <option>Gold Sponsor</option>

                            <option>Silver Sponsor</option>

                            <option>Bronze Sponsor</option>

                            <option>Banking Partner</option>

                            <option>Nutrition Partner</option>

                            <option>Medical Partner</option>

                            <option>Media Partner</option>

                            <option>Community Partner</option>
                        </select>
                    </div>

                    {/* Website */}

                    <div style={{ marginBottom: 20 }}>
                        <label style={label}>Website</label>

                        <input
                            type="url"
                            name="website"
                            value={form.website}
                            onChange={handleChange}
                            placeholder="https://example.com"
                            style={input}
                        />
                    </div>

                    {/* Collaboration */}

                    <div style={{ marginBottom: 20 }}>
                        <label style={label}>Collaboration Type</label>

                        <select
                            name="collaboration"
                            value={form.collaboration}
                            onChange={handleChange}
                            style={input}
                        >
                            <option value="">Select</option>

                            <option>Financial</option>

                            <option>Event Partner</option>

                            <option>Nutrition Support</option>

                            <option>Medical Support</option>

                            <option>Media Coverage</option>

                            <option>Equipment Support</option>

                            <option>Venue Support</option>
                        </select>
                    </div>

                    {/* Description */}

                    <div style={{ marginBottom: 20 }}>
                        <label style={label}>Description</label>

                        <textarea
                            name="description"
                            rows={4}
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Write sponsor details..."
                            style={{
                                ...input,
                                resize: "none",
                            }}
                        />
                    </div>

                    {/* Logo */}

                    <div style={{ marginBottom: 25 }}>
                        <label style={label}>Sponsor Logo</label>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 25,
                            }}
                        >
                            <div
                                style={{
                                    width: 120,
                                    height: 120,
                                    border: `2px dashed ${colors.secondary}`,
                                    borderRadius: 10,
                                    overflow: "hidden",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    background: "#FAFAFA",
                                }}
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            color: "#999",
                                            fontSize: 13,
                                        }}
                                    >
                                        No Logo
                                    </span>
                                )}
                            </div>

                            <label
                                style={{
                                    background: colors.secondary,
                                    color: colors.white,
                                    padding: "12px 18px",
                                    borderRadius: 8,
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 8,
                                }}
                            >
                                <FaUpload />

                                Upload Logo

                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handleLogo}
                                />
                            </label>
                        </div>
                    </div>

                    {/* Status */}

                    <div
                        style={{
                            marginBottom: 30,
                        }}
                    >
                        <label
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                color: colors.primary,
                                fontWeight: 600,
                            }}
                        >
                            <input
                                type="checkbox"
                                name="isActive"
                                checked={form.isActive}
                                onChange={handleChange}
                            />

                            Active Sponsor
                        </label>
                    </div>

                    {/* Buttons */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 15,
                        }}
                    >
                        <button
                            type="button"
                            style={{
                                background: "#9E9E9E",
                                color: colors.white,
                                border: "none",
                                padding: "12px 22px",
                                borderRadius: 8,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}
                            onClick={() => onClose?.()}
                        >
                            <FaTimes />

                            Cancel
                        </button>

                        <button
                            type="submit"
                            style={{
                                background: colors.accent,
                                color: colors.white,
                                border: "none",
                                padding: "12px 24px",
                                borderRadius: 8,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                fontWeight: 600,
                            }}
                        >
                            <FaSave />

                            Save Sponsor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

const label = {
    display: "block",
    marginBottom: 8,
    color: "#1B2F51",
    fontWeight: 600,
};

const input = {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "1px solid #E5E7EB",
    outline: "none",
    fontSize: 15,
    boxSizing: "border-box",
};