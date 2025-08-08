import { useState, useCallback } from 'react';
import { Col, Container, Row, Button, Form, InputGroup, Toast, ToastContainer } from 'react-bootstrap';
import { 
  FaEnvelope, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaTwitter,
  FaStore,
  FaArrowUp,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
  FaHeadset,
  FaCreditCard,
  FaPaperPlane
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Newsletter subscription handler
  const handleNewsletterSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubscribing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowToast(true);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription failed:', error);
    } finally {
      setIsSubscribing(false);
    }
  }, [email]);

  // Scroll to top handler
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Social media links configuration
  const socialLinks = [
    { icon: FaFacebook, href: '#', label: 'Facebook', color: '#1877F2' },
    { icon: FaTwitter, href: '#', label: 'Twitter', color: '#1DA1F2' },
    { icon: FaInstagram, href: '#', label: 'Instagram', color: '#E4405F' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn', color: '#0077B5' }
  ];

  // Footer features
  const features = [
    { icon: FaTruck, title: 'Free Shipping', desc: 'On orders over $50' },
    { icon: FaUndoAlt, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: FaShieldAlt, title: 'Secure Payment', desc: '100% secure checkout' },
    { icon: FaHeadset, title: '24/7 Support', desc: 'Dedicated customer care' }
  ];

  return (
    <>
      {/* Features Section */}
      <section className="py-4 bg-light border-top">
        <Container>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} sm={6} lg={3} className="text-center">
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <div 
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: '50px',
                      height: '50px',
                      backgroundColor: '#007bff',
                      color: 'white'
                    }}
                  >
                    <feature.icon size={20} />
                  </div>
                </div>
                <h6 className="mb-1 fw-bold">{feature.title}</h6>
                <small className="text-muted">{feature.desc}</small>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-4 bg-primary text-white">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-3 mb-lg-0">
              <div className="d-flex align-items-center">
                <FaEnvelope size={24} className="me-3" />
                <div>
                  <h5 className="mb-1">Stay Updated!</h5>
                  <p className="mb-0 opacity-75">Get the latest deals and updates delivered to your inbox.</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <Form onSubmit={handleNewsletterSubmit}>
                <InputGroup>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubscribing}
                    required
                    style={{ borderRadius: '25px 0 0 25px' }}
                  />
                  <Button 
                    type="submit" 
                    variant="light" 
                    disabled={isSubscribing || !email}
                    style={{ borderRadius: '0 25px 25px 0', minWidth: '120px' }}
                  >
                    {isSubscribing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <FaPaperPlane className="me-2" />
                        Subscribe
                      </>
                    )}
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main Footer */}
      <footer className="footer bg-dark text-light position-relative">
        <Container>
          <Row className="py-5">
            {/* Company Info */}
            <Col lg={4} md={6} className="mb-4">
              <div className="d-flex align-items-center mb-3">
                <FaStore className="text-primary me-2" size={24} />
                <h4 className="text-primary mb-0 fw-bold">MERN Store</h4>
              </div>
              <p className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                Your trusted e-commerce destination offering quality products, 
                exceptional service, and unbeatable prices. Join thousands of 
                satisfied customers worldwide.
              </p>
              
              {/* Social Links */}
              <div className="mb-4">
                <h6 className="text-light mb-3">Follow Us</h6>
                <div className="d-flex gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="text-light p-2 rounded-circle border border-secondary"
                      style={{
                        transition: 'all 0.3s ease',
                        width: '40px',
                        height: '40px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = social.color;
                        e.target.style.borderColor = social.color;
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.borderColor = '#6c757d';
                        e.target.style.transform = 'translateY(0)';
                      }}
                      aria-label={social.label}
                    >
                      <social.icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6} className="mb-4">
              <h5 className="text-light mb-4 fw-bold">Quick Links</h5>
              <ul className="list-unstyled">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/products', label: 'Shop All' },
                  { to: '/about', label: 'About Us' },
                  { to: '/contact', label: 'Contact' },
                  { to: '/blog', label: 'Blog' },
                  { to: '/careers', label: 'Careers' }
                ].map((link, index) => (
                  <li key={index} className="mb-3">
                    <Link 
                      to={link.to} 
                      className="text-muted text-decoration-none d-inline-block"
                      style={{ 
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#007bff';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#6c757d';
                        e.target.style.paddingLeft = '0';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Categories */}
            <Col lg={2} md={6} className="mb-4">
              <h5 className="text-light mb-4 fw-bold">Categories</h5>
              <ul className="list-unstyled">
                {[
                  'Electronics',
                  'Fashion',
                  'Books',
                  'Home & Garden',
                  'Sports',
                  'Beauty'
                ].map((category, index) => (
                  <li key={index} className="mb-3">
                    <Link 
                      to={`/products?category=${encodeURIComponent(category)}`}
                      className="text-muted text-decoration-none d-inline-block"
                      style={{ 
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#007bff';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#6c757d';
                        e.target.style.paddingLeft = '0';
                      }}
                    >
                      {category}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Customer Service */}
            <Col lg={2} md={6} className="mb-4">
              <h5 className="text-light mb-4 fw-bold">Support</h5>
              <ul className="list-unstyled">
                {[
                  { href: '/help', label: 'Help Center' },
                  { href: '/returns', label: 'Returns & Exchanges' },
                  { href: '/shipping', label: 'Shipping Info' },
                  { href: '/track', label: 'Track Your Order' },
                  { href: '/size-guide', label: 'Size Guide' },
                  { href: '/faq', label: 'FAQ' }
                ].map((link, index) => (
                  <li key={index} className="mb-3">
                    <Link 
                      to={link.href}
                      className="text-muted text-decoration-none d-inline-block"
                      style={{ 
                        transition: 'all 0.3s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.color = '#007bff';
                        e.target.style.paddingLeft = '8px';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.color = '#6c757d';
                        e.target.style.paddingLeft = '0';
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Col>

            {/* Contact Info */}
            <Col lg={2} className="mb-4">
              <h5 className="text-light mb-4 fw-bold">Contact</h5>
              <div className="text-muted">
                <div className="mb-3 d-flex align-items-start">
                  <FaMapMarkerAlt className="me-3 mt-1 text-primary" />
                  <div>
                    <strong>Address:</strong><br />
                    123 Commerce St<br />
                    New York, NY 10001
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <FaPhone className="me-3 text-primary" />
                  <div>
                    <strong>Phone:</strong><br />
                    <a href="tel:+15551234567" className="text-muted text-decoration-none">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="mb-3 d-flex align-items-center">
                  <FaEnvelope className="me-3 text-primary" />
                  <div>
                    <strong>Email:</strong><br />
                    <a href="mailto:support@mernstore.com" className="text-muted text-decoration-none">
                      support@mernstore.com
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {/* Bottom Bar */}
          <div className="border-top border-secondary pt-4 pb-2">
            <Row className="align-items-center">
              <Col md={6} className="mb-3 mb-md-0">
                <div className="d-flex align-items-center">
                  <p className="text-muted mb-0 me-3">
                    &copy; {new Date().getFullYear()} MERN Store. All rights reserved.
                  </p>
                  <div className="d-flex align-items-center text-muted">
                    <span className="me-1">Made with</span>
                    <FaHeart className="text-danger mx-1" size={12} />
                    <span>by our team</span>
                  </div>
                </div>
              </Col>
              <Col md={6}>
                <div className="d-flex justify-content-md-end align-items-center gap-4">
                  {/* Payment Methods */}
                  <div className="d-flex align-items-center gap-2">
                    <FaCreditCard className="text-muted" />
                    <span className="text-muted small">Secure Payments</span>
                  </div>
                  
                  {/* Legal Links */}
                  <div className="d-flex gap-3">
                    {[
                      { href: '/privacy', label: 'Privacy' },
                      { href: '/terms', label: 'Terms' },
                      { href: '/cookies', label: 'Cookies' }
                    ].map((link, index) => (
                      <Link
                        key={index}
                        to={link.href}
                        className="text-muted text-decoration-none small"
                        style={{ transition: 'color 0.3s ease' }}
                        onMouseEnter={(e) => e.target.style.color = '#007bff'}
                        onMouseLeave={(e) => e.target.style.color = '#6c757d'}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>

        {/* Scroll to Top Button */}
        <Button
          onClick={scrollToTop}
          className="position-fixed"
          variant="primary"
          style={{
            bottom: '2rem',
            right: '2rem',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            zIndex: 1000,
            boxShadow: '0 4px 12px rgba(0,123,255,0.3)'
          }}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </Button>
      </footer>

      {/* Toast Notification */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={4000} 
          autohide
          bg="success"
          className="text-white"
        >
          <Toast.Body>
            <div className="d-flex align-items-center">
              <FaPaperPlane className="me-2" />
              Successfully subscribed to our newsletter!
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default Footer;