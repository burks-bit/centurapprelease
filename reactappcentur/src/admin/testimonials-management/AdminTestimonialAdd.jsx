import React, { useState } from 'react';
import axios from 'axios';
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Icon } from 'semantic-ui-react';

export default function AdminTestimonialAdd(){
    
    const [testimonial, setTestimonial] = useState({
        testimonial_author: '',
        testimonial_author_designation: '',
        testimonial_author_gender: '',
        testimonial_feedback: '',
        enabled: false
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTestimonial(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleHeaderbodyChange = (value) => {
        setTestimonial(prevState => ({
            ...prevState,
            testimonial_feedback: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${apiUrl}api/addnewmgmttestimonials`, testimonial);
            window.location.reload();
        } catch (error) {
            console.error('Error adding header:', error);
            alert('Failed to add header. Please try again.');
        }
        setLoading(false);
    };

    return (
            <div>
                <h4>Header Management > Add Header</h4>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div>
                        <label>Author:</label>
                        <input
                            type="text"
                            name="testimonial_author"
                            value={testimonial.testimonial_author}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Author Designation:</label>
                        <input
                            type="text"
                            name="testimonial_author_designation"
                            value={testimonial.testimonial_author_designation}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select name="testimonial_author_gender" onChange={handleChange} value={testimonial.testimonial_author_gender}>
                            <option selected>Select Gender</option>
                            <option value='Male'>Male</option>
                            <option value='Female'>Female</option>
                        </select>
                        {/* <input
                            type="text"
                            name="testimonial_author_gender"
                            value={testimonial.testimonial_author_gender}
                            onChange={handleChange}
                            required
                        /> */}
                    </div>
                    <div>
                        <label>Feedback:</label>
                        <ReactQuill
                            value={testimonial.testimonial_feedback}
                            onChange={handleHeaderbodyChange}
                        />
                    </div>
                    <div>
                        <br />
                        <div className="ui checkbox">
                            <input
                                type="checkbox"
                                name="enabled"
                                checked={testimonial.enabled === '1'} // Assuming '1' represents true and '0' represents false
                                onChange={(e) => setTestimonial(prevState => ({ ...prevState, enabled: e.target.checked ? '1' : '0' }))}
                            />
                            <label>Enabled</label>
                        </div>
                    </div>
                    <br />
                    <button type="submit" className='ui button primary tiny' disabled={loading}>
                        <Icon name='save' /> {loading ? 'Saving... Please Wait!' : 'Add header'}
                    </button>
                </form>
            </div>
    );
}
