import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";
import AdminCareerAdd from "./AdminCareerAdd";

export default function IndexCareer() {
    const [careerData, setCareerData] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false); // State to manage the visibility of the add career form

    useEffect(() => {
        const fetchCareerData = async () => {
            try {
                const response = await axios.get(apiUrl + 'api/getmgmtcareer');
                setCareerData(response.data.career);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchCareerData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.post(`${apiUrl}api/deletemgmtcareer/${id}`);
            const updatedCareers = careerData.filter(career => career.id !== id);
            setCareerData(updatedCareers);
        } catch (error) {
            console.error('Error deleting career:', error);
        }
    }

    const handleAddButtonClick = () => {
        setShowAddForm(true);
    };

    const handleCareerAdded = () => {
        setShowAddForm(false);
    };

    const handleCancel = () => {
        setShowAddForm(false); // Hide the add career form when the "Cancel" button is clicked
    };

    return (
        <Layout>
            <div>
                <h1>Career Management</h1>
                
                {!showAddForm && (
                    <button className="ui button" onClick={handleAddButtonClick}>
                        Add
                    </button>
                )}

                {!showAddForm && (
                    <table className="ui table bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '50%' }}>Positions</th>
                                <th style={{ width: '25%' }}>Availability</th>
                                <th style={{ width: '25%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {careerData.map(career => (
                                <tr key={career.id}>
                                    <td style={{ width: '50%' }}>
                                        <div style={{paddingLeft:'30px', color: '#1371b6', fontWeight: 'bold'}}  dangerouslySetInnerHTML={{ __html: career.title }} />
                                    </td>
                                    <td style={{ width: '25%' }}>
                                        <div style={{ paddingLeft: '' }}>
                                            <span style={{ color: career.status === 'closed' ? 'red' : 'green' }}>
                                                {career.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td style={{ width: '25%' }}>
                                        <a href={`/centurmanagement/careers-management/career-details/${career.id}`} className="ui button">
                                            View
                                        </a>
                                        &ensp;
                                        <button className="ui button red" onClick={() => handleDelete(career.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {showAddForm && (
                    <div>
                        <AdminCareerAdd onCareerAdded={handleCareerAdded} />
                        <br />
                        <button className="ui button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
}
