import React, { useState } from 'react';
import { Button, Card, Col, Form, Image, ListGroup, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { addToCart } from '../slices/cartSlice';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate('/cart');
  };
  return (
    <div className='product-screen'>
      <Link className='back-button' to='/'>
        <span className='back-arrow'>←</span> Back to Products
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error?.error}</Message>
      ) : (
        <>
          <Row className='product-detail-row'>
            <Col md={6} lg={5}>
              <div className='product-image-container'>
                <Image src={product?.image} alt={product?.name} className='product-detail-image' />
              </div>
            </Col>
            <Col md={6} lg={4}>
              <div className='product-info-section'>
                <h1 className='product-detail-title'>{product?.name}</h1>
                <div className='product-detail-rating'>
                  <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
                </div>
                <div className='product-detail-price'>
                  <span className='price-label'>Price</span>
                  <span className='price-value'>${product?.price}</span>
                </div>
                <div className='product-description'>
                  <h3 className='description-title'>Description</h3>
                  <p className='description-text'>{product?.description}</p>
                </div>
              </div>
            </Col>
            <Col md={12} lg={3}>
              <Card className='purchase-card'>
                <div className='purchase-card-header'>
                  <h4>Purchase Options</h4>
                </div>
                <ListGroup variant='flush' className='purchase-list'>
                  <ListGroup.Item className='purchase-item'>
                    <div className='item-row'>
                      <span className='item-label'>Price:</span>
                      <span className='item-value price-highlight'>${product?.price}</span>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item className='purchase-item'>
                    <div className='item-row'>
                      <span className='item-label'>Status:</span>
                      <span
                        className={`item-value status-badge ${product?.countInStock > 0 ? 'in-stock' : 'out-of-stock'}`}
                      >
                        {product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </ListGroup.Item>
                  {product?.countInStock > 0 && (
                    <ListGroup.Item className='purchase-item'>
                      <div className='item-row'>
                        <span className='item-label'>Quantity:</span>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className='qty-select'
                        >
                          {[...Array(product?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </div>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className='purchase-item-button'>
                    <Button
                      className='add-to-cart-button'
                      type='button'
                      disabled={product?.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      {product?.countInStock === 0 ? 'Out of Stock' : 'Add To Cart'}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProductScreen;
