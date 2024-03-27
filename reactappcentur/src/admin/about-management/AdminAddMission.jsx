import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {Icon} from 'semantic-ui-react'

export default function AdminMissionAdd(){
    
    const [mission, setMission] = useState({
        mission: '',
        enabled: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMission(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlemissionbodyChange = (value) => {
        setMission(prevState => ({
            ...prevState,
            mission: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}api/addnewmgmtmission`, mission);
            window.location.reload();
        } catch (error) {
            console.error('Error adding mission:', error);
            alert('Failed to add mission. Please try again.');
        }
        setLoading(false);
    };

    return (
            <div>
                <h4>About Management > Add Mission</h4>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div>
                        <label>Mission:</label>
                        <ReactQuill
                            value={mission.mission}
                            onChange={handlemissionbodyChange}
                        />
                    </div>
                    <div>
                        <br />
                        <div className="ui checkbox">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={mission.enabled === '1'} // Assuming '1' represents true and '0' represents false
                                onChange={(e) => setMission(prevState => ({ ...prevState, enabled: e.target.checked ? '1' : '0' }))}
                            />
                            <label>Enabled</label>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className='ui button tiny primary' disabled={loading}>
                        <Icon name="save"/> {loading ? 'Saving... Please Wait!' : 'Add mission'}
                    </button>
                </form>
            </div>
    );
}
