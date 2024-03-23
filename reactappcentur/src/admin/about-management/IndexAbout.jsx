import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";
import AdminMissionAdd from "./AdminAddMission";
import AdminVisionAdd from "./AdminAddVision";

export default function IndexAbout() {

    const [missionData, setMissionData] = useState([]);
    const [editModeMission, setEditModeMission] = useState(false);
    const [editedMission, setEditedMission] = useState({ id: null, mission_text: '', enabled: false });
    const [savingMission, setSavingMission] = useState(false);

    const [visionData, setVisionData] = useState([]);
    const [editModeVision, setEditModeVision] = useState(false);
    const [editedVision, setEditedVision] = useState({ id: null, vision_text: '', enabled: false });
    const [savingVision, setSavingVision] = useState(false);

    
    const [showAddMissionForm, setShowAddMissionForm] = useState(false); 
    const [showAddVisionForm, setShowAddVisionForm] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const missionResponse = await axios.get(apiUrl + 'api/getmgmtmission');
                const visionResponse = await axios.get(apiUrl + 'api/getmgmtvision');
                console.log(missionResponse.data.mission);
                setMissionData(missionResponse.data.mission);
                setVisionData(visionResponse.data.vision);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEditMission = (mission) => {
        setEditedMission({ id: mission.id, mission_text: mission.mission, enabled: mission.enabled });
        setEditModeMission(true);
    }

    const handleEditVision = (vision) => {
        setEditedVision({ id: vision.id, vision_text: vision.vision, enabled: vision.enabled });
        setEditModeVision(true);
    }

    const handleSaveMission = async () => {
        try {
            setSavingMission(true);
            await axios.put(apiUrl + `api/updatemgmtmission/${editedMission.id}`, {
                mission: editedMission.mission_text,
                enabled: editedMission.enabled
            });

            const response = await axios.get(apiUrl + 'api/getmgmtmission');
            setMissionData(response.data.mission);

            setEditModeMission(false);
            setEditedMission({ id: null, mission_text: '', enabled: false });
        } catch (error) {
            console.error('Error updating mission:', error);
        } finally {
            setSavingMission(false);
        }
    }

    const handleSaveVision = async () => {
        try {
            setSavingVision(true);
            await axios.put(apiUrl + `api/updatemgmtvision/${editedVision.id}`, {
                vision: editedVision.vision_text,
                enabled: editedVision.enabled
            });

            const response = await axios.get(apiUrl + 'api/getmgmtvision');
            setVisionData(response.data.vision);

            setEditModeVision(false);
            setEditedVision({ id: null, vision_text: '', enabled: false });
        } catch (error) {
            console.error('Error updating vision:', error);
        } finally {
            setSavingVision(false);
        }
    }

    const handleCancelMission = () => {
        setEditModeMission(false);
        setEditedMission({ id: null, mission_text: '', enabled: false });
        setShowAddMissionForm(false);
    }

    const handleCancelVision = () => {
        setEditModeVision(false);
        setEditedVision({ id: null, vision_text: '', enabled: false });
        setShowAddVisionForm(false);
    }

    const handleDeleteMission = async (id) => {
        try {
            await axios.post(apiUrl + `api/deletemgmtmission/${id}`);
            const updatedHeaders = missionData.filter(mission => mission.id !== id);
            setMissionData(updatedHeaders);
        } catch (error) {
            console.error('Error deleting mission:', error);
        }
    }

    const handleDeleteVision = async (id) => {
        try {
            await axios.post(apiUrl + `api/deletemgmtvision/${id}`);
            const updatedHeaders = visionData.filter(header => header.id !== id);
            setVisionData(updatedHeaders);
        } catch (error) {
            console.error('Error deleting vision:', error);
        }
    }

    const handleAddMissionButtonClick = () => {
        setShowAddMissionForm(true);
    };
    const handleAddVisionButtonClick = () => {
        setShowAddVisionForm(true);
    };

    const handleMissionAdded = () => {
        setShowAddMissionForm(false);
    };
    const handleVisionAdded = () => {
        setShowAddVisionForm(false);
    };

    const handleEditChangeMissionStatus = (e, field) => {
        const { value, type, checked } = e.target;
        setEditedMission(prevState => ({
            ...prevState,
            [field]: type === "checkbox" ? checked : value
        }));
    }
    const handleEditChangeVisionStatus = (e, field) => {
        const { value, type, checked } = e.target;
        setEditedVision(prevState => ({
            ...prevState,
            [field]: type === "checkbox" ? checked : value
        }));
    }

    return (
        <Layout>
            <div>
                <h1>Mission & Vision Management</h1>
                {/* <h2>Mission</h2> */}
                {!showAddMissionForm && (
                    <button className="ui button tiny" onClick={handleAddMissionButtonClick}>
                        Add Mission
                    </button>
                )}

                {!showAddMissionForm && (
                    <div>
                    {savingMission && (
                        <div className="ui active centered inline loader"></div>
                    )}
                    {!savingMission && (
                        <table className="ui table bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '50%' }}>Mission</th>
                                    <th style={{ width: '25%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {missionData.map(mission => (
                                    <tr key={mission.id}>
                                        <td style={{ width: '50%' }}>
                                            {editModeMission && editedMission.id === mission.id ?
                                                
                                                <div>
                                                <ReactQuill
                                                    value={editedMission.mission_text}
                                                    onChange={(value) => setEditedMission({ ...editedMission, mission_text: value })}
                                                    style={{ height: '100%' }}
                                                />
                                                    <div className="ui checkbox">
                                                        <input
                                                            type="checkbox"
                                                            name="enabled"
                                                            checked={editedMission.enabled}
                                                            onChange={(e) => handleEditChangeMissionStatus(e, 'enabled')}
                                                        />
                                                        <label>Enabled</label>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <div dangerouslySetInnerHTML={{ __html: mission.mission }} />
                                                    <br />
                                                    Status: {mission.enabled === 1 ? "Enabled" : "Disabled"}
                                                </div>
                                            }
                                        </td>
                                        <td style={{ width: '25%' }}>
                                            {editModeMission && editedMission.id === mission.id ?
                                                <div>
                                                    <button className="ui button primary" onClick={handleSaveMission}>
                                                        {savingMission ? "Saving..." : "Save"}
                                                    </button>
                                                    &ensp;
                                                    <button className="ui button" onClick={handleCancelMission}>Cancel</button>
                                                </div>
                                                :
                                                <div>
                                                    <button className="ui button" onClick={() => handleEditMission(mission)}>Edit</button>
                                                    &ensp;
                                                    <button className="ui button red" onClick={() => handleDeleteMission(mission.id)}>Delete</button>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                   
                    {/* <h2>Vision</h2> */}
                    {!showAddVisionForm && (
                        <button className="ui button tiny" onClick={handleAddVisionButtonClick}>
                            Add Vision
                        </button>
                    )}
                    {savingVision && (
                        <div className="ui active centered inline loader"></div>
                    )}
                    {!savingVision && (
                        <table className="ui table bordered">
                            <thead>
                                <tr>
                                    <th style={{ width: '50%' }}>Vision</th>
                                    <th style={{ width: '25%' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visionData.map(vision => (
                                    <tr key={vision.id}>
                                        <td style={{ width: '50%' }}>
                                            {editModeVision && editedVision.id === vision.id ?
                                                <div>
                                                    <ReactQuill
                                                        value={editedVision.vision_text}
                                                        onChange={(value) => setEditedVision({ ...editedVision, vision_text: value })}
                                                        style={{ height: '100%' }}
                                                    />
                                                    <div className="ui checkbox">
                                                        <input
                                                            type="checkbox"
                                                            name="enabled"
                                                            checked={editedVision.enabled}
                                                            onChange={(e) => handleEditChangeVisionStatus(e, 'enabled')}
                                                        />
                                                        <label>Enabled</label>
                                                    </div>
                                                </div>
                                                :
                                                <div>
                                                    <div dangerouslySetInnerHTML={{ __html: vision.vision }} />
                                                    <br />
                                                    Status: {vision.enabled === 1 ? "Enabled" : "Disabled"}
                                                </div>
                                            }
                                        </td>
                                        <td style={{ width: '25%' }}>
                                            {editModeVision && editedVision.id === vision.id ?
                                                <div>
                                                    <button className="ui button primary" onClick={handleSaveVision}>
                                                        {savingVision ? "Saving..." : "Save"}
                                                    </button>
                                                    &ensp;
                                                    <button className="ui button" onClick={handleCancelVision}>Cancel</button>
                                                </div>
                                                :
                                                <div>
                                                    <button className="ui button" onClick={() => handleEditVision(vision)}>Edit</button>
                                                    &ensp;
                                                    <button className="ui button red" onClick={() => handleDeleteVision(vision.id)}>Delete</button>
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

                {showAddMissionForm && (
                    <div>
                        <AdminMissionAdd onCareerAdded={handleMissionAdded} />
                        <br />
                        <button className="ui button" onClick={handleCancelMission}>
                            Cancel
                        </button>
                    </div>
                )}
                {showAddVisionForm && (
                    <div>
                        <AdminVisionAdd onCareerAdded={handleVisionAdded} />
                        <br />
                        <button className="ui button" onClick={handleCancelVision}>
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    )
}
