import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import './Products.css'   // ⬅️ Import CSS file for hover effect

const Product = ({ product }) => {
  return (
    // added custom class 'product-card'
    <Card className='my-3 rounded product-card'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div' className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
            color='#f8e825'
          />
        </Card.Text>

        <Card.Text as='h3' className="product-price">
          ₹{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
