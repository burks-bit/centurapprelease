import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminHeaderAdd(){
    
    const [header, setHeader] = useState({
        header_title: '',
        header_body: '',
        enabled: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHeader(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleHeaderbodyChange = (value) => {
        setHeader(prevState => ({
            ...prevState,
            header_body: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}api/addnewmgmtheader`, header);
            window.location.reload();
        } catch (error) {
            console.error('Error adding header:', error);
            alert('Failed to add header. Please try again.');
        }
        setLoading(false);
    };

    return (
            <div>
                <h1>Add Header</h1>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div>
                        <label>Header Title:</label>
                        <input
                            type="text"
                            name="header_title"
                            value={header.header_title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Header Body:</label>
                        <ReactQuill
                            value={header.header_body}
                            onChange={handleHeaderbodyChange}
                        />
                    </div>
                    <div>
                        <br />
                        <div className="ui checkbox">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={header.enabled === '1'} // Assuming '1' represents true and '0' represents false
                                onChange={(e) => setHeader(prevState => ({ ...prevState, enabled: e.target.checked ? '1' : '0' }))}
                            />
                            <label>Enabled</label>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className='ui button primary' disabled={loading}>
                        {loading ? 'Saving... Please Wait!' : 'Add header'}
                    </button>
                </form>
            </div>
    );
}
