import React, { useState, useEffect } from 'react';
import { Grid, Button, Segment, Image, Header, Icon, Card, List } from 'semantic-ui-react';
import axios from 'axios';
import { Fade } from 'react-awesome-reveal';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import Footer from './Footer';
import CompanyLocation from './CompanyLocation';
import { apiUrl } from "../services/BackendAPIUrl";
// import Navbar from './Navbar';
// import centurLogo from '../web_images/centurlogo.png';



export default function Home(){

    // console.log({apiUrl});
    const [data, setData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [products, setProducts] = useState([]);
    const [clients, setclients] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchWebAppInfos = async () => {
          try {
            const getwebdata = await axios.get(apiUrl+'api/getwebdata');
            setData(getwebdata.data.webdata);
            
            const getTestimonials = await axios.get(apiUrl+'api/getwebdata');
            console.log(getTestimonials.data.testimonialwihtlimit);
            setTestimonials(getTestimonials.data.testimonialwihtlimit);

            const getproducts = await axios.get(apiUrl+'api/getproducts');
            setProducts(getproducts.data.products);

            const getclients = await axios.get(apiUrl+'api/getclients');
            setclients(getclients.data.clients);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchWebAppInfos();
    }, []);

    const nextSlide = () => {
        setCurrentIndex(currentIndex === products.length - 1 ? 0 : currentIndex + 1);
    };

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? products.length - 1 : currentIndex - 1);
    };

    return (
        <div>
            <Menu />

            <Fade direction=''>
                <Segment basic textAlign='center' style={{ height: '100vh' }} id='segmentWelcome'>
                    <Grid verticalAlign='middle'>
                        <Grid.Row>
                            <Grid.Column>
                                <div id='imagewhenmm' >
                                    <h3 style={{paddingTop: '40px'}}>Welcome to</h3>
                                    <Image src={apiUrl+`web_images/centur-logo.jpg`} id='cenlogo' centered/>
                                </div>
                                <div id='description'>
                                    <h1 style={{padding: '10px', boxShadow: '0 4px 1px rgba(0, 0, 0, 0.1)', fontSize: '60px', lineHeight: '50px', fontFamily: 'calibri', fontWeight: 'lighter', letterSpacing: '-3px'}}>Where <br></br>Innovation<br></br> Meets<br></br> Excellence</h1>
                                </div>
                                {/* <h1 style={{ fontSize: '3em', fontWeight: 'bold'}}>Welcome to <span style={{color: '#152147'}}>Centur Healthcare Trading Corp.</span> </h1>
                                <p style={{ fontSize: '1.5em'}}>Where innovation meets excellence</p>
                                <Link to="/signup">
                                    <Button primary size='huge'>Get Started</Button>
                                </Link> */}
                                <Image
                                    src={apiUrl + `web_images/webpage.png`}
                                    centered
                                    className='onefrontpage_image'
                                    id='tohidewhemmm'
                                    // style={{
                                    //     height: '600px',
                                    //     borderRadius: '20px',
                                    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', // Box shadow style
                                    // }}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Fade>

            <Fade direction=''>
                <Segment basic textAlign='center' style={{ background: '#f9f9f9' }}>
                    <Grid container stackable verticalAlign='middle'>
                        <Grid.Row textAlign='center'>
                            <Header as='h2' style={{ fontSize: '1.8em'}}>
                            <br></br>
                            {data.map(header => (
                                <p key={header.id} dangerouslySetInnerHTML={{ __html: header.header_title }} />
                            ))}
                            </Header>
                            
                            {data.map(header => (
                                    <p key={header.id} dangerouslySetInnerHTML={{ __html: header.header_body}} style={{ fontSize: '1.2em' }}/>
                            ))}
                            {/* <p style={{ fontSize: '1.2em' }}>
                                At Centur Healthcare our mission is to revolutionize the way businesses operate by providing cutting-edge technology solutions. 
                                We are committed to empowering our clients to achieve their goals through innovation, reliability, and exceptional service. 
                                With a focus on customer success, we strive to exceed expectations and deliver measurable results that drive growth and 
                                unlock new opportunities. Your success is our mission.
                            </p> */}
                            {/* <Grid.Column width={8} textAlign='center'>
                                <Header as='h2' style={{ fontSize: '1.8em' }}>
                                    Welcome to <span style={{color: '#152147'}}>Centur Healthcare Trading Corp.</span>
                                </Header>
                                <p style={{ fontSize: '1.2em' }}>
                                    At Centur Healthcare our mission is to revolutionize the way businesses operate by providing cutting-edge technology solutions. 
                                    We are committed to empowering our clients to achieve their goals through innovation, reliability, and exceptional service. 
                                    With a focus on customer success, we strive to exceed expectations and deliver measurable results that drive growth and 
                                    unlock new opportunities. Your success is our mission.
                                </p>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <img src={apiUrl+`web_images/centurlogo.png`} alt="Company Image" style={{ width: '40%', height: 'auto' }} />
                            </Grid.Column> */}
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column textAlign='center'>
                                <Link to="/about">
                                    <Button primary size='huge'>Learn More  &ensp;<Icon name='lightbulb outline' size='large' color='white' /></Button>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </Fade>

            {/* <Segment basic textAlign='center' style={{ background: '#ffffff' }}>
                <Header as='h2' style={{ fontSize: '2em' }}>Key Features</Header>
                <Grid container stackable columns={3} textAlign='center' style={{ marginTop: '2em' }}>
                    <Grid.Row>
                        <Grid.Column>
                            <Icon name='rocket' size='big' color='blue' />
                            <Header as='h3'>Fast and Reliable</Header>
                            <p>Our platform is built for speed and reliability, ensuring smooth performance even during peak usage.</p>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon name='shield' size='big' color='green' />
                            <Header as='h3'>Secure</Header>
                            <p>We prioritize the security of your data, implementing industry-leading measures to protect your information.</p>
                        </Grid.Column>
                        <Grid.Column>
                            <Icon name='handshake' size='big' color='orange' />
                            <Header as='h3'>Customer Support</Header>
                            <p>Our dedicated support team is available 24/7 to assist you with any questions or issues you may encounter.</p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment> */}

            <Fade direction=''>
                <Segment basic textAlign='center' style={{ background: '#ffffff' }}>
                    <br></br>
                    <Header as='h2' style={{ fontSize: '2em' }}>Key Features</Header>
                    <Grid container stackable columns={3} textAlign='center' style={{ marginTop: '2em' }}>
                        <Grid.Row>
                            <Grid.Column>
                                <Icon name='cogs' size='big' color='teal' />
                                <Header as='h3'>Cutting-Edge Technology</Header>
                                <p>Centur Healthcare Trading Corp. leverages state-of-the-art machinery and advanced reagents for precision and efficiency.</p>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name='sync alternate' size='big' color='purple' />
                                <Header as='h3'>Reliable Performance</Header>
                                <p>Our platform is engineered for consistent performance, ensuring dependable results even during peak operational periods.</p>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name='lock' size='big' color='blue' />
                                <Header as='h3'>Data Security Assurance</Header>
                                <p>We prioritize the security of your data, implementing stringent measures to safeguard confidentiality and integrity.</p>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Icon name='headphones' size='big' color='yellow' />
                                <Header as='h3'>24/7 Dedicated Support</Header>
                                <p>Centur Healthcare Trading Corp. offers round-the-clock support to address any inquiries or issues promptly and effectively.</p>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name='settings' size='big' color='orange' />
                                <Header as='h3'>Onsite Support</Header>
                                <p>We provide onsite support services to ensure seamless integration and operation of our machinery within your facility.</p>
                            </Grid.Column>
                            <Grid.Column>
                                <Icon name='wrench' size='big' color='red' />
                                <Header as='h3'>Machine Maintenance</Header>
                                <p>Centur Healthcare Trading Corp. offers comprehensive machine maintenance programs to optimize performance and extend equipment lifespan.</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br></br>
                </Segment>
            </Fade>

            <Fade direction=''>
                <Segment basic textAlign='center' style={{ background: '#f5f5f5' }}>
                    <Header as='h2' style={{ fontSize: '2em' }}>Ready to Get Started?</Header>
                    <p style={{ fontSize: '1.2em' }}>Join thousands of satisfied customers today and unlock the full potential of our platform.</p>
                    <Button primary size='huge' as={Link} to='/contactus'>Contact Us  &ensp;<Icon name='paper plane outline' size='' color='white'/></Button>
                    <br></br>
                </Segment>
            </Fade>

            <Fade>
                <Segment basic textAlign='center' style={{ background: '#ffffff' }}>
                    <Header as='h2' style={{ fontSize: '2em' }}>See Our Products</Header>
                    <p>Discover cutting-edge analyzers and high-quality reagents designed to streamline laboratory workflows and enhance research and diagnostic capabilities. Our range of products offers precision, reliability, and versatility, empowering scientists and healthcare professionals to achieve accurate results efficiently. From automated analyzers for clinical chemistry and hematology to specialized reagents for molecular biology and immunoassays, our comprehensive solutions cater to diverse laboratory needs. Elevate your laboratory performance with our innovative products and unlock new possibilities in scientific discovery and patient care.</p>
                    <div className="slider" >
                        <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                            {products.map((product) => (
                                <div key={product.id} className="slide">
                                    <div className="slide-content">
                                        <img src={apiUrl+`product_images/${product.product_image}`} alt={product.product_image} className='product-image'/>
                                        <div className="slide-title">{product.product_name}</div>
                                        <div className="slide-model">Model: {product.product_model}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="prev" onClick={prevSlide}>&#10094;</button>
                        <button className="next" onClick={nextSlide}>&#10095;</button>
                    </div>
                    <div className='seeAllProducts'>
                        <Link to="/products">
                            <button className="ui red button">See all products<i className="right chevron icon"></i></button>
                        </Link>
                    </div>
                    <br></br>
                </Segment>
            </Fade>

            <Fade direction=''>
                <Segment basic textAlign='center' style={{ background: '#f5f5f5' }}>
                    <Header as='h2' style={{ fontSize: '2em' }}>What Our Customers Say</Header>
                    <Grid container stackable columns={3} textAlign='center' style={{ marginTop: '2em' }}>
                        <Grid.Row>
                            {testimonials.map(testimonial => (
                                <Grid.Column key={testimonial.id} >
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
                                                "<p dangerouslySetInnerHTML={{ __html: testimonial.testimonial_feedback }} />"
                                            </Card.Description>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            ))}
                        </Grid.Row>
                        <Button color='violet' size='huge' as={Link} to='/clients'>See All <Icon name='angle right' size='small' color='white'/></Button>
                    </Grid>
                    <br></br>
                </Segment>
            </Fade>
            <br></br>
            <br></br>

            {/* <Segment basic textAlign='center' style={{ background: '#333', color: '#fff' }}>
                <Grid container stackable columns={3}>
                    <Grid.Column>
                        <Header as='h4' content='About Us' />
                        <List>
                            <List.Item as={Link} to='/about'>Company Overview</List.Item>
                            <List.Item as={Link} to='/mission'>Mission</List.Item>
                            <List.Item as={Link} to='/vision'>Vision</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h4' content='Contact Us' />
                        <List>
                            <List.Item>123 Street, City</List.Item>
                            <List.Item>Email: info@example.com</List.Item>
                            <List.Item>Phone: +123 456 7890</List.Item>
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        <Header as='h4' content='Legal' />
                        <List>
                            <List.Item as={Link} to='/terms'>Terms of Service</List.Item>
                            <List.Item as={Link} to='/privacy'>Privacy Policy</List.Item>
                        </List>
                    </Grid.Column>
                </Grid>
                <p style={{ marginTop: '2em' }}>© 2024 Your Company. All rights reserved.</p>
            </Segment> */}

                                                    
            <Footer />
        </div>
    )
}