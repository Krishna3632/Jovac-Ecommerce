import { useState, useCallback, useMemo } from 'react';
import { Badge, Navbar as BootstrapNavbar, Button, Container, Form, FormControl, Nav, NavDropdown, Spinner } from 'react-bootstrap';
import { FaSearch, FaShoppingCart, FaSignOutAlt, FaUser, FaUserCog, FaStore, FaBox } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin, loading } = useAuth();
  const { getCartItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Memoize cart count to prevent unnecessary re-renders
  const cartItemCount = useMemo(() => getCartItemCount(), [getCartItemCount]);

  // Optimize logout handler with useCallback
  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }, [logout, navigate]);

  // Enhanced search handler with loading state and validation
  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    
    if (!trimmedQuery || trimmedQuery.length < 2) {
      return;
    }

    setIsSearching(true);
    try {
      navigate(`/products?search=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery('');
    } finally {
      setIsSearching(false);
    }
  }, [searchQuery, navigate]);

  // Quick search suggestions (you can expand this)
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Navigation items configuration
  const navItems = useMemo(() => [
    { path: '/products', label: 'Products', icon: <FaStore className="me-1" /> },
    { path: '/categories', label: 'Categories', icon: <FaBox className="me-1" /> },
  ], []);

  return (
    <BootstrapNavbar 
      bg="white" 
      expand="lg" 
      className="shadow-sm border-bottom" 
      sticky="top"
      style={{ 
        minHeight: '70px',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.95) !important'
      }}
    >
      <Container fluid="lg">
        {/* Brand */}
        <BootstrapNavbar.Brand 
          as={Link} 
          to="/" 
          className="fw-bold text-primary d-flex align-items-center"
          style={{ fontSize: '1.5rem', textDecoration: 'none' }}
        >
          {/* <FaStore className="me-2" /> */}
          <span className="d-none d-sm-inline">E-Commerce</span>
          <span className="d-sm-none">MS</span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle 
          aria-controls="basic-navbar-nav"
          className="border-0"
        />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          {/* Navigation Links */}
          <Nav className="me-auto">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={`px-3 rounded-pill mx-1 ${
                  location.pathname === item.path 
                    ? 'bg-primary text-white' 
                    : 'text-dark hover-bg-light'
                }`}
                style={{
                  transition: 'all 0.2s ease',
                  fontWeight: location.pathname === item.path ? '600' : '500'
                }}
              >
                {item.icon}
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          {/* Search Form */}
          <Form 
            className="d-flex mx-3 position-relative" 
            style={{ maxWidth: '350px', minWidth: '250px' }} 
            onSubmit={handleSearch}
          >
            <div className="position-relative w-100">
              <FormControl
                type="search"
                placeholder="Search products..."
                className="pe-5 border-2"
                value={searchQuery}
                onChange={handleSearchChange}
                disabled={isSearching}
                style={{
                  borderRadius: '25px',
                  paddingLeft: '1rem',
                  paddingRight: '3rem',
                  minHeight: '40px'
                }}
                aria-label="Search products"
              />
              <Button
                variant="link"
                type="submit"
                disabled={isSearching || searchQuery.trim().length < 2}
                className="position-absolute end-0 top-50 translate-middle-y border-0 text-primary"
                style={{ 
                  right: '8px',
                  padding: '0.375rem',
                  zIndex: 3
                }}
                aria-label="Search"
              >
                {isSearching ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  <FaSearch />
                )}
              </Button>
            </div>
          </Form>

          {/* User Actions */}
          <Nav className="align-items-center">
            {loading ? (
              <Spinner animation="border" size="sm" className="me-3" />
            ) : isAuthenticated ? (
              <>
                {/* Cart */}
                <Nav.Link 
                  as={Link} 
                  to="/cart" 
                  className="me-3 position-relative p-2 rounded-circle hover-bg-light"
                  style={{ transition: 'background-color 0.2s ease' }}
                  aria-label={`Shopping cart with ${cartItemCount} items`}
                >
                  <FaShoppingCart size={20} className="text-primary" />
                  {cartItemCount > 0 && (
                    <Badge 
                      bg="danger" 
                      className="position-absolute top-0 start-100 translate-middle rounded-pill"
                      style={{ 
                        fontSize: '0.65rem',
                        minWidth: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {cartItemCount > 99 ? '99+' : cartItemCount}
                    </Badge>
                  )}
                </Nav.Link>

                {/* User Dropdown */}
                <NavDropdown
                  title={
                    <div className="d-flex align-items-center">
                      <div 
                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                        style={{ width: '32px', height: '32px', fontSize: '14px' }}
                      >
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="d-none d-md-inline fw-medium">
                        {user?.name || 'User'}
                      </span>
                    </div>
                  }
                  id="user-dropdown"
                  align="end"
                  className="border-0"
                >
                  <div className="px-3 py-2 border-bottom">
                    <small className="text-muted">Signed in as</small>
                    <div className="fw-medium">{user?.email}</div>
                  </div>
                  
                  <NavDropdown.Item as={Link} to="/profile" className="py-2">
                    <FaUser className="me-2 text-primary" />
                    My Profile
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item as={Link} to="/orders" className="py-2">
                    <FaBox className="me-2 text-primary" />
                    My Orders
                  </NavDropdown.Item>
                  
                  {isAdmin() && (
                    <>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/admin" className="py-2">
                        <FaUserCog className="me-2 text-warning" />
                        Admin Dashboard
                      </NavDropdown.Item>
                    </>
                  )}
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item 
                    onClick={handleLogout}
                    className="py-2 text-danger"
                    style={{ cursor: 'pointer' }}
                  >
                    <FaSignOutAlt className="me-2" />
                    Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-primary"
                  size="sm"
                  className="px-3 rounded-pill"
                  style={{ minWidth: '80px' }}
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary" 
                  size="sm"
                  className="px-3 rounded-pill"
                  style={{ minWidth: '80px' }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>

      {/* Custom CSS for hover effects */}
      <style jsx>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa !important;
        }
        
        .navbar-nav .nav-link:hover {
          transform: translateY(-1px);
        }
        
        @media (max-width: 991px) {
          .navbar-collapse {
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid #dee2e6;
          }
        }
      `}</style>
    </BootstrapNavbar>
  );
};

export default Navbar;