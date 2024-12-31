import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";
// import AdminHeaderAdd from "./AdminHeaderAdd";
import { Icon, Image } from "semantic-ui-react";
import AdminTestimonialAdd from "./AdminTestimonialAdd";

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

    const handleEdit = (testimonial) => {
        setEditedTestimonial({
            id: testimonial.id,
            testimonial_author: testimonial.testimonial_author,
            testimonial_author_designation: testimonial.testimonial_author_designation,
            testimonial_author_gender: testimonial.testimonial_author_gender,
            testimonial_feedback: testimonial.testimonial_feedback,
            enabled: testimonial.enabled
        });
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(apiUrl + `api/updatemgmttestimonials/${editedTestimonial.id}`, {
                testimonial_author: editedTestimonial.testimonial_author,
                testimonial_author_designation: editedTestimonial.testimonial_author_designation,
                testimonial_author_gender: editedTestimonial.testimonial_author_gender,
                testimonial_feedback: editedTestimonial.testimonial_feedback,
                enabled: editedTestimonial.enabled
            });

            const response = await axios.get(apiUrl + 'api/getmgmttestimonials');
            setTestimonial(response.data.testimonial);

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
            await axios.post(apiUrl + `api/deletemgmttestimonial/${id}`);
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
                                    <th colSpan={2} style={{ width: '25%' }}>Author</th>
                                    <th style={{ width: '50%' }}>Testimonial</th>
                                    <th style={{ width: '25%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonialData.map(testimonial => (
                                    <tr key={testimonial.id}>
                                        <td>
                                            {testimonial.testimonial_author_gender === 'Female' ? (
                                                <Image src={apiUrl+`web_images/newfemale.jpg`} floated='right' size='tiny' alt="newfemale.jpg" />
                                            ) : (
                                                <Image src={apiUrl+`web_images/newmale.jpg`} floated='right' size='tiny' alt="newmale.jpg" />
                                            )}
                                        </td>
                                        <td style={{ width: '25%' }}>
                                            {editMode && editedTestimonial.id === testimonial.id ?
                                                <form className="ui form">
                                                    <input
                                                        value={editedTestimonial.testimonial_author}
                                                        onChange={(e) => setEditedTestimonial({ ...editedTestimonial, testimonial_author: e.target.value })}
                                                        style={{marginBottom: '10px'}}
                                                    />
                                                    <select onChange={(e) => setEditedTestimonial({ ...editedTestimonial, testimonial_author_gender: e.target.value })} style={{marginBottom: '10px'}}>
                                                        <option value="">Select Gender</option>
                                                        <option value="Female" selected={editedTestimonial.testimonial_author_gender === "Female"}>Female</option>
                                                        <option value="Male" selected={editedTestimonial.testimonial_author_gender === "Male"}>Male</option>
                                                    </select>
                                                    <input
                                                        value={editedTestimonial.testimonial_author_designation}
                                                        onChange={(e) => setEditedTestimonial({ ...editedTestimonial, testimonial_author_designation: e.target.value })}
                                                        style={{marginBottom: '10px'}}
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
                                                    <p style={{fontWeight: 'bold'}}>{testimonial.testimonial_author}, {testimonial.testimonial_author_designation}</p>
                                                    <p>Status: {testimonial.enabled === 1 ? "Enabled" : "Disabled"}</p>
                                                </div>
                                            }
                                        </td>
                                        <td style={{ width: '50%' }}>
                                            {editMode && editedTestimonial.id === testimonial.id ?
                                                <ReactQuill
                                                    value={editedTestimonial.testimonial_feedback}
                                                    onChange={(value) => setEditedTestimonial({ ...editedTestimonial, testimonial_feedback: value })}
                                                style={{height: '100%'}}/>
                                                :
                                                <div dangerouslySetInnerHTML={{ __html: testimonial.testimonial_feedback }} />
                                            }
                                        </td>
                                        <td style={{ width: '25%' }}>
                                            {editMode && editedTestimonial.id === testimonial.id ?
                                                <div>
                                                    <button className="ui button primary tiny" onClick={handleSave}>
                                                        <Icon name="save"/> {saving ? "Saving..." : "Save"}
                                                    </button>
                                                    &ensp;
                                                    <button className="ui button tiny" onClick={handleCancel}><Icon name="cancel" /> Cancel</button>
                                                </div>
                                                :
                                                <div>
                                                    <button className="ui button tiny" onClick={() => handleEdit(testimonial)}><Icon name="edit" />Edit</button>
                                                    &ensp;
                                                    <button className="ui button tiny red" onClick={() => handleDelete(testimonial.id)}><Icon name="trash" /> Delete</button>
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
                        <AdminTestimonialAdd onCareerAdded={handleCareerAdded} />
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
