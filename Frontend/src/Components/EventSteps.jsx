import { useState, useEffect } from "react";
import {
    FaUpload,
    FaArrowRight,
    FaArrowLeft,
    FaCalendarAlt,
    FaClock,
    FaMapMarkerAlt,
    FaRunning,
} from "react-icons/fa";

export default function EventSteps({
    closeForm,
    saveEvent,
    editMode,
    selectedEvent,
}) {
    const [step, setStep] = useState(1);

    const [bannerPreview, setBannerPreview] = useState(null);
    const [qrPreview, setQrPreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1
        banner: null,
        eventName: "",
        eventDate: "",
        reportingTime: "",
        raceStartTime: "",
        location: "",
        eventType: "Run",
        registrationDeadline: "",

        // Step 2
        categories: [
            {
                raceDistance: "",
                ageLimit: "",
                registrationFee: "",
                allowances: [""],
            },
        ],
        // step 3
        coordinates: [],

        paymentMethod: "JazzCash",
        accountTitle: "",
        accountNumber: "",
        qrImage: null,
    });
    const createFormData = () => {

        const data = new FormData();

        if (formData.banner) {
            data.append(
                "banner",
                formData.banner
            );
        }


        data.append(
            "eventName",
            formData.eventName
        );

        data.append(
            "eventDate",
            formData.eventDate
        );

        data.append(
            "reportingTime",
            formData.reportingTime
        );

        data.append(
            "raceStartTime",
            formData.raceStartTime
        );

        data.append(
            "location",
            formData.location
        );

        data.append(
            "eventType",
            formData.eventType
        );

        data.append(
            "registrationDeadline",
            formData.registrationDeadline
        );


        data.append(
            "categories",
            JSON.stringify(formData.categories)
        );


        data.append(
            "coordinates",
            JSON.stringify(formData.coordinates)
        );


        data.append(
            "paymentMethod",
            formData.paymentMethod
        );


        data.append(
            "accountTitle",
            formData.accountTitle
        );


        data.append(
            "accountNumber",
            formData.accountNumber
        );


        if (formData.qrImage) {

            data.append(
                "qrImage",
                formData.qrImage
            );

        }


        return data;

    };
    const handleCategoryChange = (index, field, value) => {
        const updated = [...formData.categories];
        updated[index][field] = value;

        setFormData({
            ...formData,
            categories: updated,
        });
    };

    const addCategory = () => {
        setFormData({
            ...formData,
            categories: [
                ...formData.categories,
                {
                    raceDistance: "",
                    ageLimit: "",
                    registrationFee: "",
                    allowances: [""],
                },
            ],
        });
    };

    const removeCategory = (index) => {
        const updated = formData.categories.filter((_, i) => i !== index);

        setFormData({
            ...formData,
            categories: updated,
        });
    };

    const addAllowance = (categoryIndex) => {
        const updated = [...formData.categories];

        updated[categoryIndex].allowances.push("");

        setFormData({
            ...formData,
            categories: updated,
        });
    };

    const handleAllowanceChange = (
        categoryIndex,
        allowanceIndex,
        value
    ) => {
        const updated = [...formData.categories];

        updated[categoryIndex].allowances[allowanceIndex] = value;

        setFormData({
            ...formData,
            categories: updated,
        });
    };

    const removeAllowance = (
        categoryIndex,
        allowanceIndex
    ) => {
        const updated = [...formData.categories];

        updated[categoryIndex].allowances.splice(
            allowanceIndex,
            1
        );

        setFormData({
            ...formData,
            categories: updated,
        });
    };
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        clearError(name);
    };

    const handleBanner = (e) => {

        const file = e.target.files[0];

        if (!file) return;


        if (!file.type.startsWith("image/")) {

            setErrors({
                ...errors,
                banner: "Only image files allowed"
            });

            return;

        }


        if (file.size > 5 * 1024 * 1024) {

            setErrors({
                ...errors,
                banner: "Image must be less than 5MB"
            });

            return;

        }


        setFormData({
            ...formData,
            banner: file
        });


        setBannerPreview(
            URL.createObjectURL(file)
        );


    };
    const handleCoordinateChange = (index, value) => {

        const updated = [...formData.coordinates];

        updated[index] = value;

        setFormData({
            ...formData,
            coordinates: updated
        });


        if (value.trim()) {

            setErrors(prev => ({
                ...prev,
                coordinates: ""
            }));

        }

    };
    const addCoordinate = () => {

        setFormData(prev => ({
            ...prev,
            coordinates: [
                ...prev.coordinates,
                ""
            ]
        }));

    };

    const removeCoordinate = (index) => {

        const updated = formData.coordinates.filter(
            (_, i) => i !== index
        );


        setFormData({
            ...formData,
            coordinates: updated
        });

    };
    const handleQRUpload = (e) => {

        const file = e.target.files[0];

        if (!file) return;


        if (!file.type.startsWith("image/")) {

            setErrors(prev => ({
                ...prev,
                qrImage: "Only image files allowed"
            }));

            return;

        }


        if (file.size > 2 * 1024 * 1024) {

            setErrors(prev => ({
                ...prev,
                qrImage: "QR image must be less than 2MB"
            }));

            return;

        }


        setFormData(prev => ({
            ...prev,
            qrImage: file
        }));


        setErrors(prev => ({
            ...prev,
            qrImage: ""
        }));


        setQrPreview(
            URL.createObjectURL(file)
        );

    };
    const validateStep1 = () => {

        let err = {};


        if (!formData.banner && !bannerPreview) {
            err.banner = "Event banner is required";
        }


        if (!formData.eventName.trim())
            err.eventName = "Event name is required";


        if (!formData.eventDate)
            err.eventDate = "Event date is required";


        if (!formData.reportingTime)
            err.reportingTime = "Reporting time is required";


        if (!formData.raceStartTime)
            err.raceStartTime = "Race start time is required";


        if (!formData.location.trim())
            err.location = "Location is required";


        if (!formData.registrationDeadline)
            err.registrationDeadline =
                "Registration deadline is required";


        if (
            formData.eventDate &&
            formData.registrationDeadline &&
            new Date(formData.registrationDeadline) >
            new Date(formData.eventDate)
        ) {
            err.registrationDeadline =
                "Deadline cannot be after event date";
        }


        return err;
    };
    const validateStep2 = () => {

        let err = {};


        if (formData.categories.length === 0) {

            err.categories =
                "At least one category required";

        }


        formData.categories.forEach((cat, index) => {


            if (!cat.raceDistance)
                err[`distance${index}`] =
                    `Category ${index + 1} distance required`;


            if (!cat.ageLimit)
                err[`age${index}`] =
                    `Category ${index + 1} age limit required`;


            if (!cat.registrationFee)
                err[`fee${index}`] =
                    `Category ${index + 1} fee required`;


        });


        return err;

    };
    const validateStep3 = () => {

        let err = {};


        if (
            formData.coordinates.length === 0 ||
            formData.coordinates.some(
                c => !c.trim()
            )
        ) {

            err.coordinates =
                "At least one route point required";

        }


        const coordinateRegex =
            /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;


        formData.coordinates.forEach(
            (point, index) => {


                if (
                    point &&
                    !coordinateRegex.test(point)
                ) {

                    err.coordinates =
                        `Invalid GPS point ${index + 1}`;

                }

            }
        );



        if (!formData.accountTitle.trim())
            err.accountTitle =
                "Account title required";


        if (!formData.accountNumber.trim())
            err.accountNumber =
                "Account number required";


        if (!formData.qrImage && !qrPreview)
    err.qrImage =
        "QR image required";


        return err;

    };
    const handleSubmit = (e) => {

        e.preventDefault();


        const err = validateStep3();

        setErrors(err);


        if (Object.keys(err).length)
            return;


        setSaving(true);
        setTimeout(async () => {

            const eventData = createFormData();

            const success = await saveEvent(eventData);


            if (success) {
                closeForm();
            }


            setSaving(false);

        }, 800);
    };
    const clearError = (field) => {
        setErrors(prev => ({
            ...prev,
            [field]: ""
        }));
    };


    const inputErrorStyle = (field) => ({
        border: errors[field]
            ? "1px solid #ED2974"
            : "1px solid #ddd"
    });
    const goToStep = (validator, nextStep) => {

        const err = validator();

        setErrors(err);


        if (Object.keys(err).length === 0) {

            setStep(nextStep);

        }
        else {

            setTimeout(() => {

                const firstError =
                    document.querySelector(".error-field");


                if (firstError)
                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

            }, 100);

        }

    }
    useEffect(() => {
        if (editMode && selectedEvent) {

            setFormData({
                banner: null,
                eventName: selectedEvent.eventName || "",
                eventDate: selectedEvent.eventDate?.split("T")[0] || "",
                reportingTime: selectedEvent.reportingTime || "",
                raceStartTime: selectedEvent.raceStartTime || "",
                location: selectedEvent.location || "",
                eventType: selectedEvent.eventType || "Run",
                registrationDeadline:
                    selectedEvent.registrationDeadline?.split("T")[0] || "",

                categories:
                    selectedEvent.categories?.length
                        ? selectedEvent.categories
                        : [
                            {
                                raceDistance: "",
                                ageLimit: "",
                                registrationFee: "",
                                allowances: [""],
                            }
                        ],

                coordinates: selectedEvent.coordinates || [],

                paymentMethod:
                    selectedEvent.paymentMethod || "JazzCash",

                accountTitle:
                    selectedEvent.accountTitle || "",

                accountNumber:
                    selectedEvent.accountNumber || "",

                qrImage: null
            });


            if (selectedEvent.banner) {

                setBannerPreview(
                    `${import.meta.env.VITE_API_URL}/uploads/annual-events/banners/${selectedEvent.banner.split("/").pop()}`
                );
            }

            if (selectedEvent.qrImage) {

                setQrPreview(
                    `${import.meta.env.VITE_API_URL}/uploads/annual-events/qr/${selectedEvent.qrImage.split("/").pop()}`
                );

            }
        }

    }, [editMode, selectedEvent]);

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
                    maxWidth: "1000px",
                    margin: "auto",
                    background: "#fff",
                    borderRadius: "18px",
                    overflow: "hidden",
                    boxShadow: "0 10px 30px rgba(0,0,0,.08)",
                }}
            >
                {/* Header */}

                <div
                    style={{
                        background: "#1B2F51",
                        color: "#fff",
                        padding: "25px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}
                >

                    <div>

                        <h2>
                            Annual Event Registration
                        </h2>

                        <p>
                            Create a new annual running event
                        </p>

                    </div>


                    <button

                        onClick={closeForm}

                        style={{
                            background: "#ED2974",
                            border: "none",
                            color: "#fff",
                            fontSize: 20,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            cursor: "pointer",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}

                    >
                        ✕
                    </button>


                </div>

                {/* Progress */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "15px",
                        padding: "30px",
                    }}
                >
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            style={{
                                width: 45,
                                height: 45,
                                borderRadius: "50%",
                                display: "grid",
                                placeItems: "center",
                                background:
                                    step === item
                                        ? "#ED2974"
                                        :
                                        step > item
                                            ? "#2BC4DA"
                                            : "#d8d8d8",
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
                {
                    Object.keys(errors).filter(
                        key => errors[key]
                    ).length > 0 &&
                    <div
                        style={{
                            background: "#ffe5ee",
                            color: "#ED2974",
                            padding: 12,
                            margin: "0 30px",
                            borderRadius: 8
                        }}
                    >
                        ⚠ Please fix highlighted fields before continuing
                    </div>
                }

                {/* STEP 1 */}

                {step === 1 && (
                    <div style={{ padding: "35px" }}>
                        <h3
                            style={{
                                color: "#1B2F51",
                                marginBottom: "25px",
                            }}
                        >
                            Step 1 - Basic Event Information
                        </h3>

                        {/* Banner */}

                        <div
                            style={{
                                border: "2px dashed #2BC4DA",
                                borderRadius: "12px",
                                padding: "20px",
                                textAlign: "center",
                                marginBottom: "30px",
                            }}
                        >
                            {bannerPreview ? (
                                <img
                                    src={bannerPreview}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        maxHeight: 300,
                                        objectFit: "cover",
                                        borderRadius: 10,
                                        marginBottom: 15,
                                    }}
                                />
                            ) : (
                                <>
                                    <FaUpload
                                        size={40}
                                        color="#2BC4DA"
                                    />

                                    <p>Upload Event Banner</p>
                                </>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleBanner}
                            />
                            {
                                errors.banner &&
                                <p
                                    style={{
                                        color: "#ED2974",
                                        fontSize: 13,
                                        marginTop: 10
                                    }}
                                >
                                    ⚠ {errors.banner}
                                </p>
                            }
                        </div>

                        {/* Inputs */}

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit,minmax(280px,1fr))",
                                gap: "20px",
                            }}
                        >
                            <Input
                                icon={<FaRunning />}
                                label="Event Name"
                                name="eventName"
                                value={formData.eventName}
                                onChange={handleChange}
                                placeholder="e.g. Independence Day Marathon"
                                error={errors.eventName}
                            />

                            <Input
                                icon={<FaCalendarAlt />}
                                label="Event Date"
                                type="date"
                                name="eventDate"
                                value={formData.eventDate}
                                onChange={handleChange}
                                error={errors.eventDate}
                            />

                            <Input
                                icon={<FaClock />}
                                label="Reporting Time"
                                type="time"
                                name="reportingTime"
                                value={formData.reportingTime}
                                onChange={handleChange}
                                error={errors.reportingTime}

                            />

                            <Input
                                icon={<FaClock />}
                                label="Race Start Time"
                                type="time"
                                name="raceStartTime"
                                value={formData.raceStartTime}
                                onChange={handleChange}
                                error={errors.raceStartTime}
                            />

                            <Input
                                icon={<FaMapMarkerAlt />}
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Gojra Chock , Jhang road"
                                error={errors.location}
                            />

                            <div>
                                <label>Event Type</label>

                                <select
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    style={inputStyle}
                                >
                                    <option>Run</option>
                                    <option>Walk</option>
                                    <option>Marathon</option>
                                    <option>Trail Run</option>
                                    <option>Cycling</option>
                                </select>
                            </div>

                            <Input
                                icon={<FaCalendarAlt />}
                                label="Registration Deadline"
                                type="date"
                                name="registrationDeadline"
                                value={formData.registrationDeadline}
                                onChange={handleChange}
                                error={errors.registrationDeadline}
                            />
                        </div>

                        {/* Buttons */}

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "40px",
                            }}
                        >
                            <button
                                disabled
                                style={{
                                    background: "#ccc",
                                    border: "none",
                                    padding: "12px 25px",
                                    borderRadius: 8,
                                    color: "#fff",
                                    cursor: "not-allowed",
                                }}
                            >
                                <FaArrowLeft /> Previous
                            </button>

                            <button
                                onClick={() => goToStep(validateStep1, 2)}
                                style={{
                                    background: "#ED2974",
                                    border: "none",
                                    padding: "12px 30px",
                                    borderRadius: 8,
                                    color: "#fff",
                                    cursor: "pointer",
                                }}
                            >
                                Next <FaArrowRight />
                            </button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={{ padding: 35 }}>

                        <h3
                            style={{
                                color: "#1B2F51",
                                marginBottom: 25,
                            }}
                        >
                            Step 2 - Race Categories
                        </h3>

                        {formData.categories.map((category, index) => (
                            <div
                                key={index}
                                style={{
                                    border: "2px solid #2BC4DA",
                                    borderRadius: 12,
                                    padding: 20,
                                    marginBottom: 25,
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginBottom: 20,
                                    }}
                                >
                                    <h4 style={{ color: "#1B2F51" }}>
                                        Category {index + 1}
                                    </h4>

                                    {formData.categories.length > 1 && (
                                        <button
                                            onClick={() => removeCategory(index)}
                                            style={{
                                                background: "#ED2974",
                                                color: "#fff",
                                                border: "none",
                                                padding: "8px 14px",
                                                borderRadius: 6,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fit,minmax(250px,1fr))",
                                        gap: 20,
                                    }}
                                >
                                    <Input
                                        label="Race Distance"
                                        name="distance"
                                        value={category.raceDistance}
                                        onChange={(e) =>
                                            handleCategoryChange(
                                                index,
                                                "raceDistance",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. 5 KM"
                                        error={errors[`distance${index}`]}
                                    />

                                    <Input
                                        label="Age Limit"
                                        name="age"
                                        value={category.ageLimit}
                                        onChange={(e) =>
                                            handleCategoryChange(
                                                index,
                                                "ageLimit",
                                                e.target.value
                                            )
                                        }
                                        placeholder="e.g. 12+ , 18+"
                                        error={errors[`age${index}`]}
                                    />
                                    <Input
                                        label="Registration Fee"
                                        type="number"
                                        name="fee"
                                        value={category.registrationFee}
                                        onChange={(e) =>
                                            handleCategoryChange(
                                                index,
                                                "registrationFee",
                                                e.target.value
                                            )
                                        }

                                        placeholder="e.g. 1000 Rs"
                                        error={errors[`fee${index}`]}
                                    />
                                </div>

                                <hr style={{ margin: "25px 0" }} />

                                <h4 style={{ color: "#1B2F51" }}>
                                    Allowances
                                </h4>

                                {category.allowances.map(
                                    (allowance, allowanceIndex) => (
                                        <div
                                            key={allowanceIndex}
                                            style={{
                                                display: "flex",
                                                gap: 10,
                                                marginBottom: 10,
                                            }}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Allowance"
                                                value={allowance}
                                                onChange={(e) =>
                                                    handleAllowanceChange(
                                                        index,
                                                        allowanceIndex,
                                                        e.target.value
                                                    )
                                                }
                                                style={{
                                                    flex: 1,
                                                    padding: 12,
                                                    borderRadius: 8,
                                                    border: "1px solid #ddd",
                                                }}
                                            />

                                            {category.allowances.length > 1 && (
                                                <button
                                                    onClick={() =>
                                                        removeAllowance(
                                                            index,
                                                            allowanceIndex
                                                        )
                                                    }
                                                    style={{
                                                        background: "#ED2974",
                                                        color: "#fff",
                                                        border: "none",
                                                        padding: "0 15px",
                                                        borderRadius: 8,
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </div>
                                    )
                                )}

                                <button
                                    onClick={() => addAllowance(index)}
                                    style={{
                                        marginTop: 10,
                                        background: "#2BC4DA",
                                        color: "#fff",
                                        border: "none",
                                        padding: "10px 18px",
                                        borderRadius: 8,
                                        cursor: "pointer",
                                    }}
                                >
                                    + Add Allowance
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={addCategory}
                            style={{
                                background: "#1B2F51",
                                color: "#fff",
                                border: "none",
                                padding: "12px 22px",
                                borderRadius: 8,
                                cursor: "pointer",
                                marginBottom: 30,
                            }}
                        >
                            + Add Category
                        </button>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <button
                                onClick={() => setStep(1)}
                                style={backBtn}
                            >
                                <FaArrowLeft /> Previous
                            </button>

                            <button
                                onClick={() => goToStep(validateStep2, 3)}
                                style={nextBtn}
                            >
                                Next <FaArrowRight />
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ padding: 35 }}>

                        <h3
                            style={{
                                color: "#1B2F51",
                                marginBottom: 25
                            }}
                        >
                            Step 3 - Route & Payment
                        </h3>

                        {/* Map Coordinates */}
                        {/* Route Coordinates */}

                        <h4
                            style={{
                                color: "#1B2F51",
                                marginBottom: 15
                            }}
                        >
                            Route Coordinates
                        </h4>


                        <p
                            style={{
                                color: "#777",
                                marginBottom: 20
                            }}
                        >
                            Add multiple GPS points for route map.
                            1st point indicate start point and last point indicate finish point
                        </p>


                        {
                            formData.coordinates.map((point, index) => (

                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        gap: 15,
                                        marginBottom: 15,
                                        alignItems: "center"
                                    }}
                                >


                                    <div
                                        style={{
                                            flex: 1
                                        }}
                                    >

                                        <label>
                                            GPS Point {index + 1}
                                        </label>


                                        <input
                                            type="text"
                                            placeholder="31.151761333795086, 72.68129772761094"
                                            value={point}
                                            onChange={(e) =>
                                                handleCoordinateChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            style={{
                                                width: "100%",
                                                marginTop: 6,
                                                padding: 12,
                                                borderRadius: 8,
                                                outline: "none",
                                                border: errors.coordinates
                                                    ? "1px solid #ED2974"
                                                    : "1px solid #ddd",

                                                transition: "0.3s"
                                            }}
                                        />


                                        {
                                            errors.coordinates &&
                                            index === 0 &&
                                            <p
                                                style={{
                                                    color: "#ED2974",
                                                    fontSize: 13,
                                                    marginTop: 6
                                                }}
                                            >
                                                ⚠ {errors.coordinates}
                                            </p>
                                        }
                                    </div>


                                    {
                                        formData.coordinates.length > 1 &&

                                        <button
                                            onClick={() =>
                                                removeCoordinate(index)
                                            }
                                            style={{
                                                background: "#ED2974",
                                                color: "#fff",
                                                border: "none",
                                                padding: "12px 16px",
                                                borderRadius: 8,
                                                cursor: "pointer",
                                                marginTop: 20
                                            }}
                                        >
                                            ✕
                                        </button>

                                    }


                                </div>


                            ))
                        }
                        <button
                            onClick={addCoordinate}
                            style={{
                                background: "#2BC4DA",
                                color: "#fff",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: 8,
                                cursor: "pointer",
                                marginTop: 10
                            }}
                        >
                            + Add Route Point
                        </button>

                        <hr style={{ margin: "30px 0" }} />

                        {/* Payment */}

                        <h4
                            style={{
                                color: "#1B2F51",
                                marginBottom: 20
                            }}
                        >
                            Payment Details
                        </h4>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
                                gap: 20
                            }}
                        >

                            <div>

                                <label>Payment Method</label>

                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    style={{
                                        ...inputStyle,
                                        border: errors.paymentMethod
                                            ? "1px solid #ED2974"
                                            : "1px solid #ddd"
                                    }}
                                >

                                    <option>JazzCash</option>

                                    <option>EasyPaisa</option>

                                    <option>Bank Transfer</option>

                                    <option>Cash</option>

                                </select>

                            </div>

                            <Input
                                label="Account Title"
                                name="accountTitle"
                                value={formData.accountTitle}
                                onChange={handleChange}
                                placeholder="e.g. Moeez Ali"
                                error={errors.accountTitle}
                            />

                            <Input
                                label="Account Number"
                                name="accountNumber"
                                value={formData.accountNumber}
                                onChange={handleChange}
                                placeholder="e.g. 0327-7624983"
                                error={errors.accountNumber}
                            />
                            <div>

                                <label>Barcode / QR Image</label>

                                <label
                                    style={{
                                        display: "block",
                                        border: "2px dashed #2BC4DA",
                                        padding: 20,
                                        borderRadius: 12,
                                        cursor: "pointer",
                                        textAlign: "center"
                                    }}
                                >

                                    <FaUpload
                                        size={30}
                                        color="#2BC4DA"
                                    />

                                    <p>
                                        {
                                            qrPreview
                                                ?
                                                "Change QR Image"
                                                :
                                                "Upload Payment QR"
                                        }
                                    </p>


                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleQRUpload}
                                        style={{
                                            display: "none"
                                        }}
                                    />

                                </label>
                                <ErrorMessage message={errors.qrImage} />
                                {
                                    qrPreview &&

                                    <img

                                        src={qrPreview}

                                        alt="QR Preview"

                                        style={{
                                            marginTop: 15,
                                            width: 180,
                                            height: 180,
                                            objectFit: "contain",
                                            border: "2px solid #2BC4DA",
                                            borderRadius: 10
                                        }}

                                    />

                                }

                                {formData.qrImage && (

                                    <p
                                        style={{
                                            marginTop: 10,
                                            color: "#2BC4DA",
                                            fontWeight: 600
                                        }}
                                    >
                                        {formData.qrImage.name}
                                    </p>

                                )}

                            </div>

                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: 40
                            }}
                        >

                            <button
                                onClick={() => setStep(2)}
                                style={backBtn}
                            >
                                <FaArrowLeft /> Previous
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                style={{
                                    ...nextBtn,
                                    opacity: saving ? 0.6 : 1,
                                    cursor: saving
                                        ? "not-allowed"
                                        : "pointer"
                                }}
                            >
                                {
                                    saving
                                        ?
                                        <>
                                            <span className="loade66r"></span>
                                            {
                                                editMode
                                                    ? " Updating Event..."
                                                    : " Creating Event..."
                                            }
                                        </>
                                        :
                                        editMode
                                            ? "Update Event"
                                            : "Create Event"
                                }
                            </button>

                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}

function Input({
    label,
    icon,
    error,
    ...props
}) {

    return (

        <div>

            <label style={{
                fontWeight: 600,
                color: "#1B2F51"
            }}>
                {label}
            </label>


            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    border: error
                        ? "1px solid #ED2974"
                        : "1px solid #ddd",
                    borderRadius: 8,
                    padding: "0 12px",
                    marginTop: 6,
                    transition: "0.3s"
                }}
            >

                <span
                    style={{
                        color: "#2BC4DA",
                        marginRight: 10
                    }}
                >
                    {icon}
                </span>


                <input
                    {...props}
                    style={{
                        border: "none",
                        outline: "none",
                        width: "100%",
                        padding: "12px 0"
                    }}
                />


            </div>


            {
                error &&
                <p
                    style={{
                        color: "#ED2974",
                        fontSize: 13,
                        marginTop: 5
                    }}
                >
                    ⚠ {error}
                </p>
            }


        </div>

    );

}
function ErrorMessage({ message }) {

    if (!message) return null;

    return (
        <p
            style={{
                color: "#ED2974",
                fontSize: 13,
                marginTop: 5
            }}
        >
            {message}
        </p>
    );
}

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginTop: 6,
    borderRadius: 8,
    border: "1px solid #ddd",
};

const nextBtn = {
    background: "#ED2974",
    color: "#fff",
    border: "none",
    padding: "12px 28px",
    borderRadius: 8,
    cursor: "pointer",
};

const backBtn = {
    background: "#1B2F51",
    color: "#fff",
    border: "none",
    padding: "12px 28px",
    borderRadius: 8,
    cursor: "pointer",
};