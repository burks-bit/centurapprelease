
import './styles/custom_profile.css';
import './styles/product_slider.css';
// import './styles/main.css';
import '../node_modules/semantic-ui-css/semantic.min.css';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import Clients from './pages/Clients';
import Administrator from './admin/Administrator';
import IndexHeader from './admin/header-management/IndexHeader';
import IndexAbout from './admin/about-management/IndexAbout';
import IndexProduct from './admin/product-management/IndexProduct';
import IndexService from './admin/services-management/IndexService';
import IndexClient from './admin/client-management/IndexClient';
import IndexContact from './admin/contacts-management/IndexContact';
import IndexCareer from './admin/career-management/IndexCareer';
import Login from './auth/Login';
import AdminProductDetails from './admin/product-management/AdminProductDetails';
import AdminCareerDetails from './admin/career-management/AdminCareerDetails';
import AdminCareerAdd from './admin/career-management/AdminCareerAdd';
// import CompanyLocation from './pages/CompanyLocation';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/details/:id" element={<ProductDetails />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/contactus" element={<Contact />} />
          <Route path="/centurmanagement/admin-login" element={<Login />} />
          <Route path="/centurmanagement/admin-dashboard" element={<Administrator />} />
          <Route path="/centurmanagement/header-management" element={<IndexHeader />} />
          <Route path="/centurmanagement/about-management" element={<IndexAbout />} />
          <Route path="/centurmanagement/products-management" element={<IndexProduct />} />
          <Route path="/centurmanagement/services-management" element={<IndexService />} />
          <Route path="/centurmanagement/client-management" element={<IndexClient />} />
          <Route path="/centurmanagement/contacts-management" element={<IndexContact />} />
          <Route path="/centurmanagement/careers-management" element={<IndexCareer />} />
          <Route path="/centurmanagement/careers-management/add" element={<AdminCareerAdd />} />
          <Route path="/centurmanagement/careers-management/career-details/:id" element={<AdminCareerDetails />} />
          <Route path="/centurmanagement/products-management/product-details/:id" element={<AdminProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
