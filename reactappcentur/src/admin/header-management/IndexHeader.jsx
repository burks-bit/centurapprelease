import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";

export default function IndexHeader() {
    const [headerData, setHeaderData] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editedHeader, setEditedHeader] = useState({ id: null, title: '', body: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const response = await axios.get(apiUrl + 'api/getmgmtheader');
                setHeaderData(response.data.header);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchHeaderData();
    }, []);

    const handleEdit = (header) => {
        setEditedHeader({ id: header.id, title: header.header_title, body: header.header_body });
        setEditMode(true);
    }

    const handleSave = async () => {
        try {
            setSaving(true);
            await axios.put(apiUrl + `api/updatemgmtheader/${editedHeader.id}`, {
                header_title: editedHeader.title,
                header_body: editedHeader.body
            });

            const response = await axios.get(apiUrl + 'api/getmgmtheader');
            setHeaderData(response.data.header);

            setEditMode(false);
            setEditedHeader({ id: null, title: '', body: '' });
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            setSaving(false);
        }
    }

    const handleCancel = () => {
        setEditMode(false);
        setEditedHeader({ id: null, title: '', body: '' });
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(apiUrl + `api/deletemgmtheader/${id}`);
            const updatedHeaders = headerData.filter(header => header.id !== id);
            setHeaderData(updatedHeaders);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    }

    return (
        <Layout>
            <div>
                <h1>Header Management</h1>
                {saving && (
                    <div className="ui active centered inline loader"></div>
                )}
                {!saving && (
                    <table className="ui table bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '25%' }}>Header Title</th>
                                <th style={{ width: '50%' }}>Header Body</th>
                                <th style={{ width: '25%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {headerData.map(header => (
                                <tr key={header.id}>
                                    <td style={{ width: '25%' }}>
                                        {editMode && editedHeader.id === header.id ?
                                            <form className="ui form">
                                                <input
                                                    value={editedHeader.title}
                                                    onChange={(e) => setEditedHeader({ ...editedHeader, title: e.target.value })}
                                                />
                                            </form>
                                            :
                                            <p>{header.header_title}</p>
                                        }
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        {editMode && editedHeader.id === header.id ?
                                            <ReactQuill
                                                value={editedHeader.body}
                                                onChange={(value) => setEditedHeader({ ...editedHeader, body: value })}
                                            style={{height: '100%'}}/>
                                            :
                                            <div dangerouslySetInnerHTML={{ __html: header.header_body }} />
                                        }
                                    </td>
                                    <td style={{ width: '25%' }}>
                                        {editMode && editedHeader.id === header.id ?
                                            <div>
                                                <button className="ui button primary" onClick={handleSave}>
                                                    {saving ? "Saving..." : "Save"}
                                                </button>
                                                &ensp;
                                                <button className="ui button" onClick={handleCancel}>Cancel</button>
                                            </div>
                                            :
                                            <div>
                                                <button className="ui button" onClick={() => handleEdit(header)}>Edit</button>
                                                &ensp;
                                                <button className="ui button red" onClick={() => handleDelete(header.id)}>Delete</button>
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
