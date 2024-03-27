import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";
// import AdminHeaderAdd from "./AdminHeaderAdd";
import { Icon } from "semantic-ui-react";

export default function IndexTestimonial() {
    const [testimonialData, setTestimonial] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedTestimonial, setEditedTestimonial] = useState({
        id: null,
        testimonial_author: '',
        testimonial_author_designation: '',
        testimonial_author_gender: '',
        testimonial_feedback: '',
        enabled: false
    });

    const [saving, setSaving] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false); 

    useEffect(() => {
        const fetTestimonials = async () => {
            try {
                const response = await axios.get(apiUrl + 'api/getmgmttestimonials');
                setTestimonial(response.data.testimonial);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetTestimonials();
    }, []);

    const handleEdit = (header) => {
        setEditedTestimonial({ id: header.id, title: header.header_title, body: header.header_body, enabled: header.enabled });
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(apiUrl + `api/updatemgmtheader/${editedTestimonial.id}`, {
                header_title: editedTestimonial.title,
                header_body: editedTestimonial.body,
                enabled: editedTestimonial.enabled
            });

            const response = await axios.get(apiUrl + 'api/getmgmtheader');
            setTestimonial(response.data.header);

            setEditMode(false);
            setEditedTestimonial({ id: null, title: '', body: '', enabled: false });
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setSaving(false);
        }
    }

    const handleCancel = () => {
        setEditMode(false);
        setEditedTestimonial({ id: null, title: '', body: '', enabled: false });
        setShowAddForm(false);
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(apiUrl + `api/deletemgmtheader/${id}`);
            const updatedHeaders = testimonialData.filter(header => header.id !== id);
            setTestimonial(updatedHeaders);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    const handleAddButtonClick = () => {
        setShowAddForm(true);
    };

    const handleCareerAdded = () => {
        setShowAddForm(false);
    };

    const handleEditChange = (e, field) => {
        const { value, type, checked } = e.target;
        setEditedTestimonial(prevState => ({
            ...prevState,
            [field]: type === "checkbox" ? checked : value
        }));
    }

    return (
        <Layout>
            <div>
                <h1>Testimonials Management</h1>
                {!showAddForm && (
                    <button className="ui button tiny teal" onClick={handleAddButtonClick}>
                        <Icon name="plus square"/> Add Testimonial
                    </button>
                )}
                {!showAddForm && (
                <div>
                    {saving && (
                        <div className="ui active centered inline loader"></div>
                    )}
                    
                <br />
                    {!saving && (
                        <table className="ui table bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '25%' }}>Author</th>
                                    <th style={{ width: '50%' }}>Testimonial</th>
                                    <th style={{ width: '25%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonialData.map(header => (
                                    <tr key={header.id}>
                                        <td style={{ width: '25%' }}>
                                            {editMode && editedTestimonial.id === header.id ?
                                                <form className="ui form">
                                                    <input
                                                        value={editedTestimonial.title}
                                                        onChange={(e) => setEditedTestimonial({ ...editedTestimonial, title: e.target.value })}
                                                    />
                                                    <div className="ui checkbox">
                                                        <input
                                                            type="checkbox"
                                                            name="enabled"
                                                            checked={editedTestimonial.enabled}
                                                            onChange={(e) => handleEditChange(e, 'enabled')}
                                                        />
                                                        <label>Enabled</label>
                                                    </div>
                                                </form>
                                                :
                                                <div className="field">
                                                    <p>{header.header_title}</p>
                                                    <p>Status: {header.enabled === 1 ? "Enabled" : "Disabled"}</p>
                                                </div>
                                            }
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            {editMode && editedTestimonial.id === header.id ?
                                                <ReactQuill
                                                    value={editedTestimonial.body}
                                                    onChange={(value) => setEditedTestimonial({ ...editedTestimonial, body: value })}
                                                style={{height: '100%'}}/>
                                                :
                                                <div dangerouslySetInnerHTML={{ __html: header.header_body }} />
                                            }
                                        </td>
                                        <td style={{ width: '25%' }}>
                                            {editMode && editedTestimonial.id === header.id ?
                                                <div>
                                                    <button className="ui button primary tiny" onClick={handleSave}>
                                                        <Icon name="save"/> {saving ? "Saving..." : "Save"}
                                                    </button>
                                                    &ensp;
                                                    <button className="ui button tiny" onClick={handleCancel}><Icon name="cancel" /> Cancel</button>
                                                </div>
                                                :
                                                <div>
                                                    <button className="ui button tiny" onClick={() => handleEdit(header)}><Icon name="edit" />Edit</button>
                                                    &ensp;
                                                    <button className="ui button tiny red" onClick={() => handleDelete(header.id)}><Icon name="trash" /> Delete</button>
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
                        {/* <AdminHeaderAdd onCareerAdded={handleCareerAdded} /> */}
                        <br />
                        <button className="ui button tiny" onClick={handleCancel}>
                            <Icon name="cancel"/> Cancel
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}
