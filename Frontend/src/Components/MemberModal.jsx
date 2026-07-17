import { useState, useEffect } from "react";
import { FaTimes, FaUpload, FaIdCard } from "react-icons/fa";


export default function MemberModal({
  isOpen,
  onClose,
  onSave,
  editMember = null,
  members = []
}) {


  const colors = {
    primary: "#1B2F51",
    secondary: "#2BC4DA",
    accent: "#ED2974",
    white: "#FFFFFF",
  };


  const generateMemberId = () => {

    let max = 0;

    members.forEach(member => {

      if (member.memberId) {

        const num = parseInt(
          member.memberId.replace("GRC-", "")
        );

        if (num > max)
          max = num;

      }

    });


    return `GRC-${String(max + 1).padStart(3, "0")}`;

  };



  const initialState = {
    name: "",
    email: "",
    title: "",
    memberId: "",
    isActive: true,
    photo: ""
  };



  const [formData, setFormData] = useState(initialState);

  const [preview, setPreview] = useState(null);



  // FIX EDIT MODE
  useEffect(() => {

    if (editMember) {

      setFormData({

        name: editMember.name || "",
        email: editMember.email || "",
        title: editMember.title || "",
        memberId: editMember.memberId || "",
        isActive: editMember.isActive ?? true,
        photo: editMember.photo || ""

      });


      setPreview(editMember.photo || null);


    }
    else {

      setFormData({

        ...initialState,
        memberId: generateMemberId()

      });

      setPreview(null);

    }


  }, [editMember, isOpen]);





  if (!isOpen)
    return null;





  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;


    setFormData(prev => ({

      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value

    }));

  };





  const handleImage = (e) => {

    const file = e.target.files[0];

    if (file) {

      setFormData(prev => ({

        ...prev,
        photo: file

      }));

      setPreview(
        URL.createObjectURL(file)
      );

    }

  };





  const handleSubmit = (e) => {

    e.preventDefault();


    onSave(formData);


    onClose();

  };





  return (

    <div style={overlay}>


      <div style={modal}>


        <div style={header}>

          <h2>
            {editMember ? "Edit Member" : "Add Member"}
          </h2>


          <button onClick={onClose}>
            <FaTimes />
          </button>


        </div>





        <form onSubmit={handleSubmit}>


          {/* PHOTO */}

          <div style={{ textAlign: "center" }}>

            <label style={{ cursor: "pointer" }}>


              {
                preview ?

                  <img
                    src={preview}
                    style={avatar}
                  />


                  :

                  <div style={uploadBox}>
                    <FaUpload />
                  </div>

              }


              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImage}
              />


            </label>


            <p style={{ color: colors.secondary }}>
              Upload Member Photo
            </p>


          </div>







          {/* UID */}

          <div style={fieldBox}>

            <input

              value={formData.memberId}

              readOnly

              style={{
                ...inputStyle,
                background: "#f3f3f3"
              }}

            />

          </div>





          <input

            name="name"

            placeholder="Member Name"

            value={formData.name}

            onChange={handleChange}

            required

            style={inputStyle}

          />





          <input

            name="email"

            type="email"

            placeholder="Member Email"

            value={formData.email}

            onChange={handleChange}

            required

            style={inputStyle}

          />






          <input

            name="title"

            placeholder="Member Role (Coach, Founder...)"

            value={formData.title}

            onChange={handleChange}

            required

            style={inputStyle}

          />






          <div style={toggle}>


            <input

              type="checkbox"

              name="isActive"

              checked={formData.isActive}

              onChange={handleChange}

            />


            <span>
              Active Member
            </span>


          </div>





          <div style={buttons}>


            <button

              type="button"

              onClick={onClose}

              style={cancelBtn}

            >

              Cancel

            </button>




            <button

              type="submit"

              style={saveBtn}

            >

              {
                editMember
                  ?
                  "Update Member"
                  :
                  "Save Member"
              }


            </button>


          </div>



        </form>


      </div>


    </div>

  );


}






const overlay = {

  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.55)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000

};



const modal = {

  width: "450px",
  background: "#fff",
  borderRadius: "18px",
  padding: "30px",
  boxShadow: "0 20px 50px rgba(0,0,0,.25)"

};



const header = {

  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px"

};



const avatar = {

  width: "100px",
  height: "100px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #2BC4DA"

};



const uploadBox = {

  width: "100px",
  height: "100px",
  borderRadius: "50%",
  background: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  fontSize: "30px",
  color: "#1B2F51"

};



const fieldBox = {

  display: "flex",
  alignItems: "center",
  gap: "10px"

};



const inputStyle = {

  width: "100%",
  padding: "13px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "14px",
  outline: "none"

};



const toggle = {

  display: "flex",
  gap: "10px",
  alignItems: "center",
  marginBottom: "20px",
  fontWeight: "600"

};



const buttons = {

  display: "flex",
  justifyContent: "flex-end",
  gap: "10px"

};



const cancelBtn = {

  padding: "12px 22px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#ddd"

};



const saveBtn = {

  padding: "12px 22px",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  background: "#ED2974",
  color: "#fff",
  fontWeight: "600"

};