import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from './Menu'
import '../styles/custom_services.css'
import spinner from '../web_images/spinner.svg';
import Footer from "./Footer";
import { apiUrl } from "../services/BackendAPIUrl";

export default function Services(){

    const [services, setServices] = useState([]);

    useEffect(() => {

        const getAllServices = async () => {
            try {
                const response = await axios.get(apiUrl+'api/getallservices');
                setServices(response.data.servicedetails);
                console.log(response.data);
            } catch (e) {
                console.error('problem with api', e);
            }
        }

        getAllServices();

    }, []);

    return (
        <div>
            <Menu />
            <div className="ui container">
                <h1 className="services_h1">Our Services</h1>
                <p>
                At Centur Healthcare Trading Corp, we're dedicated to providing top-notch services to meet your medical needs. From equipment provisioning to troubleshooting and supplying reagents, we offer comprehensive solutions tailored to your requirements. Whether you're a healthcare facility, laboratory, or medical professional, we're here to support you every step of the way. Explore our services below and discover how we can help you succeed.
                </p>
                {services.length === 0 ? (
                    <div className="" style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '15%'}}>
                        <img src={spinner} alt="Logo" className="ui centered" />
                    </div>
                ) : (
                    <div style={{paddingLeft: '20px'}}>
                        {services.map((service) => (
                            <div key={service.id}>
                                <p dangerouslySetInnerHTML={{ __html: service.services  }} />
                            </div>
                        ))}
                    </div>
                )}
                    {/* <li>Medical equipment sales</li>
                    <li>Pharmaceutical distribution</li>
                    <li>Healthcare consulting</li>
                    <li>Medical supplies procurement</li>
                    <li>Healthcare technology solutions</li>
                    <li>Medical training and education</li>
                    <li>Healthcare logistics and supply chain management</li> */}
            </div>
            <div style={{paddingTop: '25%'}}></div>
            <Footer />
        </div>
    )
}