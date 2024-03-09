
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
          {/* <Route path="/loc" element={<CompanyLocation />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
