import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";
import AdminchistoriesAdd from "./AdminHistoryAdd";
import {Icon} from 'semantic-ui-react'

export default function IndexHistory() {
    const [historyData, setHistoryData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedHistory, setEditedHistory] = useState({ id: null, company_history: '', enabled: false });
    const [saving, setSaving] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false); 

    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                const response = await axios.get(apiUrl + 'api/getmgmthistory');
                console.log(response.data.history);
                setHistoryData(response.data.history);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHistoryData();
    }, []);

    const handleEdit = (chistories) => {
        setEditedHistory({ id: chistories.id, company_history: chistories.company_history, enabled: chistories.enabled });
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(apiUrl + `api/updatemgmthistory/${editedHistory.id}`, {
                company_history: editedHistory.company_history,
                enabled: editedHistory.enabled
            });

            const response = await axios.get(apiUrl + 'api/getmgmthistory');
            setHistoryData(response.data.history);

            setEditMode(false);
            setEditedHistory({ id: null, company_history: '', enabled: false });
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setSaving(false);
        }
    }

    const handleCancel = () => {
        setEditMode(false);
        setEditedHistory({ id: null, company_history: '', enabled: false });
        setShowAddForm(false);
    }

    const handleDelete = async (id) => {
        try {
            await axios.post(apiUrl + `api/deletemgmthistory/${id}`);
            const updatedchistoriess = historyData.filter(historyData => historyData.id !== id);
            setHistoryData(updatedchistoriess);
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
        setEditedHistory(prevState => ({
            ...prevState,
            [field]: type === "checkbox" ? checked : value
        }));
    }

    return (
        <Layout>
            <div>
                <h1>History Management</h1>
                {!showAddForm && (
                    <button className="ui button tiny teal" onClick={handleAddButtonClick}>
                        <Icon name="plus square"/> Add
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
                                    <th style={{ width: '50%' }}>History</th>
                                    <th style={{ width: '25%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData.map(chistories => (
                                    <tr key={chistories.id}>
                                        
                                        <td style={{ width: '50%' }}>
                                            {editMode && editedHistory.id === chistories.id ?
                                                <div>
                                                    <ReactQuill
                                                    value={editedHistory.company_history}
                                                    onChange={(value) => setEditedHistory({ ...editedHistory, company_history: value })}
                                                        style={{height: '100%'}}/>
                                                        <div className="field">
                                                            <div className="ui checkbox">
                                                                <input
                                                                    type="checkbox"
                                                                    name="enabled"
                                                                    checked={editedHistory.enabled}
                                                                    onChange={(e) => handleEditChange(e, 'enabled')}
                                                                />
                                                                <label>Enabled</label>
                                                            </div>
                                                        </div>
                                                </div>
                                                :
                                                <div>
                                                    <div dangerouslySetInnerHTML={{ __html: chistories.company_history }} />
                                                    <br />
                                                    <p>Status: {chistories.enabled === 1 ? "Enabled" : "Disabled"}</p>
                                                </div>
                                            }
                                        </td>
                                        <td style={{ width: '25%' }}>
                                            {editMode && editedHistory.id === chistories.id ?
                                                <div>
                                                    <button className="ui button tiny primary" onClick={handleSave}>
                                                        <Icon name="save"/> {saving ? "Saving..." : "Save"}
                                                    </button>
                                                    &ensp;
                                                    <button className="ui button tiny" onClick={handleCancel}><Icon name="cancel"/> Cancel</button>
                                                </div>
                                                :
                                                <div>
                                                    <button className="ui button tiny" onClick={() => handleEdit(chistories)}><Icon name="edit"/> Edit</button>
                                                    &ensp;
                                                    <button className="ui button tiny red" onClick={() => handleDelete(chistories.id)}><Icon name="trash"/> Delete</button>
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
                        <AdminchistoriesAdd onCareerAdded={handleCareerAdded} />
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
