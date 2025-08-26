import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Card, Image } from 'react-bootstrap'
import { FaArrowLeft, FaSave, FaUpload, FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { 
  useGetProductsDetailsQuery, 
  useCreateProductMutation,
  useUpdateProductMutation 
} from '../../slices/productsApiSlice'

const ProductEditScreen = () => {
  const { id: productId } = useParams()
  const navigate = useNavigate()
  
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState('')

  const { data: product, isLoading, error } = useGetProductsDetailsQuery(productId, {
    skip: !productId
  })

  const [createProduct, { isLoading: createLoading }] = useCreateProductMutation()
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation()

  const isEdit = Boolean(productId)

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setDescription(product.description)
      setCountInStock(product.countInStock)
      setImagePreview(product.image)
    }
  }, [product])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    setUploading(true)

    try {
      const response = await fetch('/api/products/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      setImage(data.imageUrl)
      setImagePreview(data.imageUrl)
      toast.success('Image uploaded successfully')
    } catch (error) {
      toast.error('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setImage('')
    setImagePreview('')
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    
    const productData = {
      name,
      price: Number(price),
      image,
      brand,
      category,
      description,
      countInStock: Number(countInStock)
    }

    try {
      if (isEdit) {
        await updateProduct({ _id: productId, ...productData }).unwrap()
        toast.success('Product updated successfully')
      } else {
        await createProduct(productData).unwrap()
        toast.success('Product created successfully')
      }
      navigate('/admin/productlist')
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Error saving product')
    }
  }

  if (isLoading) return <Loader />
  if (error) return <Message variant="danger">{error?.data?.message || error.error}</Message>

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        <FaArrowLeft /> Go Back
      </Link>
      
      <Card>
        <Card.Header>
          <h1>{isEdit ? 'Edit Product' : 'Create Product'}</h1>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="price" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL or upload image"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value)
                      setImagePreview(e.target.value)
                    }}
                  />
                  <Form.Control
                    type="file"
                    label="Choose File"
                    onChange={uploadFileHandler}
                    className="mt-2"
                  />
                  {uploading && <Loader />}
                </Form.Group>

                <Form.Group controlId="brand" className="mb-3">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="category" className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="countInStock" className="mb-3">
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter count in stock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Image Preview */}
            {imagePreview && (
              <Row className="mb-3">
                <Col>
                  <Form.Label>Image Preview</Form.Label>
                  <div className="position-relative d-inline-block">
                    <Image 
                      src={imagePreview} 
                      alt="Product preview" 
                      style={{ maxWidth: '200px', maxHeight: '200px' }}
                      className="border rounded"
                    />
                    <Button
                      variant="danger"
                      size="sm"
                      className="position-absolute top-0 end-0"
                      onClick={removeImage}
                    >
                      <FaTimes />
                    </Button>
                  </div>
                </Col>
              </Row>
            )}

            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <Button
                type="submit"
                variant="primary"
                disabled={createLoading || updateLoading}
                className="me-md-2"
              >
                <FaSave /> {createLoading || updateLoading ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}

export default ProductEditScreen
