import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";
import AdminServiceAdd from "./AdminServiceAdd";
import {Icon} from 'semantic-ui-react'

export default function IndexService() {

    const [serviceData, serServiceData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedService, setEditedService] = useState({ id: null, services: '', enabled: false});
    const [saving, setSaving] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await axios.get(apiUrl + 'api/getmgmtservice');
                console.log(response.data.service)
                serServiceData(response.data.service);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchServiceData();
    }, []);

    const handleEdit = (service) => {
        setEditedService({ id: service.id, services: service.services, enabled: service.enabled});
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(apiUrl + `api/updatemgmtservice/${editedService.id}`, {
                services: editedService.services,
                enabled: editedService.enabled
            });

            const response = await axios.get(apiUrl + 'api/getmgmtservice');
            serServiceData(response.data.service);

            setEditMode(false);
            setEditedService({ id: null, services: '', enabled: false});
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setSaving(false);
        }
    }

    const handleCancel = () => {
        setEditMode(false);
        setEditedService({ id: null, services: ''});
        setShowAddForm(false);
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(apiUrl + `api/deletemgmtservices/${id}`);
            const updatedservicess = serviceData.filter(services => services.id !== id);
            serServiceData(updatedservicess);
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
        setEditedService(prevState => ({
            ...prevState,
            [field]: type === "checkbox" ? checked : value
        }));
    }

    return (
        <Layout>
            <div>
                <h1>Services Management</h1>
                {!showAddForm && (
                    <button className="ui button tiny teal" onClick={handleAddButtonClick}>
                        <Icon name="plus square"/> Add Service
                    </button>
                )}
                {!showAddForm && (
                    <div><br />
                        {saving && (
                            <div className="ui active centered inline loader"></div>
                        )}
                        {!saving && (
                            <table className="ui table bordered">
                                <thead>
                                    <tr>
                                        <th style={{ width: '50%' }}>Services</th>
                                        <th style={{ width: '25%' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {serviceData.map(service => (
                                        <tr key={service.id}>
                                            <td style={{ width: '50%' }}>
                                                {editMode && editedService.id === service.id ?
                                                    <div>
                                                        <ReactQuill
                                                        value={editedService.services}
                                                        onChange={(value) => setEditedService({ ...editedService, services: value })}
                                                        style={{height: '100%'}}/>
                                                        <div className="ui checkbox">
                                                            <input
                                                                type="checkbox"
                                                                name="enabled"
                                                                checked={editedService.enabled}
                                                                onChange={(e) => handleEditChange(e, 'enabled')}
                                                            />
                                                            <label>Enabled</label>
                                                        </div>
                                                    </div>
                                                    :
                                                    <div>
                                                        <div style={{paddingLeft:'30px'}} dangerouslySetInnerHTML={{ __html: service.services }} />
                                                        <br />
                                                        <p>Status: {service.enabled === 1 ? "Enabled" : "Disabled"}</p>
                                                    </div>
                                                }
                                            </td>
                                            <td style={{ width: '25%' }}>
                                                {editMode && editedService.id === service.id ?
                                                    <div>
                                                        <button className="ui button tiny primary" onClick={handleSave}>
                                                            <Icon name="save"/> {saving ? "Saving..." : "Save"}
                                                        </button>
                                                        &ensp;
                                                        <button className="ui button tiny" onClick={handleCancel}><Icon name="cancel"/> Cancel</button>
                                                    </div>
                                                    :
                                                    <div>
                                                        <button className="ui button tiny" onClick={() => handleEdit(service)}><Icon name="edit"/> Edit</button>
                                                        &ensp;
                                                        <button className="ui button tiny red" onClick={() => handleDelete(service.id)}><Icon name="trash"/> Delete</button>
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
                        <AdminServiceAdd onCareerAdded={handleCareerAdded} />
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
