import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from './Menu';
import Footer from './Footer';
import spinner from '../web_images/spinner.svg';
import { Link } from 'react-router-dom';
import '../styles/custom_products.css'
import { apiUrl } from '../services/BackendAPIUrl';
import { Icon } from 'semantic-ui-react';

export default function Products(){

    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(apiUrl+'api/getallproducts');
                console.log(response.data)
                setProducts(response.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <Menu />
            <div className='ui container'>
                <h1 className='products_h1'><Icon name='tags' size='large' color='green' /> Products</h1>
                <p>
                Explore our wide range of high-quality products designed to meet your needs. From innovative solutions to everyday essentials, we have something for everyone. Whether you're a business looking to streamline operations or an individual seeking top-notch products, we've got you covered. Browse our offerings below and discover what sets us apart.
                </p>
                {/* {products ? (
                    <h1></h1>
                ): (
                    <h1>Loading... Please wait</h1>
                )} */}
                {/* {Array.from({ length: Math.ceil(products.length / 3) }, (_, rowIndex) => (
                    <div key={rowIndex} className="ui three column doubling stackable grid container slide">
                        {products.slice(rowIndex * 3, rowIndex * 3 + 3).map((product, columnIndex) => (
                            <div key={columnIndex} className="column">
                                <Link to={`/products/details/${product.id}`}>
                                    <div className="ui segment product-box-product-page">
                                        <img src={`http://127.0.0.1:9000/product_images/${product.product_image}`} alt={product.product_image} className='product-image'/>
                                        <div className="slide-title-product-page">{product.product_name}</div>
                                        <div className="slide-model-product-page">Model: {product.product_model}</div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ))} */}
                {products.length === 0 ? (
                    <div className="" style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '15%'}}>
                        <img src={spinner} alt="Logo" className="ui centered" />
                    </div>
                ) : (
                    Array.from({ length: Math.ceil(products.length / 3) }, (_, rowIndex) => (
                        <div key={rowIndex} className="ui three column doubling stackable grid container slide">
                            {products.slice(rowIndex * 3, rowIndex * 3 + 3).map((product, columnIndex) => (
                                <div key={columnIndex} className="column">
                                    {/* <Link to={`/products/details/${product.id}`}> */}
                                        <div className="ui segment product-box-product-page">
                                            <img src={apiUrl+`product_images/${product.product_image}`} alt={product.product_image} className='product-image'/>
                                        </div>
                                        <div className="ui two column doubling stackable grid">
                                            <div className="column">
                                                <div className="slide-title-productlist-page">{product.product_name}</div>
                                                <div className="slide-model-product-page">Model: {product.product_model}</div>
                                            </div>
                                            <div className="column" style={{textAlign: 'right'}}>
                                                <Link to={`/products/details/${product.id}`}>
                                                    <button className="ui mini inverted red button">See Details <i className="right chevron icon"></i></button>
                                                </Link>
                                            </div>
                                        </div>
                                    {/* </Link> */}
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
            <br />
            <br />
            <Footer />

        </div>
    )
}