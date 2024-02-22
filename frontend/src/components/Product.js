import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from 'react-router-dom'
import Rating from './Rating';

// Functional component for displaying a product card
const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded' style={{ height: '90%' }}>
       {/* Use Link component for navigation to the product details page */}
      <Link to={`/product/${product._id}`}> {/* Use Link component for navigation */}
        <Card.Img src={`${product.image}`} variant='top' style={{ height: '18rem', width: '100%' }} className='img-fluid'/>
      </Link>

       {/* Card Body containing product details */}
      <Card.Body>
        <Link to={`/product/${product._id}`}> 
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        
        <Card.Text as='div'>
          {product.describe}
        </Card.Text>

        <Card.Text as='div'>
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
