import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FaFacebookF, FaGithub, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='modern-footer'>
      <Container>
        <Row className='footer-main'>
          <Col md={4} className='footer-column'>
            <div className='footer-brand'>
              <h3 className='footer-brand-name'>Byte Bazaar</h3>
              <p className='footer-brand-tagline'>
                Your premier destination for quality products and exceptional service.
              </p>
            </div>
          </Col>
          <Col md={2} sm={6} className='footer-column'>
            <h4 className='footer-heading'>Shop</h4>
            <ul className='footer-links'>
              <li>
                <Link to='/'>All Products</Link>
              </li>
              <li>
                <Link to='/cart'>Shopping Cart</Link>
              </li>
              <li>
                <a href='#'>Best Sellers</a>
              </li>
              <li>
                <a href='#'>New Arrivals</a>
              </li>
            </ul>
          </Col>
          <Col md={2} sm={6} className='footer-column'>
            <h4 className='footer-heading'>Support</h4>
            <ul className='footer-links'>
              <li>
                <a href='#'>Help Center</a>
              </li>
              <li>
                <a href='#'>Contact Us</a>
              </li>
              <li>
                <a href='#'>Shipping Info</a>
              </li>
              <li>
                <a href='#'>Returns</a>
              </li>
            </ul>
          </Col>
          <Col md={2} sm={6} className='footer-column'>
            <h4 className='footer-heading'>Company</h4>
            <ul className='footer-links'>
              <li>
                <a href='#'>About Us</a>
              </li>
              <li>
                <a href='#'>Careers</a>
              </li>
              <li>
                <a href='#'>Press</a>
              </li>
              <li>
                <a href='#'>Blog</a>
              </li>
            </ul>
          </Col>
          <Col md={2} sm={6} className='footer-column'>
            <h4 className='footer-heading'>Legal</h4>
            <ul className='footer-links'>
              <li>
                <a href='#'>Privacy Policy</a>
              </li>
              <li>
                <a href='#'>Terms of Service</a>
              </li>
              <li>
                <a href='#'>Cookie Policy</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className='footer-social'>
          <Col className='text-center'>
            <div className='social-links'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' className='social-link'>
                <FaFacebookF />
              </a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' className='social-link'>
                <FaTwitter />
              </a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' className='social-link'>
                <FaInstagram />
              </a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' className='social-link'>
                <FaLinkedinIn />
              </a>
              <a href='https://github.com' target='_blank' rel='noopener noreferrer' className='social-link'>
                <FaGithub />
              </a>
            </div>
          </Col>
        </Row>
        <Row className='footer-bottom'>
          <Col className='text-center'>
            <p className='footer-copyright'>&copy; {currentYear} Byte Bazaar. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
