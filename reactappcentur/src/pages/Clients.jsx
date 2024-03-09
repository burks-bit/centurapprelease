import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from './Menu'
// import { Link } from "react-router-dom";
import spinner from '../web_images/spinner.svg';
import '../styles/custom_clients.css'
import Footer from "./Footer";
import { apiUrl } from "../services/BackendAPIUrl";

export default function Clients(){

    const [clients, setclients] = useState([]);

    useEffect(() => {
        const fetchAllClients = async () => {
            try {
                const response = await axios.get(apiUrl+'api/getallclients');
                console.log(response.data)
                setclients(response.data.clients);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchAllClients();
    }, []);

    return (
        <div>
            <Menu />
            <div className="ui container">
                <h1 className="clients_h1">Our Clients</h1>
                <p>
                Curious about who we work with? Explore our list of valued clients below. We take pride in our partnerships and collaborations, and we're grateful for the opportunity to serve each and every one of them. Interested in joining our growing list of satisfied clients? Contact us today to learn more about our services and how we can support your business needs.
                </p>
                {clients.length === 0 ? (
                    <div className="" style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '15%'}}>
                        <img src={spinner} alt="Logo" className="ui centered" />
                    </div>
                ) : (
                    <div className="ui relaxed divided items">
                        {clients.map((client) => (
                            <div key={client.id} className="item">
                                <div className="ui image">
                                    <img src={`http://127.0.0.1:9000/client_logos/${client.client_logo}`} alt={client.client_logo}  style={{height: '60px', width: '60px'}}/>
                                </div>
                                <div className="content">
                                    <span className="header">{client.client_name}</span>
                                    <div className="meta">
                                        {client.category}
                                        {/* <a>Category</a> */}
                                    </div>
                                    <div className="description">
                                        {client.client_address}
                                    </div>
                                    <div className="extra">
                                        {/* <div className="ui right floated primary button">
                                            Primary
                                            <i className="right chevron icon"></i>
                                        </div> */}
                                        {/* <div className="ui label">Limited</div> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/* <div className='seeClients'>
                            <Link to="/clients">
                                <button className="ui inverted red button">See all clients and its testimonials <i className="right chevron icon"></i></button>
                            </Link>
                        </div> */}
                        
                        {/* <h1 className="clients_h1">Our Testimonials</h1> */}
                    </div>
                )}
                
            </div>
            <br />
            <br />
            <Footer />
        </div>
    )
}