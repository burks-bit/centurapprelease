import React, { useState } from 'react';
import axios from 'axios';
import Layout from "../../layout/Layout";
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { apiUrl } from "../../services/BackendAPIUrl";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Icon } from 'semantic-ui-react';

export default function AdminProductAdd() {

    const [product, setProduct] = useState({
        product_image: null,
        product_name: '',
        product_model: '',
        product_description: '',
        product_manufacturer: '',
        product_specimen_type: '',
        enabled: '1', // Assuming product is enabled by default
    });

    const [loading, setLoading] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleProductImageChange = (e) => {
        setProduct(prevState => ({
            ...prevState,
            product_image: e.target.files[0]
        }));
    };

    const handleProductBodyChange = (value) => {
        setProduct(prevState => ({
            ...prevState,
            product_description: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setProduct({ ...product, product_image: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        console.log(product);
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('product_image', product.product_image);
            formData.append('product_name', product.product_name);
            formData.append('product_model', product.product_model);
            formData.append('product_description', product.product_description);
            formData.append('product_manufacturer', product.product_manufacturer);
            formData.append('product_specimen_type', product.product_specimen_type);
            formData.append('enabled', product.enabled);
            // Append other product fields here

            await axios.post(`${apiUrl}api/addnewmgmtproduct`, formData);
            window.location.reload();
        } catch (error) {
            console.error('Error adding product:', error);
        }
        setLoading(false);
    };

    return (
        <div>
            <h4>Product Management > Add Product</h4>
            <form onSubmit={handleSubmit} className='ui form'>
                <div className="field">
                    <label>Product Image</label>
                    {/* <input type="file" name="product_image" onChange={handleProductImageChange} /> */}
                    <input type="file" onChange={handleImageChange} />
                </div>
                <div className="field">
                    <label>Product Name</label>
                    <input type="text" name="product_name" value={product.product_name} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Product Model</label>
                    <input type="text" name="product_model" value={product.product_model} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Product Description:</label>
                    <ReactQuill
                        value={product.product_description}
                        onChange={handleProductBodyChange}
                    />
                </div>
                <div className="field">
                    <label>Product Manufacturer</label>
                    <input type="text" name="product_manufacturer" value={product.product_manufacturer} onChange={handleChange} />
                </div>
                <div className="field">
                    <label>Product Specimen Type</label>
                    <input type="text" name="product_specimen_type" value={product.product_specimen_type} onChange={handleChange} />
                </div>
                <div>
                    <br />
                    <div className="ui checkbox">
                        <input
                            type="checkbox"
                            name="enabled"
                            checked={product.enabled === '1'}
                            onChange={(e) => setProduct(prevState => ({ ...prevState, enabled: e.target.checked ? '1' : '0' }))}
                        />
                        <label>Enabled</label>
                    </div>
                </div>
                <br />
                <button type="submit" className='ui button tiny primary' disabled={loading}>
                    <Icon name="save" /> {loading ? 'Saving... Please Wait!' : 'Add product'}
                </button>
            </form>
        </div>
    );
}
