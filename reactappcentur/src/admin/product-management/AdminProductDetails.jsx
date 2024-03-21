import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import { Link, useParams } from 'react-router-dom';
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminProductDetails(){

    let {id} = useParams();
    const [product, setProduct] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        product_name: '',
        product_model: '',
        product_description: '',
        product_manufacturer: '',
        product_specimen_type: '',
        product_image: '', // Add product_image to editedProduct state
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${apiUrl}api/getspecificproduct/${id}`);
                console.log(response.data)
                setProduct(response.data.products);
                setEditedProduct(response.data.products);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleEditButtonClick = () => {
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedProduct({ ...editedProduct, [name]: value });
    };

    const handleSaveButtonClick = async () => {
        try {
            const response = await axios.put(`${apiUrl}api/updatemgmtproduct/${id}`, editedProduct);
            console.log(response.data);
            if (response.data.status === "success") {
                setProduct(editedProduct);
                setEditMode(false);
            } else {
                console.error("Failed to update product:", response.data.message);
            }
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleCancel = () => {
        // Reset editedProduct to the original product details and exit edit mode
        setEditedProduct(product);
        setEditMode(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setEditedProduct({ ...editedProduct, product_image: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <Layout>
            <div className='ui container'>
                <div>
                    {product ? (
                        <div>
                            <Link to={`/centurmanagement/products-management/product-details/${product.id}`}><h1 className='products_h1'>{product.product_name}</h1></Link>
                            <div className="ui two column stackable grid" style={{marginTop: '20px'}}>
                                <div className="column" style={{width: '30%'}}>
                                    <div className="ui product-box-productdetails-page">
                                        {/* <img src={`http://127.0.0.1:9000/product_images/${product.product_image}`} className="ui medium bordered centered image" alt="{product.product_image}"/> */}
                                        {editMode ? (
                                            <input type="file" onChange={handleImageChange} />
                                        ) : (
                                            <img src={product.product_image.startsWith('data:image') ? product.product_image : `http://127.0.0.1:9000/product_images/${product.product_image}`} className="ui medium bordered centered image" alt={product.product_image} />
                                        )}

                                    </div>
                                </div>
                                <div className="column" style={{width: '70%'}}>
                                    {editMode ? (
                                        <div className="ui form">
                                            <div className="field">
                                                <label>Product Name</label>
                                                <input type="text" name="product_name" value={editedProduct.product_name} onChange={handleInputChange} />
                                            </div>
                                            <div className="field">
                                                <label>Product Model</label>
                                                <input type="text" name="product_model" value={editedProduct.product_model} onChange={handleInputChange} />
                                            </div>
                                            <div className="field">
                                                <label>Product Description</label>
                                                {/* <textarea name="product_description" value={editedProduct.product_description} onChange={handleInputChange}></textarea> */}
                                                <ReactQuill 
                                                    value={editedProduct.product_description} 
                                                    onChange={(value) => handleInputChange({ target: { name: 'product_description', value } })} 
                                                />
                                            </div>
                                            <div className="field">
                                                <label>Product Manufacturer</label>
                                                <input type="text" name="product_manufacturer" value={editedProduct.product_manufacturer} onChange={handleInputChange} />
                                            </div>
                                            <div className="field">
                                                <label>Product Specimen Type</label>
                                                <input type="text" name="product_specimen_type" value={editedProduct.product_specimen_type} onChange={handleInputChange} />
                                            </div>
                                            <div className="field">
                                                <div className="ui checkbox">
                                                    <input
                                                        type="checkbox"
                                                        name="enabled"
                                                        checked={editedProduct.enabled}
                                                        onChange={(e) => setEditedProduct({ ...editedProduct, enabled: e.target.checked })}
                                                    />
                                                    <label>Enabled</label>
                                                </div>
                                            </div>
                                            {/* Add more input fields for other product details */}
                                            {/* <button className="ui primary button" onClick={handleSaveButtonClick}>Save</button> */}
                                        </div>
                                    ) : (
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
                                                        <td dangerouslySetInnerHTML={{ __html: product.product_description }} style={{paddingLeft: '20px'}} />
                                                    </tr>
                                                    <tr>
                                                        <td className="tableth_productdetails">Product Manufacturer:</td>
                                                        <td>{product.product_manufacturer}</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="tableth_productdetails">Specimen Types:</td>
                                                        <td>{product.product_specimen_type}</td>
                                                    </tr>
                                                    {/* Additional rows */}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                    <div style={{marginTop: '20px'}}>
                                        {editMode ? (
                                            <div>
                                                <button className="ui button primary" onClick={handleSaveButtonClick}>Save</button>
                                                <button className="ui button" onClick={handleCancel}>Cancel</button>
                                            </div>
                                        ) : (
                                            <button className="ui button" onClick={handleEditButtonClick}>Edit</button>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <br />
                                <Link to="/centurmanagement/products-management" className="ui small default button" style={{marginTop: '50px'}}><i className="left chevron icon"></i> Back</Link>
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
        </Layout>
    )
}
