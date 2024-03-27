import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from './Menu'
import spinner from '../web_images/spinner.svg';
import '../styles/custom_clients.css'
import Footer from "./Footer";
import { apiUrl } from "../services/BackendAPIUrl";
import { Link } from "react-router-dom";
import { Accordion, Icon } from 'semantic-ui-react';

export default function Careers() {
    const [careers, setCareers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(false);

    useEffect(() => {
        const fetchAllCareers = async () => {
            try {
                const response = await axios.get(apiUrl + 'api/getallcareers');
                setCareers(response.data.careers);
            } catch (error) {
                console.error('Error fetching careers:', error);
            }
        };

        fetchAllCareers();
    }, []);

    const handleClick = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <div>
            <Menu />
            <div className="ui container">
                <h1 className="clients_h1"><Icon name='list' size='large' color='green' /> Careers</h1>
                <p>
                    Curious about who we work with? Explore our list of valued clients below. We take pride in our partnerships and collaborations, and we're grateful for the opportunity to serve each and every one of them. Interested in joining our growing list of satisfied clients? Contact us today to learn more about our services and how we can support your business needs.
                </p>
                {careers.length === 0 ? (
                    <div className="" style={{ textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '15%' }}>
                        <img src={spinner} alt="Logo" className="ui centered" />
                    </div>
                ) : (
                    
                        <div className="">
                            <Accordion style={{width: '100%'}}>
                                {careers.map((career, index) => (
                                    <React.Fragment key={career.id}>
                                        <Accordion.Title
                                            active={activeIndex === index}
                                            index={index}
                                            onClick={() => handleClick(index)}
                                            style={{fontWeight: 'bold'}}
                                        >
                                            <Icon name='dropdown' />
                                            {career.title}&nbsp;
                                            ({career.status === 'open' ? (
                                                <span style={{ color: 'green' }}>Open</span>
                                            ) : (
                                                <span style={{ color: 'red' }}>Closed</span>
                                            )})
                                        </Accordion.Title>
                                        <Accordion.Content active={activeIndex === index}>
                                            {/* <p>{career.description}</p> */}
                                            <p style={{paddingLeft: '25px'}} dangerouslySetInnerHTML={{ __html: career.description }} />
                                            <p>Interested? Please refer to our <Link to="/contactus">Contact Page</Link> for your reference.</p>
                                        </Accordion.Content>
                                    </React.Fragment>
                                ))}
                            </Accordion>
                            {/* {careers.map((career) => (
                                <div key={career.id} className="item">
                                    <div className="content">
                                        <span className="header" style={{ color: '#171717' }}>{career.title}</span>
                                        <div className="meta">
                                            {career.status === 'open' ? (
                                                <div style={{ fontWeight: 'bold' }}>
                                                    Availability: <span style={{ color: 'green' }}>Open</span>
                                                </div>
                                            ) : (
                                                <div style={{ fontWeight: 'bold' }}>
                                                    Availability: <span style={{ color: 'red' }}>Closed</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="extra">
                                            <Link to="/dsa"> View Job Description </Link>
                                        </div>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    )}

            </div>
            <br />
            <br />
            <Footer />
        </div>
    )
}
