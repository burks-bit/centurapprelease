import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import { Link, useParams } from 'react-router-dom';
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Icon } from 'semantic-ui-react';

export default function AdminCareerDetails(){

    let {id} = useParams();
    const [career, setCareer] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedCareer, setEditedCareer] = useState({
        title: '',
        description: '',
        status: '',
    });

    useEffect(() => {
        const fetchCareer = async () => {
            try {
                const response = await axios.get(`${apiUrl}api/getspecificcareer/${id}`);
                console.log(response.data)
                setCareer(response.data.careers);
                setEditedCareer(response.data.careers);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchCareer();
    }, [id]);

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedCareer({ ...editedCareer, [name]: value });
    };

    const handleSaveButtonClick = async () => {
        try {
            const response = await axios.put(`${apiUrl}api/updatemgmtcareer/${id}`, editedCareer);
            console.log(response.data);
            if (response.data.status === "success") {
                setCareer(editedCareer);
                setEditMode(false);
            } else {
                console.error("Failed to update product:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleCancel = () => {
        // Reset editedCareer to the original product details and exit edit mode
        setEditedCareer(career);
        setEditMode(false);
    };

    return (
        <Layout>
            <div className='ui container'>
                <div>
                    {career ? (
                        <div>
                            <Link to={`/centurmanagement/careers-management/career-details/${career.id}`}><h1 className='products_h1'>{career.title}</h1></Link>
                            <div className="ui two column stackable grid" style={{marginTop: '20px'}}>
                                
                                <div className="column" style={{width: '70%'}}>
                                    {editMode ? (
                                        <div className="ui form">
                                            <div className="field">
                                                <label>Position Title</label>
                                                <input type="text" name="title" value={editedCareer.title} onChange={handleInputChange} />
                                            </div>
                                            <div className="field">
                                                <label>Job Description</label>
                                                {/* <textarea name="product_description" value={editedCareer.product_description} onChange={handleInputChange}></textarea> */}
                                                <ReactQuill 
                                                    value={editedCareer.description} 
                                                    onChange={(value) => handleInputChange({ target: { name: 'description', value } })} 
                                                />
                                            </div>
                                            <div className="field">
                                                <label>Hiring Status</label>
                                                <select
                                                        name="status"
                                                        value={editedCareer.status}
                                                        onChange={handleInputChange}
                                                        required
                                                    >
                                                    <option value="">Select Status</option>
                                                    <option value="open">Open</option>
                                                    <option value="closed">Closed</option>
                                                </select>
                                            </div>
                                            
                                            {/* Add more input fields for other product details */}
                                            {/* <button className="ui primary button" onClick={handleSaveButtonClick}>Save</button> */}
                                        </div>
                                    ) : (
                                        <div className="ui">
                                            <table className="ui compact celled table">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} style={{textAlign: 'center'}}>Job Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="tableth_careerdetails" style={{width: '33%', fontWeight: 'bold'}}>Job Title:</td>
                                                        <td>{career.title}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tableth_careerdetails" style={{width: '33%', fontWeight: 'bold'}}>Job Description:</td>
                                                        <td dangerouslySetInnerHTML={{ __html: career.description }} style={{paddingLeft: '20px'}} />
                                                    </tr>
                                                    <tr>
                                                        <td className="tableth_careerdetails" style={{width: '33%', fontWeight: 'bold'}}>Job Status:</td>
                                                        <td>{career.status}</td>
                                                    </tr>
                                                    {/* Additional rows */}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    <div style={{marginTop: '20px'}}>
                                        {editMode ? (
                                            <div>
                                                <button className="ui button primary tiny" onClick={handleSaveButtonClick}><Icon name='save'/> Save</button>
                                                <button className="ui button tiny" onClick={handleCancel}><Icon name='cancel'/> Cancel</button>
                                            </div>
                                        ) : (
                                            <button className="ui button tiny" onClick={handleEditButtonClick}><Icon name='edit'/> Edit</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <br />
                                <Link to="/centurmanagement/careers-management" className="ui button tiny" style={{marginTop: '50px'}}><i className="left chevron icon"></i> Back</Link>
                            </div>
                        </div>
                    ) : (
                        // <p>Loading...</p>
                        <div className="" style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '15%'}}>
                            <img src={spinner} alt="Logo" className="ui centered" />
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}
