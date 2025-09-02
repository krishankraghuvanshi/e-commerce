import React from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Message from './Message'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'
import ProductSkeleton from '../components/ProductSkeleton'

const ProductCarousel = () => {
    const { data: products, isLoading, error } = useGetTopProductsQuery()

    return isLoading ? (
        // <ProductSkeleton />
        <Loader/>
    ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
    ) : (
        <Carousel pause='hover' className='bg-dark mb-4 custom-carousel'>
        {products.map((product) => (
            <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
                <Image
                src={product.image}
                alt={product.name}
                fluid
                className="d-block w-100"
                />
                <Carousel.Caption className='carousel-caption'>
                <h2>
                    <span style={{ color: '#000000' }}>{product.name} (₹{product.price})</span>
                </h2>
                </Carousel.Caption>
            </Link>
            </Carousel.Item>
        ))}
        </Carousel>
    )
}

export default ProductCarousel