import { Link } from 'react-router-dom';
import '../styles/custom_navbar.css';

export default function Header() {
  return (
    <header>
      {/* <div className="logo">
        <Link to="/">
          <img src={`http://127.0.0.1:9000/web_images/centurlogov5.png`} height="40px" alt="" />
        </Link>
      </div> */}
      <div>
        <Link to="/" className="logoname">
          Centur Healthcare Trading Corp
        </Link>
      </div>
      <input type="checkbox" id="nav_check" hidden />
      <nav className='custom_navbar'>
        <ul className='custom_ul'>
          <li className='custom_li'><Link to="/" className="active">Home</Link></li>
          <li className='custom_li'><Link to="/about">About</Link></li>
          <li className='custom_li'><Link to="/products">Products</Link></li>
          <li className='custom_li'><Link to="/services">Services</Link></li>
          <li className='custom_li'><Link to="/clients">Clients</Link></li>
          <li className='custom_li'><Link to="/careers">Careers</Link></li>
          <li className='custom_li'><Link to="/contactus">Contact Us</Link></li>
        </ul>
      </nav>
      <label htmlFor="nav_check" className="hamburger">
        <div></div>
        <div></div>
        <div></div>
      </label>
    </header>
  );
}
