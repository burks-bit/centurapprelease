import React from 'react';
import axios from 'axios';
import '../styles/custom_layout.css'
import { apiUrl } from "../services/BackendAPIUrl";

// console.log(apiUrl)
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleLogout = () => {
        axios
        .post(apiUrl + "api/logout", {}, {
            headers: {
                'X-CSRF-TOKEN': csrfToken
            }
        })
        .then((response) => {
            console.log("Logout successful:", response.data);
            window.location.href = "/centurmanagement/admin-login";
        })
        .catch((error) => {
            console.error("Logout error:", error);
        });
    };

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <h1>Centur Healthcare Trading Corp</h1>
      </header>
      <div className="main-content">
        {children}
      </div>
      <aside>
        <h2>Menu</h2>
        <ul style={{listStyle: 'none'}}>
          <li><a href="/centurmanagement/admin-dashboard">Home</a></li>
          <li><a href="/centurmanagement/header-management">Header Management</a></li>
          <li><a href="/centurmanagement/about-management">About Management</a></li>
          <li><a href="/centurmanagement/products-management">Product Management</a></li>
          <li><a href="/centurmanagement/services-management">Services Management</a></li>
          <li><a href="/centurmanagement/contacts-management">Contact Management</a></li>
          <li><a href="/centurmanagement/careers-management">Career Management</a></li>
        </ul>
        <br />
        <button className="ui button red" onClick={handleLogout}>Logout</button>
      </aside>
      <footer>
        <p>&copy; 2024 Centur Healthcare Trading Corp</p>
      </footer>
    </div>
  );
};

export default Layout;