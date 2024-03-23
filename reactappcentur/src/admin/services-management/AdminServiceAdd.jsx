import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminServiceAdd(){
    
    const [services, setServices] = useState({
        services: '',
        enabled: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setServices(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleservicesbodyChange = (value) => {
        setServices(prevState => ({
            ...prevState,
            services: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}api/addnewmgmtservice`, services);
            window.location.reload();
        } catch (error) {
            console.error('Error adding services:', error);
            alert('Failed to add services. Please try again.');
        }
        setLoading(false);
    };

    return (
            <div>
                <h1>Add New Services</h1>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div>
                        <label>Services:</label>
                        <ReactQuill
                            value={services.services}
                            onChange={handleservicesbodyChange}
                        />
                    </div>
                    <div>
                        <br />
                        <div className="ui checkbox">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={services.enabled === '1'} // Assuming '1' represents true and '0' represents false
                                onChange={(e) => setServices(prevState => ({ ...prevState, enabled: e.target.checked ? '1' : '0' }))}
                            />
                            <label>Enabled</label>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className='ui button primary' disabled={loading}>
                        {loading ? 'Saving... Please Wait!' : 'Add services'}
                    </button>
                </form>
            </div>
    );
}
