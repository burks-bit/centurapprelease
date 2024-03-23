import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminVisionAdd(){
    
    const [vision, setVision] = useState({
        vision: '',
        enabled: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVision(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlevisionbodyChange = (value) => {
        setVision(prevState => ({
            ...prevState,
            vision: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}api/addnewmgmtvision`, vision);
            window.location.reload();
        } catch (error) {
            console.error('Error adding vision:', error);
            alert('Failed to add vision. Please try again.');
        }
        setLoading(false);
    };

    return (
            <div>
                <h1>Add Vision</h1>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div>
                        <label>Vision:</label>
                        <ReactQuill
                            value={vision.vision}
                            onChange={handlevisionbodyChange}
                        />
                    </div>
                    <div>
                        <br />
                        <div className="ui checkbox">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={vision.enabled === '1'} // Assuming '1' represents true and '0' represents false
                                onChange={(e) => setVision(prevState => ({ ...prevState, enabled: e.target.checked ? '1' : '0' }))}
                            />
                            <label>Enabled</label>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className='ui button primary' disabled={loading}>
                        {loading ? 'Saving... Please Wait!' : 'Add vision'}
                    </button>
                </form>
            </div>
    );
}
