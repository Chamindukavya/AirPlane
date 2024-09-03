import React from 'react';
import './footer.css'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-links">
        <ul>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
          <li><a href="#">Terms and Conditions</a></li>
          <li><a href="#">Privacy Policy</a></li>
        </ul>
      </div>
      <div className="footer-social">
        <ul>
          <li><a href="#" target="_blank"><i className="fa fa-facebook" /><FaFacebook /></a></li>
          <li><a href="#" target="_blank"><i className="fa fa-twitter" /><FaTwitter /></a></li>
          <li><a href="#" target="_blank"><i className="fa fa-instagram" /><FaInstagram /></a></li>
        </ul>
      </div>
      <div className="footer-copyright">
        <p>&copy; 2024 B Airline. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;