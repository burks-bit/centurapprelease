import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Menu from './Menu';
import { Link, useParams } from 'react-router-dom';
import spinner from '../web_images/spinner.svg';
import Footer from './Footer';
import { apiUrl } from '../services/BackendAPIUrl';
import { Icon } from 'semantic-ui-react';

export default function ProductDetails(){
    
    let {id} = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`${apiUrl}api/getspecificproduct/${id}`);
            console.log(response.data)
            setProduct(response.data.products);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchProduct();
    }, [id]);

    return (
        <div>
            <Menu />
            <div className='ui container'>
                <div>
                    {product ? (
                        <div>
                            <Link to={`/products/details/${product.id}`}> <h1 className='products_h1'><Icon name='info circle' size='large' color='green' /> {product.product_name}</h1></Link>
                                <div className="ui two column stackable grid" style={{marginTop: '20px'}}>
                                    <div className="column" style={{width: '30%'}}>
                                        <div className="ui product-box-productdetails-page">
                                            <img src={apiUrl+`product_images/${product.product_image}`} className="ui medium bordered centered image" alt="{product.product_image}"/>
                                        </div>
                                    </div>
                                    <div className="column" style={{width: '70%'}}>
                                        <div className="ui">
                                            <table className="ui compact celled table">
                                                <thead>
                                                    <tr>
                                                        <th colSpan={2} style={{textAlign: 'center'}}>Product Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="tableth_productdetails">Product Name:</td>
                                                        <td>{product.product_name}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tableth_productdetails">Product Model:</td>
                                                        <td>{product.product_model}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tableth_productdetails">Product Description:</td>
                                                        <td style={{paddingLeft: '20px'}} dangerouslySetInnerHTML={{ __html: product.product_description }} />
                                                    </tr>
                                                    <tr>
                                                        <td className="tableth_productdetails">Product Manufacturer:</td>
                                                        <td>{product.product_manufacturer}</td>
                                                    </tr>
                                                    {/* Additional rows */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div style={{borderTop: '1px solid #ddd', marginTop: '3%', padding: '30px'}}>
                                    <p>Do you have any question? You may reach us here.</p>
                                    <Link to="/contactus" className="ui small inverted red button">Contact Us</Link>
                                    <br />
                                    <Link to="/products" className="ui small default button" style={{marginTop: '50px'}}><i className="left chevron icon"></i> Back</Link>
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
            <Footer />
        </div>
    )
}