import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";

export default function IndexCareer() {

    const [serviceData, serServiceData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedService, setEditedService] = useState({ id: null, services: ''});
    const [saving, setSaving] = useState(false);

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
        setEditedService({ id: service.id, services: service.services});
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(apiUrl + `api/updatemgmtservice/${editedService.id}`, {
                services: editedService.services
            });

            const response = await axios.get(apiUrl + 'api/getmgmtservice');
            serServiceData(response.data.service);

            setEditMode(false);
            setEditedService({ id: null, services: ''});
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setSaving(false);
        }
    }

    const handleCancel = () => {
        setEditMode(false);
        setEditedService({ id: null, services: ''});
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(apiUrl + `api/deletemgmtservices/${id}`);
            const updatedservicess = serviceData.filter(services => services.id !== id);
            serServiceData(updatedservicess);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    return (
        <Layout>
            <div>
                <h1>Career Management</h1>
                {saving && (
                    <div className="ui active centered inline loader"></div>
                )}
                {!saving && (
                    <table className="ui table bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '50%' }}>Positions</th>
                                <th style={{ width: '25%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {serviceData.map(service => (
                                <tr key={service.id}>
                                    <td style={{ width: '50%' }}>
                                        {editMode && editedService.id === service.id ?
                                            <ReactQuill
                                                value={editedService.services}
                                                onChange={(value) => setEditedService({ ...editedService, services: value })}
                                            style={{height: '100%'}}/>
                                            :
                                            <div style={{paddingLeft:'30px'}} dangerouslySetInnerHTML={{ __html: service.services }} />
                                        }
                                    </td>
                                    <td style={{ width: '25%' }}>
                                        {editMode && editedService.id === service.id ?
                                            <div>
                                                <button className="ui button primary" onClick={handleSave}>
                                                    {saving ? "Saving..." : "Save"}
                                                </button>
                                                &ensp;
                                                <button className="ui button" onClick={handleCancel}>Cancel</button>
                                            </div>
                                            :
                                            <div>
                                                <button className="ui button" onClick={() => handleEdit(service)}>Edit</button>
                                                &ensp;
                                                <button className="ui button red" onClick={() => handleDelete(service.id)}>Delete</button>
                                            </div>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Layout>
    )
}
