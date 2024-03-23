import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from "../../services/BackendAPIUrl";
import "react-quill/dist/quill.snow.css";

export default function AdminContactAdd(){
    
    const [contact, setContact] = useState({
        contact_no: '',
        tel_no: '',
        email: '',
        company_address: '',
        facebook_url: '',
        ig_url: '',
        xtwitter_url: '',
        enabled: false,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        console.log(contact);
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}api/addnewmgmtcontact`, contact);
            window.location.reload();
        } catch (error) {
            console.error('Error adding contact:', error);
        }
        setLoading(false);
    };

    return (
            <div>
                <h1>Add Contact</h1>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div>
                        <label>Contact No.:</label>
                        <input
                            type="text"
                            name="contact_no"
                            value={contact.contact_no}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label>Tel No.:</label>
                        <input
                            type="text"
                            name="tel_no"
                            value={contact.tel_no}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label>Email:</label>
                        <input
                            type="text"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label>Company Address:</label>
                        <input
                            type="text"
                            name="company_address"
                            value={contact.company_address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label>Facebook URL:</label>
                        <input
                            type="text"
                            name="facebook_url"
                            value={contact.facebook_url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label>Instagram URL:</label>
                        <input
                            type="text"
                            name="ig_url"
                            value={contact.ig_url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <label>Twitter URL:</label>
                        <input
                            type="text"
                            name="xtwitter_url"
                            value={contact.xtwitter_url}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <div className="ui checkbox">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={contact.enabled === '1'} // Assuming '1' represents true and '0' represents false
                                onChange={(e) => setContact(prevState => ({ ...prevState, enabled: e.target.checked ? '1' : '0' }))}
                            />
                            <label>Enabled</label>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className='ui button primary' disabled={loading}>
                        {loading ? 'Saving... Please Wait!' : 'Add Contact'}
                    </button>
                </form>
            </div>
    );
}
