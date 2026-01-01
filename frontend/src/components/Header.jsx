import React from 'react';
import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <header className='header-wrapper'>
      <Navbar expand='md' collapseOnSelect className='modern-navbar'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='brand-logo'>
              <img src={logo} alt='Byte Bazaar' className='logo-img' />
              <span className='brand-text'>Byte Bazaar</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' className='custom-toggler' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto align-items-center'>
              <LinkContainer to='/cart'>
                <Nav.Link className='nav-link-custom'>
                  <div className='nav-item-wrapper'>
                    <FaShoppingCart className='nav-icon' />
                    <span className='nav-text'>Cart</span>
                    {cartItems.length > 0 && (
                      <Badge pill className='cart-badge'>
                        {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username' className='user-dropdown'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item className='dropdown-item-custom'>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler} className='dropdown-item-custom'>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='nav-link-custom sign-in-link'>
                    <div className='nav-item-wrapper'>
                      <FaUser className='nav-icon' />
                      <span className='nav-text'>Sign In</span>
                    </div>
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmenu' className='admin-dropdown'>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item className='dropdown-item-custom'>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item className='dropdown-item-custom'>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item className='dropdown-item-custom'>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
