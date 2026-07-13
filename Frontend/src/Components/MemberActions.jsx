import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

import {
    FaFilePdf,
    FaFileExcel,
    FaTrash,
    FaTimes,
} from "react-icons/fa";


export default function MemberActions({ members, onDelete }) {

    const [deleteMember, setDeleteMember] = useState(null);


    // Export PDF
    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(
            "Gojra Running Club - Member List",
            14,
            20
        );


        const tableData = members.map((member, index) => [
            index + 1,
            member.name,
            member.title,
            member.isActive ? "Active" : "Inactive"
        ]);


        autoTable(doc, {
            startY: 30,
            head: [
                [
                    "ID",
                    "Name",
                    "Title",
                    "Status"
                ]
            ],
            body: tableData
        });


        doc.save("GRC_Members.pdf");
    };



    // Export Excel
    const exportExcel = () => {

        const data = members.map((member, index) => ({

            ID: index + 1,
            Name: member.name,
            Title: member.title,
            Status: member.isActive
                ? "Active"
                : "Inactive"

        }));


        const worksheet =
            XLSX.utils.json_to_sheet(data);


        const workbook =
            XLSX.utils.book_new();


        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "Members"
        );


        XLSX.writeFile(
            workbook,
            "GRC_Members.xlsx"
        );

    };




    // Confirm Delete
    const confirmDelete = () => {

        onDelete(deleteMember._id);

        setDeleteMember(null);

    };



    return (

        <div>


            {/* Action Buttons */}

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
            {/* Delete Dialog */}
            {
                deleteMember &&

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
                        zIndex: 1000
                    }}
                >


                    <div
                        style={{
                            width: "350px",
                            background: "#FFFFFF",
                            borderRadius: "15px",
                            padding: "25px",
                            textAlign: "center"
                        }}
                    >


                        <button
                            onClick={() =>
                                setDeleteMember(null)
                            }
                            style={{
                                float: "right",
                                border: "none",
                                background: "transparent",
                                fontSize: "20px",
                                cursor: "pointer"
                            }}
                        >

                            <FaTimes />

                        </button>



                        <h2
                            style={{
                                color: "#1B2F51"
                            }}
                        >
                            Delete Member?
                        </h2>



                        <p>
                            Are you sure you want to delete

                            <br />

                            <b>
                                {deleteMember.name}
                            </b>

                            ?
                        </p>



                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: "15px",
                                marginTop: "20px"
                            }}
                        >


                            <button
                                onClick={() =>
                                    setDeleteMember(null)
                                }
                                style={{
                                    background: "#2BC4DA",
                                    color: "#1B2F51",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>



                            <button
                                onClick={confirmDelete}
                                style={{
                                    background: "#ED2974",
                                    color: "#FFFFFF",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Delete
                            </button>



                        </div>



                    </div>


                </div>

            }



        </div>

    )

}



const th = {

    padding: "12px",
    textAlign: "left"

};


const td = {

    padding: "12px",
    borderBottom: "1px solid #ddd"

};