import { useState } from "react";
import { useForm } from "react-hook-form";
import {
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaRoad,
    FaImage,
    FaSave,
    FaTimes,
} from "react-icons/fa";

export default function WeeklyEventForm({
    onSubmit,
    onCancel,
    defaultValues = {},
    isEdit = false,
}) {
    const colors = {
        primary: "#1B2F51",
        secondary: "#2BC4DA",
        accent: "#ED2974",
        white: "#FFFFFF",
        bg: "#F5F7FA",
    };

    const [preview, setPreview] = useState(defaultValues.banner || null);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            status: "Upcoming",
            ...defaultValues,
        },
    });

    const handleImage = (e) => {
        const file = e.target.files?.[0];

        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const inputStyle = {
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #ddd",
        outline: "none",
        marginTop: "6px",
        fontSize: "15px",
        boxSizing: "border-box",
    };

    const labelStyle = {
        fontWeight: 600,
        color: colors.primary,
    };

    const errorStyle = {
        color: "red",
        fontSize: "13px",
        marginTop: "5px",
    };

    return (
        <div
            style={{
                background: colors.bg,
                width: "100%",
                height: "100vh",
                overflowY: "auto",
                padding: "20px",
                boxSizing: "border-box",
            }}
        >
            <style>{`
@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
`}</style>
            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    margin: "20px auto",
                    background: colors.white,
                    padding: "25px",
                    borderRadius: "15px",
                    boxSizing: "border-box",
                }}
            >
                <h2
                    style={{
                        color: colors.primary,
                        marginBottom: "30px",
                    }}
                >
                    {isEdit ? "Edit Weekly Event" : "Add Weekly Event"}
                </h2>

                <form
                    onSubmit={handleSubmit(async (data) => {
                        try {
                            setLoading(true);
                            await onSubmit(data);
                        } finally {
                            setLoading(false);
                        }
                    })}>
                    {/* Banner */}

                    <div style={{ marginBottom: 25 }}>
                        <label style={labelStyle}>
                            <FaImage /> Event Banner
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            {...register("banner")}
                            onChange={handleImage}
                            style={inputStyle}
                        />
                        <p
                            style={{
                                fontSize: "13px",
                                marginTop: "6px",
                                color: "#777",
                            }}
                        >
                            Recommended: Use WebP images instead of JPG, PNG, or SVG to reduce file size and improve loading speed.
                        </p>

                        {errors.banner && (
                            <p style={errorStyle}>{errors.banner.message}</p>
                        )}
                        {preview && (
                            <div
                                style={{
                                    marginTop: "15px",
                                    width: "100%",
                                    height: "250px",
                                    borderRadius: "12px",
                                    overflow: "hidden",
                                    border: "1px solid #ddd",
                                }}
                            >
                                <img
                                    src={preview}
                                    alt="Banner Preview"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                        )}


                    </div>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fit,minmax(min(300px,100%),1fr))",
                            gap: "20px",
                        }}
                    >
                        {/* Name */}

                        <div>
                            <label style={labelStyle}>Event Name</label>

                            <input
                                {...register("name", {
                                    required: "Event name is required",
                                })}
                                style={inputStyle}
                                placeholder="Morning Run , Canal Run"
                            />

                            {errors.name && (
                                <p style={errorStyle}>{errors.name.message}</p>
                            )}
                        </div>

                        {/* Date */}

                        <div>
                            <label style={labelStyle}>
                                <FaCalendarAlt /> Date
                            </label>

                            <input
                                type="date"
                                {...register("date", {
                                    required: "Date is required",
                                })}
                                style={inputStyle}
                            />

                            {errors.date && (
                                <p style={errorStyle}>{errors.date.message}</p>
                            )}
                        </div>

                        {/* Time */}

                        <div>
                            <label style={labelStyle}>
                                <FaClock /> Time
                            </label>

                            <input
                                type="time"
                                {...register("time", {
                                    required: "Time is required",
                                })}
                                style={inputStyle}
                            />

                            {errors.time && (
                                <p style={errorStyle}>{errors.time.message}</p>
                            )}
                        </div>

                        {/* Location */}

                        <div>
                            <label style={labelStyle}>
                                <FaMapMarkerAlt /> Location
                            </label>

                            <input
                                {...register("location", {
                                    required: "Location is required",
                                })}
                                style={inputStyle}
                                placeholder="Kacha Gojra Chock , Jhang Road"
                            />

                            {errors.location && (
                                <p style={errorStyle}>{errors.location.message}</p>
                            )}
                        </div>

                        {/* Distance */}

                        <div>
                            <label style={labelStyle}>
                                <FaRoad /> Distance
                            </label>

                            <input
                                placeholder="5 KM , Half Marathon"
                                {...register("distance", {
                                    required: "Distance is required",
                                })}
                                style={inputStyle}
                            />

                            {errors.distance && (
                                <p style={errorStyle}>{errors.distance.message}</p>
                            )}
                        </div>

                        {/* Status */}

                        <div>
                            <label style={labelStyle}>Status</label>

                            <select
                                {...register("status", {
                                    required: "Status is required",
                                })}
                                style={inputStyle}
                            >
                                <option value="Upcoming">Upcoming</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            {errors.status && (
                                <p style={errorStyle}>{errors.status.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Description */}

                    <div style={{ marginTop: 25 }}>
                        <label style={labelStyle}>Description</label>

                        <textarea
                            rows="5"
                            {...register("description", {
                                required: "Description is required",
                                minLength: {
                                    value: 20,
                                    message: "Minimum 20 characters required",
                                },
                            })}
                            style={{
                                ...inputStyle,
                                resize: "none",
                            }}
                            placeholder="Description of the event here..."
                        />

                        {errors.description && (
                            <p style={errorStyle}>{errors.description.message}</p>
                        )}
                    </div>

                    {/* Buttons */}

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "15px",
                            marginTop: 30,
                        }}
                    >
                        <button
                            type="button"
                            onClick={onCancel}
                            style={{
                                padding: "12px 25px",
                                background: "#999",
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            <FaTimes /> Cancel
                        </button>

                        {/* <button
                            type="submit"
                            style={{
                                padding: "12px 25px",
                                background: colors.accent,
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            <FaSave /> {isEdit ? "Update Event" : "Save Event"}
                        </button> */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                padding: "12px 25px",
                                background: loading ? "#999" : colors.accent,
                                color: "#fff",
                                border: "none",
                                borderRadius: "8px",
                                cursor: loading ? "not-allowed" : "pointer",
                                opacity: loading ? 0.7 : 1,
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                            }}
                        >
                            {loading && (
                                <span
                                    style={{
                                        width: "16px",
                                        height: "16px",
                                        border: "2px solid rgba(255,255,255,0.4)",
                                        borderTop: "2px solid #fff",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                        animation: "spin 1s linear infinite",
                                    }}
                                />
                            )}

                            {
                                loading ? (
                                    "Saving..."
                                ) : (
                                    <>
                                        <FaSave />
                                        {isEdit ? " Update Event" : " Save Event"}
                                    </>
                                )
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}