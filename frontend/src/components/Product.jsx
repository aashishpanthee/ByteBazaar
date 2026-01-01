import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='product-card'>
      <div className='product-image-wrapper'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' className='product-image' />
          <div className='image-overlay'>
            <span className='view-details'>View Details</span>
          </div>
        </Link>
      </div>
      <Card.Body className='product-card-body'>
        <Link to={`/product/${product._id}`} className='product-link'>
          <Card.Title as='div' className='product-title'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as='div' className='product-rating'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>
        <div className='product-footer'>
          <Card.Text as='h3' className='product-price'>
            ${product.price}
          </Card.Text>
          <div className='add-to-cart-hint'>Click to view</div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
