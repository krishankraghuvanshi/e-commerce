import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import Loader from "../components/Loader"
import Product from '../components/Products'
import Paginate from '../components/Paginate'
import { useGetProductsQuery } from '../slices/productsApiSlice'

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams()
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber, keyword });

  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <div>{error?.data?.message || error.error}</div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword} />
        </>
      )}
    </>
  )
}

export default HomeScreen