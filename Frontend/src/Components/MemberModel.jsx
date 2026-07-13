import { useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";

export default function MemberModal({
  isOpen,
  onClose,
  onSave,
  editMember = null,
}) {
  const colors = {
    primary: "#1B2F51",
    secondary: "#2BC4DA",
    accent: "#ED2974",
    white: "#FFFFFF",
  };

  const [formData, setFormData] = useState({
    name: editMember?.name || "",
    title: editMember?.title || "",
    isActive: editMember?.isActive ?? true,
    photo: editMember?.photo || "",
  });

  const [preview, setPreview] = useState(
    editMember?.photo || null
  );


  if (!isOpen) return null;


  // Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  // Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        photo: file,
      });

      setPreview(URL.createObjectURL(file));
    }
  };


  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(formData);

    setFormData({
      name: "",
      title: "",
      isActive: true,
      photo: "",
    });

    setPreview(null);

    onClose();
  };


  return (
    <div
      style={{
        position:"fixed",
        inset:0,
        background:"rgba(0,0,0,0.5)",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        zIndex:1000,
      }}
    >

      <div
        style={{
          width:"420px",
          background:colors.white,
          borderRadius:"15px",
          padding:"25px",
          boxShadow:"0 10px 30px rgba(0,0,0,.2)"
        }}
      >


        {/* Header */}

        <div
          style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginBottom:20
          }}
        >

          <h2
            style={{
              color:colors.primary,
              margin:0
            }}
          >
            {editMember ? "Edit Member" : "Add Member"}
          </h2>


          <button
            onClick={onClose}
            style={{
              background:"transparent",
              border:"none",
              color:colors.accent,
              fontSize:20,
              cursor:"pointer"
            }}
          >
            <FaTimes/>
          </button>

        </div>



        <form onSubmit={handleSubmit}>


          {/* Photo */}

          <div
            style={{
              textAlign:"center",
              marginBottom:20
            }}
          >

            <label
              style={{
                cursor:"pointer"
              }}
            >

              {preview ? (

                <img
                  src={preview}
                  alt="preview"
                  style={{
                    width:90,
                    height:90,
                    borderRadius:"50%",
                    objectFit:"cover",
                    border:`3px solid ${colors.secondary}`
                  }}
                />

              ) : (

                <div
                  style={{
                    width:90,
                    height:90,
                    borderRadius:"50%",
                    background:"#eee",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    margin:"auto",
                    color:colors.primary,
                    fontSize:25
                  }}
                >
                  <FaUpload/>
                </div>

              )}


              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />

            </label>


            <p
              style={{
                color:colors.secondary,
                fontSize:14
              }}
            >
              Upload Member Photo
            </p>


          </div>



          {/* Name */}

          <input
            type="text"
            name="name"
            placeholder="Member Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />



          {/* Title */}

          <input
            type="text"
            name="title"
            placeholder="Member Title (Coach, Founder...)"
            value={formData.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />



          {/* Active Toggle */}

          <div
            style={{
              display:"flex",
              alignItems:"center",
              gap:10,
              margin:"15px 0"
            }}
          >

            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />

            <span
              style={{
                color:colors.primary,
                fontWeight:600
              }}
            >
              Active Member
            </span>

          </div>



          {/* Buttons */}

          <div
            style={{
              display:"flex",
              justifyContent:"flex-end",
              gap:10
            }}
          >

            <button
              type="button"
              onClick={onClose}
              style={{
                padding:"12px 20px",
                border:"none",
                borderRadius:8,
                cursor:"pointer",
                background:"#ddd"
              }}
            >
              Cancel
            </button>


            <button
              type="submit"
              style={{
                padding:"12px 20px",
                border:"none",
                borderRadius:8,
                cursor:"pointer",
                background:colors.accent,
                color:colors.white,
                fontWeight:600
              }}
            >

              {editMember ? "Update Member" : "Save Member"}

            </button>


          </div>


        </form>


      </div>


    </div>
  );
}



const inputStyle = {
  width:"100%",
  padding:"12px",
  marginBottom:"15px",
  border:"1px solid #ddd",
  borderRadius:"8px",
  outline:"none",
  fontSize:"14px",
};