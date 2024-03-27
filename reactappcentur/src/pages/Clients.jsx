import React, { useState, useEffect } from "react";
import axios from "axios";
import Menu from './Menu'
import { Link } from "react-router-dom";
import spinner from '../web_images/spinner.svg';
import '../styles/custom_clients.css'
import Footer from "./Footer";
import { apiUrl } from "../services/BackendAPIUrl";
import { Icon } from "semantic-ui-react";
import {Grid, Card, Image} from "semantic-ui-react";

export default function Clients(){

    const [clients, setclients] = useState([]);
    const [testimonialData, setTestimonial] = useState([]);

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
        const fetTestimonials = async () => {
            try {
                const response = await axios.get(apiUrl + 'api/getwebdata');
                console.log(response.data.testimonial);
                setTestimonial(response.data.testimonial);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetTestimonials();

        fetchAllClients();
    }, []);

    return (
        <div>
            <Menu />
            <div className="ui container">
                <h1 className="clients_h1"><Icon name='hospital' size='large' color='green' /> Our Clients</h1>
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
                                    <img src={apiUrl+`client_logos/${client.client_logo}`} className="ui rounded image" alt={client.client_logo}  style={{height: '60px', width: '60px'}}/>
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

            <div className="ui container">
                <h1 className="clients_h1"><Icon name='announcement' size='large' color='green' />  Testimonials</h1>
                <p>
                Curious about who we work with? Explore our list of valued clients below. We take pride in our partnerships and collaborations, and we're grateful for the opportunity to serve each and every one of them. Interested in joining our growing list of satisfied clients? Contact us today to learn more about our services and how we can support your business needs.
                </p>
                {testimonialData.length === 0 ? (
                    <div className="" style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '15%'}}>
                        <img src={spinner} alt="Logo" className="ui centered" />
                    </div>
                ) : (
                    <Grid container stackable columns={3} textAlign='center' style={{ marginTop: '2em' }}>
                        <Grid.Row>
                            
                        {Array.from({ length: Math.ceil(testimonialData.length / 3) }, (_, rowIndex) => (
                            <div key={rowIndex} className="ui three column doubling stackable grid container slide">
                                {testimonialData.slice(rowIndex * 3, rowIndex * 3 + 3).map((testimonial, columnIndex) => (
                                    <div key={columnIndex} className="column">
                                        <Grid.Column>
                                            <Card fluid className="testimonial-card">
                                                <Card.Content>
                                                    {testimonial.testimonial_author_gender === 'Female' ? (
                                                        <Image src={apiUrl+`web_images/newfemale.jpg`} floated='right' size='tiny' alt="newfemale.jpg" />
                                                    ) : (
                                                        <Image src={apiUrl+`web_images/newmale.jpg`} floated='right' size='tiny' alt="newmale.jpg" />
                                                    )}
                                                    <br></br>
                                                    <Card.Header>{testimonial.testimonial_author}</Card.Header>
                                                    <Card.Meta>{testimonial.testimonial_author_designation}</Card.Meta>
                                                    <Card.Description>
                                                        "{testimonial.testimonial_feedback}"
                                                    </Card.Description>
                                                </Card.Content>
                                            </Card>
                                        </Grid.Column>
                                    </div>
                                ))}
                            </div>
                        ))}
                        </Grid.Row>
                    </Grid>
                )}
                
            </div>
            <br />
            <br />
            <Footer />
        </div>
    )
}