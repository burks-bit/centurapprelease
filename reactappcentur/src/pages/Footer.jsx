// import React from "react";
// import '../styles/custom_footer.css';

// export default function Footer(){
//     return (
//         <div>
//             <div className="footer">
//                 All Rights Reserved 2024
//             </div>
//         </div>
//     )
// }
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="ui inverted vertical footer segment">
      <div className="ui container">
        <div className="ui stackable inverted divided equal height stackable grid" style={{paddingTop: '20px'}}>
          <div className="three wide column">
            <h4 className="ui inverted header">Company</h4>
            <div className="ui inverted link list">
              <Link to="/about" className="item">About Us</Link>
              <Link to="/contactus" className="item">Contact Us</Link>
              <Link to="/careers" className="item">Careers</Link>
            </div>
          </div>
          <div className="three wide column">
            <h4 className="ui inverted header">Services</h4>
            <div className="ui inverted link list">
              <Link to="" className="item">Equipment Provisioning</Link>
              <Link to="" className="item">Troubleshooting</Link>
              <Link to="" className="item">Reagents Supply</Link>
            </div>
          </div>
          <div className="seven wide column">
            <h4 className="ui inverted header">Connect with Us</h4>
            <p>Stay up to date with the latest news and updates by following us on social media.</p>
            {/* Add social media icons and links here */}
          </div>
        </div>
      </div>
      <div className="ui inverted section divider"></div>
      <div className="ui container">
        <div className="ui inverted centered aligned grid">
          <div className="eight wide column" style={{textAlign: 'center'}}>
            <p>&copy; {currentYear} Centur Healthcare Trading Corp. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;