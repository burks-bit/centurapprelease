import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiUrl } from "../../services/BackendAPIUrl";

export default function IndexAbout() {

    const [missionData, setMissionData] = useState([]);
    const [editModeMission, setEditModeMission] = useState(false);
    const [editedMission, setEditedMission] = useState({ id: null, mission_text: '' });
    const [savingMission, setSavingMission] = useState(false);

    const [visionData, setVisionData] = useState([]);
    const [editModeVision, setEditModeVision] = useState(false);
    const [editedVision, setEditedVision] = useState({ id: null, vision_text: '' });
    const [savingVision, setSavingVision] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const missionResponse = await axios.get(apiUrl + 'api/getmgmtmission');
                const visionResponse = await axios.get(apiUrl + 'api/getmgmtvision');
                setMissionData(missionResponse.data.mission);
                setVisionData(visionResponse.data.vision);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEditMission = (mission) => {
        setEditedMission({ id: mission.id, mission_text: mission.mission });
        setEditModeMission(true);
    }

    const handleEditVision = (vision) => {
        setEditedVision({ id: vision.id, vision_text: vision.vision });
        setEditModeVision(true);
    }

    const handleSaveMission = async () => {
        try {
            setSavingMission(true);
            await axios.put(apiUrl + `api/updatemgmtmission/${editedMission.id}`, {
                mission: editedMission.mission_text
            });

            const response = await axios.get(apiUrl + 'api/getmgmtmission');
            setMissionData(response.data.mission);

            setEditModeMission(false);
            setEditedMission({ id: null, mission_text: '' });
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
                vision: editedVision.vision_text
            });

            const response = await axios.get(apiUrl + 'api/getmgmtvision');
            setVisionData(response.data.vision);

            setEditModeVision(false);
            setEditedVision({ id: null, vision_text: '' });
        } catch (error) {
            console.error('Error updating vision:', error);
        } finally {
            setSavingVision(false);
        }
    }

    const handleCancelMission = () => {
        setEditModeMission(false);
        setEditedMission({ id: null, mission_text: '' });
    }

    const handleCancelVision = () => {
        setEditModeVision(false);
        setEditedVision({ id: null, vision_text: '' });
    }

    const handleDeleteMission = async (id) => {
        try {
            await axios.delete(apiUrl + `api/deletemgmtheader/${id}`);
            const updatedHeaders = missionData.filter(header => header.id !== id);
            setMissionData(updatedHeaders);
        } catch (error) {
            console.error('Error deleting mission:', error);
        }
    }

    const handleDeleteVision = async (id) => {
        try {
            await axios.delete(apiUrl + `api/deletemgmtheader/${id}`);
            const updatedHeaders = visionData.filter(header => header.id !== id);
            setVisionData(updatedHeaders);
        } catch (error) {
            console.error('Error deleting vision:', error);
        }
    }

    return (
        <Layout>
            <div>
                <h1>Mission & Vision Management</h1>
                <h2>Mission</h2>
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
                                            <ReactQuill
                                                value={editedMission.mission_text}
                                                onChange={(value) => setEditedMission({ ...editedMission, mission_text: value })}
                                                style={{ height: '100%' }} />
                                            :
                                            <div dangerouslySetInnerHTML={{ __html: mission.mission }} />
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

                <h2>Vision</h2>
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
                                            <ReactQuill
                                                value={editedVision.vision_text}
                                                onChange={(value) => setEditedVision({ ...editedVision, vision_text: value })}
                                                style={{ height: '100%' }} />
                                            :
                                            <div dangerouslySetInnerHTML={{ __html: vision.vision }} />
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
        </Layout>
    )
}
