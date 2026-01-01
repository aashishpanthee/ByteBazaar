import React from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };
  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className='cart-screen'>
      <Row>
        <Col md={8}>
          <div className='cart-header'>
            <h1 className='cart-title'>Shopping Cart</h1>
            <p className='cart-subtitle'>
              {cartItems.length === 0
                ? 'Your cart is empty'
                : `${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart`}
            </p>
          </div>
          {cartItems.length === 0 ? (
            <div className='empty-cart'>
              <div className='empty-cart-icon'>🛒</div>
              <h3 className='empty-cart-title'>Your cart is empty</h3>
              <p className='empty-cart-text'>Add some products to get started!</p>
              <Link to='/' className='continue-shopping-btn'>
                Continue Shopping
              </Link>
            </div>
          ) : (
            <ListGroup variant='flush' className='cart-items-list'>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id} className='cart-item'>
                  <Row className='align-items-center'>
                    <Col xs={3} md={2}>
                      <Link to={`/product/${item._id}`} className='cart-item-image-link'>
                        <div className='cart-item-image-wrapper'>
                          <Image src={item.image} alt={item.name} className='cart-item-image' />
                        </div>
                      </Link>
                    </Col>
                    <Col xs={9} md={3}>
                      <Link to={`/product/${item._id}`} className='cart-item-name'>
                        {item.name}
                      </Link>
                    </Col>
                    <Col xs={4} md={2} className='text-center'>
                      <div className='cart-item-price'>${item.price}</div>
                    </Col>
                    <Col xs={4} md={3} className='text-center'>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                        className='cart-qty-select'
                      >
                        {[...Array(item?.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col xs={4} md={2} className='text-center'>
                      <Button type='button' className='cart-remove-btn' onClick={() => removeFromCartHandler(item._id)}>
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className='cart-summary-card'>
            <div className='cart-summary-header'>
              <h4>Order Summary</h4>
            </div>
            <ListGroup variant='flush'>
              <ListGroup.Item className='cart-summary-item'>
                <div className='summary-row'>
                  <span className='summary-label'>Items:</span>
                  <span className='summary-value'>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className='cart-summary-item'>
                <div className='summary-row subtotal-row'>
                  <span className='summary-label'>Subtotal:</span>
                  <span className='summary-value summary-price'>
                    ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                  </span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className='cart-summary-button-item'>
                <Button
                  type='button'
                  className='checkout-button'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
              <ListGroup.Item className='cart-summary-item'>
                <Link to='/' className='continue-shopping-link'>
                  ← Continue Shopping
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CartScreen;
