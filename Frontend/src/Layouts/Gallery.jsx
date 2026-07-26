import { useState, useEffect, useRef } from "react";
import {
    FaImages,
    FaUpload,
    FaCloudUploadAlt,
    FaSearch,
    FaTrash,
    FaPlus,
    FaFolder,
    FaCheckCircle,
    FaEye,
    FaTimes,
    FaExclamationCircle,
    FaSpinner,
} from "react-icons/fa";
import API from "../api/axios";

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [search, setSearch] = useState("");
    const [isDragging, setIsDragging] = useState(false);
    const [selectedPreview, setSelectedPreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const fileInputRef = useRef(null);

    // Clean up Object URLs to avoid browser memory leaks
    useEffect(() => {
        return () => {
            images.forEach((img) => URL.revokeObjectURL(img.preview));
        };
    }, [images]);

    // Helper: Format bytes into readable string (e.g. 2.4 MB)
    const formatBytes = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
    };

    const addFiles = (files) => {
        setErrorMessage("");
        const fileList = Array.from(files);

        const validFiles = fileList.filter((file) => {
            const isImage = file.type.startsWith("image/");
            const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB Limit
            return isImage && isValidSize;
        });

        if (validFiles.length < fileList.length) {
            setErrorMessage("Some files were skipped. Only images under 10MB are allowed.");
        }

        const newPreviews = validFiles.map((file) => ({
            id: Math.random().toString(36).substring(2, 9),
            file,
            preview: URL.createObjectURL(file),
            sizeFormatted: formatBytes(file.size),
        }));

        setImages((prev) => [...prev, ...newPreviews]);
    };

    const handleImageChange = (e) => {
        if (e.target.files) addFiles(e.target.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            addFiles(e.dataTransfer.files);
        }
    };

    const removeImage = (id, previewUrl) => {
        URL.revokeObjectURL(previewUrl);
        setImages((prev) => prev.filter((img) => img.id !== id));
        if (selectedPreview?.id === id) setSelectedPreview(null);
    };

    const clearAllImages = () => {
        images.forEach((img) => URL.revokeObjectURL(img.preview));
        setImages([]);
        setSelectedPreview(null);
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     if (images.length === 0) {
    //         setErrorMessage("Please select at least one image.");
    //         return;
    //     }

    //     const formData = new FormData();

    //     images.forEach((img) => {
    //         formData.append("images", img.file);
    //     });

    //     formData.append("category", category);
    //     formData.append("description", description);

    //     try {
    //         setIsUploading(true);
    //         setUploadProgress(0);
    //         setErrorMessage("");

    //         console.log("Sending files:", images);
    //         console.log("Category:", category);
    //         console.log("Description:", description);

    //         const response = await API.post(
    //             "/gallery",
    //             formData,
    //             {
    //                 onUploadProgress: (progressEvent) => {
    //                     if (progressEvent.total) {
    //                         const percent = Math.round(
    //                             progressEvent.loaded * 100 /
    //                             progressEvent.total
    //                         );

    //                         setUploadProgress(percent);
    //                     }
    //                 }
    //             }
    //         );

    //         console.log("Upload response:", response.data);

    //         alert("Gallery uploaded successfully");


    //         clearAllImages();
    //         setCategory("");
    //         setDescription("");
    //         setUploadProgress(0);


    //     } catch (err) {

    //         console.log("Gallery upload error:", err);

    //         if (err.response) {
    //             console.log("Backend error:", err.response.data);
    //             setErrorMessage(
    //                 err.response.data.message ||
    //                 "Server error while uploading images"
    //             );
    //         }
    //         else {
    //             setErrorMessage("Network error. Server not reachable.");
    //         }

    //     } finally {
    //         setIsUploading(false);
    //     }
    // };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
        setErrorMessage("Please select at least one image.");
        return;
    }

    if (!category) {
        setErrorMessage("Please select a category.");
        return;
    }

    const formData = new FormData();
    images.forEach((img) => {
        formData.append("images", img.file);
    });

    formData.append("category", category);
    formData.append("description", description);

    try {
        setIsUploading(true);
        setUploadProgress(0);
        setErrorMessage("");

        const response = await API.post("/gallery", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percent = Math.round(
                        (progressEvent.loaded * 100) / progressEvent.total
                    );
                    setUploadProgress(percent);
                }
            },
        });

        alert("Gallery uploaded successfully!");
        clearAllImages();
        setCategory("");
        setDescription("");
    } catch (err) {
        console.error("Upload error:", err);
        setErrorMessage(
            err.response?.data?.message || "Server error while uploading images."
        );
    } finally {
        setIsUploading(false);
    }
};
    const filteredImages = images.filter((img) =>
        img.file.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>

                {/* Top Navigation / Header */}
                <header style={styles.header}>
                    <div>
                        <h1 style={styles.heading}>Gallery Management</h1>
                        <p style={styles.subheading}>
                            Upload, inspect, and organize image assets for your site.
                        </p>
                    </div>

                    <div style={styles.searchBox}>
                        <FaSearch color="#64748B" size={14} />
                        <input
                            type="text"
                            placeholder="Search selected assets..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                </header>

                {/* Dashboard Metrics */}
                <section style={styles.statsGrid}>
                    <div style={styles.statCard}>
                        <div style={{ ...styles.iconBadge, background: "rgba(43, 196, 218, 0.12)" }}>
                            <FaImages size={20} color="#2BC4DA" />
                        </div>
                        <div>
                            <span style={styles.statNumber}>{images.length}</span>
                            <span style={styles.statLabel}>Selected Files</span>
                        </div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={{ ...styles.iconBadge, background: "rgba(237, 41, 116, 0.12)" }}>
                            <FaFolder size={20} color="#ED2974" />
                        </div>
                        <div>
                            <span style={styles.statNumber}>{category || "None"}</span>
                            <span style={styles.statLabel}>Active Category</span>
                        </div>
                    </div>

                    <div style={styles.statCard}>
                        <div style={{ ...styles.iconBadge, background: "rgba(27, 47, 81, 0.1)" }}>
                            <FaUpload size={20} color="#1B2F51" />
                        </div>
                        <div>
                            <span style={styles.statNumber}>
                                {isUploading ? `${uploadProgress}%` : images.length > 0 ? "Ready" : "Idle"}
                            </span>
                            <span style={styles.statLabel}>Status</span>
                        </div>
                    </div>
                </section>

                {/* Main Work Area */}
                <div style={styles.formCard}>

                    {/* File Upload Drop Area */}
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                            ...styles.dropArea,
                            ...(isDragging ? styles.dropAreaActive : {}),
                        }}
                    >
                        <div style={styles.dropIconContainer}>
                            <FaCloudUploadAlt size={38} color="#2BC4DA" />
                        </div>
                        <h3 style={styles.dropTitle}>Drag and drop images here</h3>
                        <p style={styles.dropSubtext}>
                            PNG, JPG, or WEBP up to 10MB each
                        </p>

                        <button
                            type="button"
                            style={styles.browseBtn}
                            onClick={(e) => {
                                e.stopPropagation();
                                fileInputRef.current?.click();
                            }}
                        >
                            <FaPlus size={12} />
                            <span>Browse Files</span>
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            hidden
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* Validation Warning Alert */}
                    {errorMessage && (
                        <div style={styles.alertBanner}>
                            <FaExclamationCircle size={16} color="#ED2974" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* Form Metadata Fields */}
                    <div style={styles.row}>
                        <div style={styles.inputGroup}>
                            <label style={styles.fieldLabel}>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={styles.selectInput}
                            >
                                <option value="">Select Category</option>
                                <option value="Weekly Event">Weekly Event</option>
                                <option value="Annual Event">Annual Event</option>
                                <option value="Training">Training</option>
                                <option value="Awards">Awards</option>
                                <option value="Community">Community</option>
                            </select>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.fieldLabel}>Description</label>
                            <input
                                placeholder="Add optional notes or keywords for search..."
                                style={styles.textInput}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Preview Queue Section */}
                    {images.length > 0 && (
                        <div style={styles.previewContainer}>
                            <div style={styles.previewHeader}>
                                <div>
                                    <h4 style={styles.previewTitle}>Queued Assets</h4>
                                    <span style={styles.previewSubtitle}>
                                        Showing {filteredImages.length} of {images.length} items
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={clearAllImages}
                                    style={styles.clearAllBtn}
                                >
                                    Clear All
                                </button>
                            </div>

                            <div style={styles.previewGrid}>
                                {filteredImages.map((img) => (
                                    <div key={img.id} style={styles.imageCard}>
                                        <img
                                            src={img.preview}
                                            alt={img.file.name}
                                            style={styles.image}
                                        />

                                        {/* Quick Info Bar */}
                                        <div style={styles.imageOverlay}>
                                            <span style={styles.fileName}>{img.file.name}</span>
                                            <span style={styles.fileSize}>{img.sizeFormatted}</span>
                                        </div>

                                        {/* Action Overlay Controls */}
                                        <div style={styles.cardActions}>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedPreview(img)}
                                                style={styles.iconBtn}
                                                title="View details"
                                            >
                                                <FaEye size={12} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(img.id, img.preview)}
                                                style={{ ...styles.iconBtn, background: "#ED2974" }}
                                                title="Remove image"
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Upload Progress Bar */}
                    {isUploading && (
                        <div style={styles.progressContainer}>
                            <div style={styles.progressHeader}>
                                <span style={styles.progressText}>
                                    <FaSpinner className="spin" size={14} style={{ marginRight: 8 }} />
                                    Uploading assets...
                                </span>
                                <span style={styles.progressText}>{uploadProgress}%</span>
                            </div>
                            <div style={styles.progressBarTrack}>
                                <div
                                    style={{
                                        ...styles.progressBarFill,
                                        width: `${uploadProgress}%`,
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Form Action Submit */}
                    <div style={styles.actionRow}>
                        <button
                            onClick={handleSubmit}
                            disabled={images.length === 0 || isUploading}
                            style={{
                                ...styles.submitBtn,
                                ...(images.length === 0 || isUploading ? styles.submitBtnDisabled : {}),
                            }}
                        >
                            {isUploading ? (
                                "Processing Upload..."
                            ) : (
                                <>
                                    <FaUpload size={14} />
                                    <span>
                                        Upload {images.length > 0 ? `${images.length} Image${images.length > 1 ? "s" : ""}` : ""}
                                    </span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Lightbox / Image Preview Modal */}
            {selectedPreview && (
                <div style={styles.modalOverlay} onClick={() => setSelectedPreview(null)}>
                    <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
                        <button
                            style={styles.closeModalBtn}
                            onClick={() => setSelectedPreview(null)}
                        >
                            <FaTimes size={16} />
                        </button>

                        <div style={styles.modalBody}>
                            <img
                                src={selectedPreview.preview}
                                alt={selectedPreview.file.name}
                                style={styles.modalImg}
                            />
                            <div style={styles.modalInfo}>
                                <h3 style={styles.modalFilename}>{selectedPreview.file.name}</h3>
                                <p style={styles.modalDetail}>
                                    <strong>Size:</strong> {selectedPreview.sizeFormatted}
                                </p>
                                <p style={styles.modalDetail}>
                                    <strong>File Type:</strong> {selectedPreview.file.type}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Inline Styles Object
const styles = {
    pageWrapper: {
        background: "#F8FAFC",
        minHeight: "100vh",
        fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Inter, sans-serif',
        color: "#0F172A",
        padding: "40px 20px",
    },

    container: {
        maxWidth: 1040,
        margin: "0 auto",
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flexWrap: "wrap",
        gap: 20,
        marginBottom: 32,
    },

    heading: {
        fontSize: 26,
        fontWeight: 700,
        color: "#1B2F51",
        margin: 0,
        letterSpacing: "-0.02em",
    },

    subheading: {
        fontSize: 14,
        color: "#64748B",
        marginTop: 4,
        margin: 0,
    },

    searchBox: {
        display: "flex",
        alignItems: "center",
        background: "#FFFFFF",
        padding: "10px 14px",
        borderRadius: 10,
        border: "1px solid #E2E8F0",
        boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
        gap: 10,
        width: "100%",
        maxWidth: 280,
    },

    searchInput: {
        border: "none",
        outline: "none",
        fontSize: 14,
        width: "100%",
        color: "#334155",
    },

    statsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 16,
        marginBottom: 28,
    },

    statCard: {
        background: "#FFFFFF",
        borderRadius: 14,
        padding: "18px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
        border: "1px solid #E2E8F0",
    },

    iconBadge: {
        width: 44,
        height: 44,
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    statNumber: {
        display: "block",
        fontSize: 18,
        fontWeight: 700,
        color: "#0F172A",
        lineHeight: 1.2,
    },

    statLabel: {
        fontSize: 12,
        color: "#64748B",
        fontWeight: 500,
    },

    formCard: {
        background: "#FFFFFF",
        padding: 32,
        borderRadius: 16,
        border: "1px solid #E2E8F0",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
    },

    dropArea: {
        border: "2px dashed #CBD5E1",
        backgroundColor: "#F8FAFC",
        borderRadius: 14,
        padding: "36px 20px",
        textAlign: "center",
        marginBottom: 20,
        transition: "all 0.2s ease-in-out",
        cursor: "pointer",
    },

    dropAreaActive: {
        borderColor: "#2BC4DA",
        backgroundColor: "rgba(43, 196, 218, 0.04)",
    },

    dropIconContainer: {
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#FFFFFF",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 12px auto",
    },

    dropTitle: {
        fontSize: 15,
        fontWeight: 600,
        color: "#1E293B",
        margin: "0 0 4px 0",
    },

    dropSubtext: {
        fontSize: 13,
        color: "#64748B",
        margin: "0 0 16px 0",
    },

    browseBtn: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: "#2BC4DA",
        color: "#FFFFFF",
        padding: "9px 18px",
        borderRadius: 8,
        cursor: "pointer",
        fontWeight: 600,
        fontSize: 13,
        border: "none",
    },

    alertBanner: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(237, 41, 116, 0.08)",
        border: "1px solid rgba(237, 41, 116, 0.2)",
        padding: "10px 14px",
        borderRadius: 8,
        fontSize: 13,
        color: "#ED2974",
        marginBottom: 20,
    },

    row: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 20,
        marginBottom: 28,
    },

    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: 6,
    },

    fieldLabel: {
        fontSize: 13,
        fontWeight: 600,
        color: "#334155",
    },

    selectInput: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #CBD5E1",
        fontSize: 14,
        outline: "none",
        background: "#FFFFFF",
        color: "#0F172A",
    },

    textInput: {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #CBD5E1",
        fontSize: 14,
        outline: "none",
        color: "#0F172A",
        boxSizing: "border-box",
    },

    previewContainer: {
        marginBottom: 28,
        borderTop: "1px solid #F1F5F9",
        paddingTop: 20,
    },

    previewHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    previewTitle: {
        fontSize: 15,
        fontWeight: 600,
        color: "#1E293B",
        margin: 0,
    },

    previewSubtitle: {
        fontSize: 12,
        color: "#64748B",
    },

    clearAllBtn: {
        background: "transparent",
        border: "none",
        color: "#ED2974",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
    },

    previewGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
        gap: 14,
    },

    imageCard: {
        position: "relative",
        overflow: "hidden",
        borderRadius: 10,
        border: "1px solid #E2E8F0",
        background: "#F8FAFC",
        aspectRatio: "1",
    },

    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
    },

    imageOverlay: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
        padding: "16px 8px 6px 8px",
        display: "flex",
        flexDirection: "column",
    },

    fileName: {
        color: "#FFFFFF",
        fontSize: 11,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },

    fileSize: {
        color: "#CBD5E1",
        fontSize: 10,
    },

    cardActions: {
        position: "absolute",
        top: 6,
        right: 6,
        display: "flex",
        gap: 4,
    },

    iconBtn: {
        width: 26,
        height: 26,
        borderRadius: 6,
        border: "none",
        background: "rgba(15, 23, 42, 0.75)",
        color: "#FFF",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },

    progressContainer: {
        marginBottom: 20,
    },

    progressHeader: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        fontWeight: 600,
        color: "#334155",
        marginBottom: 6,
    },

    progressText: {
        display: "flex",
        alignItems: "center",
    },

    progressBarTrack: {
        height: 6,
        width: "100%",
        background: "#E2E8F0",
        borderRadius: 3,
        overflow: "hidden",
    },

    progressBarFill: {
        height: "100%",
        background: "#2BC4DA",
        transition: "width 0.2s ease-in-out",
    },

    actionRow: {
        display: "flex",
        justifyContent: "flex-end",
    },

    submitBtn: {
        width: "100%",
        padding: "14px 20px",
        border: "none",
        borderRadius: 10,
        fontSize: 15,
        cursor: "pointer",
        background: "#1B2F51",
        color: "#FFFFFF",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    submitBtnDisabled: {
        background: "#94A3B8",
        cursor: "not-allowed",
    },

    /* Lightbox Modal */
    modalOverlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: 20,
    },

    modalCard: {
        background: "#FFFFFF",
        borderRadius: 16,
        padding: 24,
        maxWidth: 500,
        width: "100%",
        position: "relative",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
    },

    closeModalBtn: {
        position: "absolute",
        top: 16,
        right: 16,
        border: "none",
        background: "transparent",
        color: "#64748B",
        cursor: "pointer",
    },

    modalBody: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
    },

    modalImg: {
        width: "100%",
        maxHeight: 300,
        objectFit: "contain",
        borderRadius: 8,
        background: "#F8FAFC",
    },

    modalInfo: {
        fontSize: 14,
    },

    modalFilename: {
        margin: "0 0 8px 0",
        fontSize: 16,
        color: "#1E293B",
    },

    modalDetail: {
        margin: "4px 0",
        color: "#64748B",
    },
};