import React, { useEffect, useState } from "react";
import axios from 'axios';
import Menu from './Menu'
import spinner from '../web_images/spinner.svg';
import '../styles/custom_contact.css'
import Footer from "./Footer";
import CompanyLocation from "./CompanyLocation"
import { apiUrl } from "../services/BackendAPIUrl";
import { Icon } from "semantic-ui-react";

export default function Contact(){

    const [contactDetails, setContactDetails] = useState([]);

    useEffect(() => {

        const getContactDetails = async () => {
            try {
                const response = await axios.get(apiUrl+'api/getcontactdetails');
                setContactDetails(response.data.contactdetails);
                console.log(response.data);
            } catch (e) {
                console.error('problem on api', e);
            }
        }

        getContactDetails();
    }, []);

    return (
        <div>
            <Menu />
            <div className="ui container">
                <h1 className="contact_h1"><Icon name='text telephone' size='large' color='green' /> Contact Us</h1>
                <p>
                Have questions or inquiries? Feel free to reach out to us! Whether you're looking for more information about our products or services, have feedback to share, or just want to say hello, we'd love to hear from you. Contact us using the details provided below, and we'll get back to you as soon as possible. Your satisfaction is our priority!
                </p>
                <div className="ui container">
                    {contactDetails.length === 0 ? (
                        <div className="" style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '15%'}}>
                            <img src={spinner} alt="Logo" className="ui centered" />
                        </div>
                    ) : (
                        <div className="ui segment">
                            <div className="ui list">
                            <div className="item">
                                <i className="phone icon"></i>
                                <div className="content">
                                    {contactDetails.map(contact => (
                                        <p key={contact.id}>Contact Number: {contact.contact_no }</p>
                                    ))}
                                </div>
                            </div>
                            <div className="item">
                                <i className="phone icon"></i>
                                <div className="content">
                                    {contactDetails.map(contact => (
                                        <p key={contact.id}>Telephone Number: {contact.tel_no }</p>
                                    ))}
                                </div>
                            </div>
                            <div className="item">
                                <i className="mail icon"></i>
                                <div className="content">
                                    {contactDetails.map(contact => (
                                        <p key={contact.id}>Email: {contact.email }</p>
                                    ))}
                                </div>
                            </div>
                            <div className="item">
                                <i className="building icon"></i>
                                <div className="content">
                                    {contactDetails.map(contact => (
                                        <p key={contact.id}>Company Address: {contact.company_address }</p>
                                    ))}
                                </div>
                            </div>
                            <div className="item">
                                <i className="facebook icon"></i>
                                <div className="content">
                                    {contactDetails.map(contact => (
                                        <p key={contact.id}>Facebook Page: <a href={contact.facebook_url } target="_blank" rel="noreferrer">Centur Healthcare Trading Corp.</a></p>
                                    ))}
                                </div>
                            </div>
                            <div className="item">
                                <i className="instagram icon"></i>
                                <div className="content">
                                    <a href="https://www.instagram.com/example">Instagram: @example</a>
                                </div>
                            </div>
                            <div className="item">
                                <i className="twitter icon"></i>
                                <div className="content">
                                <a href="https://twitter.com/example">Twitter: @example</a>
                                </div>
                            </div>
                            </div>
                        </div>
                    )}
                </div>
                {/* <div style={{justifyContent: 'center'}}>
                    <CompanyLocation />
                </div> */}
            </div>
            <div style={{paddingTop: '10%'}}></div>
            <Footer />
        </div>
    )
}