import { useState, useEffect } from "react";
import {
  FaRunning,
  FaCalendarAlt,
  FaUsers,
  FaTrophy,
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import EventSteps from "../Components/EventSteps";
import {
  getAnnualEvents,
  createAnnualEvent,
  deleteAnnualEvent,
  updateAnnualEvent,
} from "../api/annualEventAPI";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import RouteMap from "../Components/RouteMap";

export default function AnnualEvents() {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [showPreview, setShowPreview] = useState(false);

  const stats = [
    {
      title: "Annual Events",
      value: events.length,
      icon: <FaCalendarAlt />,
      color: "#2BC4DA",
    },
    {
      title: "Participants",
      value: "4,580",
      icon: <FaUsers />,
      color: "#ED2974",
    },
    {
      title: "Completed",
      value: events.filter(
        e => e.status === "Completed"
      ).length,
      icon: <FaRunning />,
      color: "#1B2F51",
    },
    {
      title: "Open Registration",
      value: events.filter(
        e => e.registrationStatus === "Open"
      ).length,
      icon: <FaTrophy />,
      color: "#2BC4DA",
    },
  ];
  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data } = await getAnnualEvents();
      setEvents(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const saveEvent = async (formData) => {

    try {

      if (editMode) {

        await updateAnnualEvent(
          selectedEvent._id,
          formData
        );

        toast.success(
          "Event updated successfully"
        );

      }
      else {

        await createAnnualEvent(formData);

        toast.success(
          "Event created successfully"
        );

      }


      setShowForm(false);
      setSelectedEvent(null);
      setEditMode(false);

      await loadEvents();


      return true;


    }
    catch (err) {

      toast.error(
        "Something went wrong"
      );

      return false;

    }

  };
  const imageURL = (path) => {

    if (!path) return "";

    return `${import.meta.env.VITE_API_URL}${path}`;

  };

  useEffect(() => {
    loadEvents();
  }, []);
  const confirmDelete = (id) => {

    Swal.fire({
      title: "Delete Event?",
      text: "This action cannot be undone!",
      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#ED2974",
      cancelButtonColor: "#1B2F51",

      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",

      background: "#fff",
      color: "#1B2F51",

      customClass: {
        popup: "event-delete-popup"
      }

    }).then((result) => {

      if (result.isConfirmed) {

        deleteEvent(id);

      }

    });

  };
  const deleteEvent = async (id) => {

    try {

      await deleteAnnualEvent(id);

      Swal.fire({
        title: "Deleted!",
        text: "Event deleted successfully",
        icon: "success",
        confirmButtonColor: "#2BC4DA"
      });

      loadEvents();

    }
    catch (err) {

      Swal.fire({
        title: "Error!",
        text: "Delete failed",
        icon: "error",
        confirmButtonColor: "#ED2974"
      });

    }

  };
  const editEvent = (event) => {

    setSelectedEvent({
      ...event
    });

    setEditMode(true);

    setShowForm(true);

  };

  const toggleRegistration = async (event) => {
    try {
      await updateAnnualEvent(event._id, {
        registrationStatus:
          event.registrationStatus === "Open"
            ? "Closed"
            : "Open",
      });

      await loadEvents();
    } catch (err) {
      console.log(err);
    }
  };


  const filteredEvents = events.filter(event =>

    (event.eventName || "")
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

  );

  return (
    <div
      style={{
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        <div>
          <h2
            style={{
              color: "#1B2F51",
              marginBottom: 5,
            }}
          >
            Annual Events
          </h2>

          <p style={{ color: "#777" }}>
            Manage all annual running events.
          </p>
        </div>

        <button
          onClick={() => {

            setSelectedEvent(null);
            setEditMode(false);
            setShowForm(true);

          }}
          style={{
            background: "#ED2974",
            color: "#fff",
            border: "none",
            padding: "12px 22px",
            borderRadius: 8,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontWeight: 600,
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
          gap: 20,
          marginBottom: 30,
        }}
      >
        {stats.map((item) => (
          <div
            key={item.title}
            style={{
              background: "#fff",
              borderRadius: 12,
              padding: 20,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 15px rgba(0,0,0,.08)",
            }}
          >
            <div>
              <h2
                style={{
                  color: "#1B2F51",
                  margin: 0,
                }}
              >
                {item.value}
              </h2>
              <p
                style={{
                  color: "#666",
                  marginBottom: 8,
                }}
              >
                {item.title}
              </p>


            </div>

            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: item.color,
                color: "#fff",
                display: "grid",
                placeItems: "center",
                fontSize: 24,
              }}
            >
              {item.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div
        style={{
          flex: 1,
          minWidth: "280px",
          background: "#fff",
          padding: "12px 15px",
          borderRadius: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            padding: "0 15px",
            color: "#1B2F51",
          }}
        >
          <FaSearch />
        </div>

        <input
          type="text"
          placeholder="Search annual event..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: "none",
            outline: "none",
            width: "100%",
          }}
        />
      </div>

      {/* Table Placeholder */}

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,.08)"
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse"
          }}
        >

          <thead>

            <tr
              style={{
                background: "#1B2F51",
                color: "#fff"
              }}
            >

              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Registration</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody>


            {
              filteredEvents.length === 0 ?

                <tr>
                  <td
                    colSpan={5}
                    style={{
                      padding: 40,
                      textAlign: "center"
                    }}
                  >
                    <FaCalendarAlt
                      size={45}
                      color="#2BC4DA"
                    />

                    <h3>No Annual Events</h3>

                    <p>
                      Create your first annual event.
                    </p>
                  </td>
                </tr>


                :

                filteredEvents.map(event => (


                  <tr
                    key={event._id}
                    style={{
                      textAlign: "center"
                    }}
                  >


                    <td>
                      {event.eventName}
                    </td>


                    <td>
                      {new Date(event.eventDate).toLocaleDateString("en-GB")}

                    </td>


                    <td>
                      {event.location}
                    </td>


                    <td>

                      <button
                        onClick={() => toggleRegistration(event)}
                        disabled={loading}
                        style={{
                          background:
                            event.registrationStatus === "Open"
                              ?
                              "#2BC4DA"
                              :
                              "#ED2974",

                          color: "#fff",
                          border: "none",
                          borderRadius: 20,
                          padding: "8px 15px"
                        }}

                      >

                        {event.registrationStatus}

                      </button>

                    </td>



                    <td>


                      <button
                        onClick={() => {

                          setSelectedEvent(event);
                          setShowPreview(true);

                        }}
                        style={{
                          background: "#2BC4DA",
                          color: "#fff",
                          border: "none",
                          padding: 8,
                          margin: 3,
                          borderRadius: 5
                        }}
                      >

                        <FaEye />

                      </button>


                      <button
                        onClick={() => editEvent(event)}
                        style={{
                          background: "#1B2F51",
                          color: "#fff",
                          border: "none",
                          padding: 8,
                          margin: 3,
                          borderRadius: 5
                        }}
                      >

                        <FaEdit />

                      </button>


                      <button
                        onClick={() => confirmDelete(event._id)}
                        style={{
                          background: "#ED2974",
                          color: "#fff",
                          border: "none",
                          padding: 8,
                          margin: 3,
                          borderRadius: 5
                        }}

                      >

                        <FaTrash />

                      </button>


                    </td>


                  </tr>


                ))

            }


          </tbody>

        </table>


      </div>
      {
        showForm &&

        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,.5)",
            overflowY: "auto",
            padding: "40px",
            zIndex: 999
          }}
        >

          <EventSteps

            closeForm={() => {

              setShowForm(false);
              setSelectedEvent(null);
              setEditMode(false);

            }}

            saveEvent={saveEvent}

            editMode={editMode}

            selectedEvent={selectedEvent}

          />
        </div>

      }
      {
        showPreview && selectedEvent && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(15, 23, 42, 0.75)",
              backdropFilter: "blur(8px)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1500,
              padding: "24px 16px",
            }}
          >
            <div
              style={{
                width: "880px",
                maxWidth: "100%",
                maxHeight: "90vh",
                overflowY: "auto",
                background: "#FFFFFF",
                borderRadius: "20px",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                border: "1px solid #E2E8F0",
                color: "#0F172A",
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              }}
            >
              {/* Banner with dark gradient overlay for depth */}
              <div style={{ position: "relative", width: "100%", height: "280px", overflow: "hidden", background: "#0F172A" }}>
                <img
                  src={
                    selectedEvent.banner
                      ? `${import.meta.env.VITE_API_URL}/uploads/annual-events/banners/${selectedEvent.banner.split("/").pop()}`
                      : ""
                  }
                  alt={selectedEvent.eventName}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(15, 23, 42, 0.6) 100%)",
                  }}
                />
              </div>

              <div style={{ padding: "32px" }}>
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "32px",
                    flexWrap: "wrap",
                    gap: "16px",
                    borderBottom: "1px solid #F1F5F9",
                    paddingBottom: "24px",
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "28px",
                        fontWeight: "700",
                        color: "#0F172A",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {selectedEvent.eventName}
                    </h2>
                    <span
                      style={{
                        display: "inline-block",
                        color: "#64748B",
                        marginTop: "6px",
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {selectedEvent.eventType}
                    </span>
                  </div>

                  <span
                    style={{
                      background:
                        selectedEvent.registrationStatus === "Open"
                          ? "#ECFDF5"
                          : "#FEF2F2",
                      color:
                        selectedEvent.registrationStatus === "Open"
                          ? "#059669"
                          : "#DC2626",
                      border: `1px solid ${selectedEvent.registrationStatus === "Open"
                          ? "#A7F3D0"
                          : "#FECACA"
                        }`,
                      padding: "6px 16px",
                      borderRadius: "9999px",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.02em",
                    }}
                  >
                    ● {selectedEvent.registrationStatus}
                  </span>
                </div>

                {/* Event Information */}
                <section style={{ marginBottom: "36px" }}>
                  <h3
                    style={{
                      color: "#0F172A",
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "20px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Event Information
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: "16px",
                      background: "#F8FAFC",
                      padding: "20px",
                      borderRadius: "14px",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    <Info
                      label="Event Date"
                      value={new Date(
                        selectedEvent.eventDate
                      ).toLocaleDateString("en-GB")}
                    />
                    <Info
                      label="Reporting Time"
                      value={selectedEvent.reportingTime}
                    />
                    <Info
                      label="Race Start"
                      value={selectedEvent.raceStartTime}
                    />
                    <Info
                      label="Registration Deadline"
                      value={new Date(
                        selectedEvent.registrationDeadline
                      ).toLocaleDateString("en-GB")}
                    />
                    <Info
                      label="Location"
                      value={selectedEvent.location}
                    />
                    <Info
                      label="Event Type"
                      value={selectedEvent.eventType}
                    />
                  </div>
                </section>

                {/* Categories */}
                <section style={{ marginBottom: "36px" }}>
                  <h3
                    style={{
                      color: "#0F172A",
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "20px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Race Categories
                  </h3>

                  <div style={{ display: "grid", gap: "16px" }}>
                    {selectedEvent.categories?.map((cat, index) => (
                      <div
                        key={index}
                        style={{
                          border: "1px solid #E2E8F0",
                          borderRadius: "12px",
                          padding: "20px",
                          background: "#FFFFFF",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "16px",
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              color: "#2563EB",
                              fontSize: "16px",
                              fontWeight: "600",
                            }}
                          >
                            Category {index + 1}
                          </h4>
                          <span
                            style={{
                              fontSize: "16px",
                              fontWeight: "700",
                              color: "#0F172A",
                              background: "#F1F5F9",
                              padding: "4px 12px",
                              borderRadius: "8px",
                            }}
                          >
                            Rs. {cat.registrationFee}
                          </span>
                        </div>

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: "12px",
                            fontSize: "14px",
                            color: "#334155",
                            marginBottom: "16px",
                          }}
                        >
                          <p style={{ margin: 0 }}>
                            <strong style={{ color: "#64748B" }}>Distance:</strong>{" "}
                            {cat.raceDistance}
                          </p>
                          <p style={{ margin: 0 }}>
                            <strong style={{ color: "#64748B" }}>Age Limit:</strong>{" "}
                            {cat.ageLimit}
                          </p>
                        </div>

                        {cat.allowances && cat.allowances.length > 0 && (
                          <div
                            style={{
                              borderTop: "1px dashed #E2E8F0",
                              paddingTop: "12px",
                              marginTop: "12px",
                            }}
                          >
                            <strong style={{ fontSize: "13px", color: "#64748B", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                              Allowances
                            </strong>
                            <ul
                              style={{
                                margin: "8px 0 0 0",
                                paddingLeft: "20px",
                                fontSize: "14px",
                                color: "#475569",
                              }}
                            >
                              {cat.allowances?.map((a, i) => (
                                <li key={i} style={{ marginBottom: "4px" }}>
                                  {a}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Route */}
                {/* <section style={{ marginBottom: "36px" }}>
            <h3
              style={{
                color: "#0F172A",
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "20px",
                letterSpacing: "-0.01em",
              }}
            >
              Route Coordinates
            </h3>

            <div
              style={{
                background: "#F8FAFC",
                padding: "20px",
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
              }}
            >
              {selectedEvent.coordinates?.length ? (
                <div style={{ display: "grid", gap: "10px" }}>
                  {selectedEvent.coordinates.map((point, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "14px",
                        color: "#334155",
                        background: "#FFFFFF",
                        padding: "10px 14px",
                        borderRadius: "8px",
                        border: "1px solid #F1F5F9",
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>📍</span>
                      <strong>Point {i + 1}:</strong> {point}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ margin: 0, color: "#94A3B8", fontSize: "14px" }}>
                  No route coordinates added.
                </p>
              )}
            </div>
          </section> */}
                <h3
                  style={{
                    color: "#1B2F51",
                    marginBottom: 15,
                  }}
                >
                  Route Map
                </h3>

                <RouteMap coordinates={selectedEvent.coordinates} />

                {/* Payment */}
                <section style={{ marginBottom: "32px" }}>
                  <h3
                    style={{
                      color: "#0F172A",
                      fontSize: "18px",
                      fontWeight: "600",
                      marginBottom: "20px",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Payment Details
                  </h3>

                  <div
                    style={{
                      border: "1px solid #E2E8F0",
                      borderRadius: "14px",
                      padding: "24px",
                      background: "#FFFFFF",
                      display: "grid",
                      gridTemplateColumns: selectedEvent.qrImage ? "1fr auto" : "1fr",
                      gap: "24px",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ display: "grid", gap: "12px", fontSize: "14px", color: "#334155" }}>
                      <div>
                        <span style={{ color: "#64748B", display: "block", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>
                          Payment Method
                        </span>
                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#0F172A" }}>
                          {selectedEvent.paymentMethod}
                        </span>
                      </div>

                      <div>
                        <span style={{ color: "#64748B", display: "block", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>
                          Account Title
                        </span>
                        <span style={{ fontSize: "15px", fontWeight: "500", color: "#0F172A" }}>
                          {selectedEvent.accountTitle}
                        </span>
                      </div>

                      <div>
                        <span style={{ color: "#64748B", display: "block", fontSize: "12px", fontWeight: "600", textTransform: "uppercase" }}>
                          Account Number
                        </span>
                        <span
                          style={{
                            fontFamily: "monospace",
                            fontSize: "16px",
                            fontWeight: "600",
                            background: "#F1F5F9",
                            padding: "4px 8px",
                            borderRadius: "6px",
                            display: "inline-block",
                            marginTop: "2px",
                            color: "#0F172A",
                          }}
                        >
                          {selectedEvent.accountNumber}
                        </span>
                      </div>
                    </div>

                    {selectedEvent.qrImage && (
                      <div style={{ textAlign: "center" }}>
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/annual-events/qr/${selectedEvent.qrImage.split("/").pop()}`}
                          alt="QR"
                          style={{
                            width: 160,
                            height: 160,
                            objectFit: "contain",
                            border: "1px solid #E2E8F0",
                            borderRadius: "12px",
                            padding: "8px",
                            background: "#FFFFFF",
                            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
                          }}
                        />
                        <span style={{ display: "block", fontSize: "12px", color: "#64748B", marginTop: "6px" }}>
                          Scan to Pay
                        </span>
                      </div>
                    )}
                  </div>
                </section>

                {/* Actions */}
                <div
                  style={{
                    textAlign: "right",
                    borderTop: "1px solid #F1F5F9",
                    paddingTop: "24px",
                  }}
                >
                  <button
                    onClick={() => setShowPreview(false)}
                    style={{
                      background: "#0F172A",
                      color: "#FFFFFF",
                      border: "none",
                      padding: "10px 28px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                      fontSize: "14px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      transition: "all 0.2s",
                    }}
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}
function Info({ label, value }) {
  return (
    <div
      style={{
        background: "#F7F9FC",
        padding: 15,
        borderRadius: 10,
        borderLeft: "4px solid #2BC4DA",
      }}
    >
      <div
        style={{
          color: "#777",
          fontSize: 13,
          marginBottom: 5,
        }}
      >
        {label}
      </div>

      <div
        style={{
          color: "#1B2F51",
          fontWeight: 600,
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}