import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../layout/Layout";
import spinner from "../../web_images/spinner.svg"; // Path to your spinner image
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { apiUrl } from "../../services/BackendAPIUrl";

export default function IndexProduct() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(apiUrl+'api/getmgmtproduct')
            .then(response => {
                if (response.data.status === "success") {
                    setProducts(response.data.products);
                } else {
                    console.error("Failed to fetch products:", response.data.message);
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // Function to render individual product cards
    const renderProductCard = (product) => (
        <div key={product.id} className="column">
            <div className="ui segment product-box-product-page">
                <img src={`http://127.0.0.1:9000/product_images/${product.product_image}`} alt={product.product_image} className='product-image'/>
            </div>
            <div className="ui two column doubling stackable grid">
                <div className="column">
                    <div className="slide-title-productlist-page">{product.product_name}</div>
                    <div className="slide-model-product-page">Model: {product.product_model}</div>
                </div>
                <div className="column" style={{textAlign: 'right'}}>
                    <Link to={`/centurmanagement/products-management/product-details/${product.id}`}>
                        <button className="ui mini inverted red button">See Details <i className="right chevron icon"></i></button>
                    </Link>
                </div>
            </div>
        </div>
    );

    // Function to render rows of products
    const renderProductRows = () => {
        return Array.from({ length: Math.ceil(products.length / 3) }, (_, rowIndex) => (
            <div key={rowIndex} className="ui three column doubling stackable grid container slide">
                {products.slice(rowIndex * 3, rowIndex * 3 + 3).map((product, columnIndex) => (
                    renderProductCard(product)
                ))}
            </div>
        ));
    };

    return (
        <Layout>
            <div>
                <h1>Products Management</h1>
                {loading ? (
                    <div className="" style={{textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '15%'}}>
                        <img src={spinner} alt="Logo" className="ui centered" />
                    </div>
                ) : (
                    <div className="product-container">
                        {renderProductRows()}
                    </div>
                )}
            </div>
        </Layout>
    );
}
