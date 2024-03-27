import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminhistoryAdd(){
    
    const [history, setHistory] = useState({
        company_history: '',
        enabled: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHistory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlehistorybodyChange = (value) => {
        setHistory(prevState => ({
            ...prevState,
            company_history: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}api/addnewmgmthistory`, history);
            window.location.reload();
        } catch (error) {
            console.error('Error adding history:', error);
            alert('Failed to add history. Please try again.');
        }
        setLoading(false);
    };

    return (
            <div>
                <h1>Add history</h1>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div>
                        <label>History Body:</label>
                        <ReactQuill
                            value={history.company_history}
                            onChange={handlehistorybodyChange}
                        />
                    </div>
                    <div>
                        <br />
                        <div className="ui checkbox">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={history.enabled === '1'} // Assuming '1' represents true and '0' represents false
                                onChange={(e) => setHistory(prevState => ({ ...prevState, enabled: e.target.checked ? '1' : '0' }))}
                            />
                            <label>Enabled</label>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className='ui button primary' disabled={loading}>
                        {loading ? 'Saving... Please Wait!' : 'Add history'}
                    </button>
                </form>
            </div>
    );
}
