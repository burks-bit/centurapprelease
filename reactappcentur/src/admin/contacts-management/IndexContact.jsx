import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";
import AdminContactAdd from "./AdminContactAdd";

export default function IndexContact() {
    
    const [contactData, setContactData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedContact, setEditedContact] = useState({
        contact_no: "",
        tel_no: "",
        email: "",
        company_address: "",
        facebook_url: "",
        ig_url: "",
        xtwitter_url: "",
        enabled: false
    });
    const [showAddForm, setShowAddForm] = useState(false);
    
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchContactData = async () => {
            try {
                const response = await axios.get(apiUrl + 'api/getmgmtcontact');
                setContactData(response.data.contact);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchContactData();
    }, []);

    const handleEdit = (contact) => {
        setEditedContact({
            id: contact.id,
            contact_no: contact.contact_no,
            tel_no: contact.tel_no,
            email: contact.email,
            company_address: contact.company_address,
            facebook_url: contact.facebook_url,
            ig_url: contact.ig_url,
            xtwitter_url: contact.xtwitter_url,
            enabled: contact.enabled
        });
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(apiUrl + `api/updatemgmtcontact/${editedContact.id}`, {
                contact_no: editedContact.contact_no,
                tel_no: editedContact.tel_no,
                email: editedContact.email,
                company_address: editedContact.company_address,
                facebook_url: editedContact.facebook_url,
                ig_url: editedContact.ig_url,
                xtwitter_url: editedContact.xtwitter_url,
                enabled: editedContact.enabled
            });

            const response = await axios.get(apiUrl + 'api/getmgmtcontact');
            setContactData(response.data.contact);

            setEditMode(false);
            setEditedContact({
                contact_no: "",
                tel_no: "",
                email: "",
                company_address: "",
                facebook_url: "",
                ig_url: "",
                xtwitter_url: "",
                enabled: false
            });
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setSaving(false);
        }
    }

    const handleCancel = () => {
        setEditMode(false);
        setEditedContact({
            contact_no: "",
            tel_no: "",
            email: "",
            company_address: "",
            facebook_url: "",
            ig_url: "",
            xtwitter_url: "",
            enabled: false
        });
        setShowAddForm(false);
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(apiUrl + `api/deletemgmtcontact/${id}`);
            const updatedContacts = contactData.filter(contact => contact.id !== id);
            setContactData(updatedContacts);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const handleEditChange = (e, field) => {
        const { value, type, checked } = e.target;
        setEditedContact(prevState => ({
            ...prevState,
            [field]: type === "checkbox" ? checked : value
        }));
    }
    
    const handleAddButtonClick = () => {
        setShowAddForm(true);
    };

    const handleCareerAdded = () => {
        setShowAddForm(false);
    };

    return (
        <Layout>
            <div>
                <h1>Contacts Management</h1>
                {!showAddForm && (
                    <button className="ui button" onClick={handleAddButtonClick}>
                        Add Contact
                    </button>
                )}
                
                {!showAddForm && (
                    <div>
                        {saving && (
                            <div className="ui active centered inline loader"></div>
                        )}
                        {!saving && (
                            <table className="ui table bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }}>Contact Details</th>
                                        <th style={{ width: '25%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactData.map(contact => (
                                        <tr key={contact.id}>
                                            <td style={{ width: '50%' }}>
                                                {editMode && editedContact.id === contact.id ?
                                                    <form className="ui form">
                                                        <div className="field">
                                                            <label>Contact Number</label>
                                                            <input
                                                                type="text"
                                                                name="contact_no"
                                                                value={editedContact.contact_no || ''}
                                                                onChange={(e) => handleEditChange(e, 'contact_no')}
                                                            />
                                                        </div>
                                                        <div className="field">
                                                            <label>Telephone Number</label>
                                                            <input
                                                                type="text"
                                                                name="tel_no"
                                                                value={editedContact.tel_no || ''}
                                                                onChange={(e) => handleEditChange(e, 'tel_no')}
                                                            />
                                                        </div>
                                                        <div className="field">
                                                            <label>Email</label>
                                                            <input
                                                                type="email"
                                                                name="email"
                                                                value={editedContact.email || ''}
                                                                onChange={(e) => handleEditChange(e, 'email')}
                                                            />
                                                        </div>
                                                        <div className="field">
                                                            <label>Company Address</label>
                                                            <input
                                                                type="text"
                                                                name="company_address"
                                                                value={editedContact.company_address || ''}
                                                                onChange={(e) => handleEditChange(e, 'company_address')}
                                                            />
                                                        </div>
                                                        <div className="field">
                                                            <label>Facebook URL</label>
                                                            <input
                                                                type="text"
                                                                name="facebook_url"
                                                                value={editedContact.facebook_url || ''}
                                                                onChange={(e) => handleEditChange(e, 'facebook_url')}
                                                            />
                                                        </div>
                                                        <div className="field">
                                                            <label>Instagram URL</label>
                                                            <input
                                                                type="text"
                                                                name="ig_url"
                                                                value={editedContact.ig_url || ''}
                                                                onChange={(e) => handleEditChange(e, 'ig_url')}
                                                            />
                                                        </div>
                                                        <div className="field">
                                                            <label>Twitter URL</label>
                                                            <input
                                                                type="text"
                                                                name="xtwitter_url"
                                                                value={editedContact.xtwitter_url || ''}
                                                                onChange={(e) => handleEditChange(e, 'xtwitter_url')}
                                                            />
                                                        </div>
                                                        <div className="field">
                                                            <div className="ui checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    name="enabled"
                                                                    checked={editedContact.enabled}
                                                                    onChange={(e) => handleEditChange(e, 'enabled')}
                                                                />
                                                                <label>Enabled</label>
                                                            </div>
                                                        </div>
                                                    </form>
                                                    :
                                                    <div>
                                                        <p><b>Contact Number:</b> {contact.contact_no}</p>
                                                        <p><b>Telephone Number:</b> {contact.tel_no}</p>
                                                        <p><b>Email:</b> {contact.email}</p>
                                                        <p><b>Company Address:</b> {contact.company_address}</p>
                                                        <p><b>Facebook URL:</b> {contact.facebook_url}</p>
                                                        <p><b>Instagram URL:</b> {contact.ig_url}</p>
                                                        <p><b>Twitter URL:</b> {contact.xtwitter_url}</p>
                                                        <p><b>Enabled:</b> {contact.enabled ? 'Yes' : 'No'}</p>
                                                    </div>
                                                }
                                            </td>
                                            <td style={{ width: '25%' }}>
                                                {editMode && editedContact.id === contact.id ?
                                                    <div>
                                                        <button className="ui button primary" onClick={handleSave}>
                                                            {saving ? "Saving..." : "Save"}
                                                        </button>
                                                        &ensp;
                                                        <button className="ui button" onClick={handleCancel}>Cancel</button>
                                                    </div>
                                                    :
                                                    <div>
                                                        <button className="ui button" onClick={() => handleEdit(contact)}>Edit</button>
                                                        &ensp;
                                                        <button className="ui button red" onClick={() => handleDelete(contact.id)}>Delete</button>
                                                    </div>
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}

                {showAddForm && (
                    <div>
                        <AdminContactAdd onCareerAdded={handleCareerAdded} />
                        <br />
                        <button className="ui button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}
