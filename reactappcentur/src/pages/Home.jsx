import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchWebAppInfos = async () => {
          try {
            const getwebdata = await axios.get(apiUrl+'api/getwebdata');
            setData(getwebdata.data.webdata);

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

            {/* Sections Goes Here */}
            <section className="section1" id="home">
                <Fade direction='up'>
                    <div className="div_header_section1">
                        <img src="http://127.0.0.1:9000/web_images/centurlogo.png" className="ui centered image small" alt=""/>
                        {data.map(header => (
                            <h1 key={header.id}>{header.header_title}</h1>
                        ))}
                        {data.map(header => (
                            <p key={header.id}>{header.header_body}</p>
                        ))}
                    </div>
                </Fade>
            </section>

            <section className="section2" id="about">
                <Fade direction='left'>
                    <div className="div_header_section2">
                        <h1>Mission</h1>
                        {data.map(mission => (
                            <p dangerouslySetInnerHTML={{ __html: mission.mission }} />
                        ))}
                    </div>
                </Fade>
                <Fade direction='right' >
                    <div className="div_header_section2vision">
                        <h1>Vision</h1>
                        {data.map(vision => (
                            <p dangerouslySetInnerHTML={{ __html: vision.vision }} />
                        ))}
                        <a href="/about" className="ui inverted red button">
                            Read More <i className="right chevron icon"></i>
                        </a>
                    </div>
                </Fade>
            </section>

            <section className="section3" id="products">
                <Fade direction='' >
                    <div className="div_header_section3">
                        <h1>Our Products</h1>
                        <p>Discover cutting-edge analyzers and high-quality reagents designed to streamline laboratory workflows and enhance research and diagnostic capabilities. Our range of products offers precision, reliability, and versatility, empowering scientists and healthcare professionals to achieve accurate results efficiently. From automated analyzers for clinical chemistry and hematology to specialized reagents for molecular biology and immunoassays, our comprehensive solutions cater to diverse laboratory needs. Elevate your laboratory performance with our innovative products and unlock new possibilities in scientific discovery and patient care.</p>
                        <div className="slider" >
                            <div className="slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                                {products.map((product) => (
                                    <div key={product.id} className="slide">
                                        <div className="slide-content">
                                            <img src={`http://127.0.0.1:9000/product_images/${product.product_image}`} alt={product.product_image} className='product-image'/>
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
                                <button className="ui inverted red button">See all products <i className="right chevron icon"></i></button>
                            </Link>
                        </div>
                    </div>
                </Fade>
            </section>

            <section className="section4" id="clients">
                <Fade direction='' >
                    <div className="div_header_section4">
                        <h1>Our Clients</h1>
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
                            <div className='seeClients'>
                                <Link to="/clients">
                                    <button className="ui inverted violet button">See all clients and its testimonials <i className="right chevron icon"></i></button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Fade>
            </section>


            <section className="section5" id="">
                <div className="div_header_section5">
                    <h1>Our Location</h1>
                    <p>Explore our vibrant location at Unit B, PSMID Building, 116-9th Avenue, Quezon City, Philippines. Conveniently nestled in the heart of the city, our premises offer easy access to local amenities and attractions.</p>
                    <div style={{ padding: '20px', width: '30%', height: '400px', display: 'flex', justifyContent: 'center' }}>
                        <CompanyLocation />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}