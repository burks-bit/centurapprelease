import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminCareerAdd(){
    
    const [career, setCareer] = useState({
        title: '',
        description: '',
        status: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCareer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleDescriptionChange = (value) => {
        setCareer(prevState => ({
            ...prevState,
            description: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}api/addnewmgmtcareer`, career); // Adjust the endpoint as per your backend
            // alert('Career added successfully!');
            window.location.reload();
            // // Optionally, you can redirect the user to a different page or perform any other action upon successful addition
        } catch (error) {
            console.error('Error adding career:', error);
            alert('Failed to add career. Please try again.');
        }
        setLoading(false);
    };

    return (
            <div>
                <h1>Add Career</h1>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={career.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <ReactQuill
                            value={career.description}
                            onChange={handleDescriptionChange}
                        />
                    </div>
                    <div>
                        <label>Status:</label>
                        <select
                            name="status"
                            value={career.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="open">Open</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                    <br />
                    <button type="submit" className='ui button primary' disabled={loading}>
                        {loading ? 'Saving... Please Wait!' : 'Add Career'}
                    </button>
                </form>
            </div>
    );
}
