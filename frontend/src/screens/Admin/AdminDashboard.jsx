import React from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaBoxes, FaUsers, FaClipboardList, FaPlus } from 'react-icons/fa'

const AdminDashboard = () => {
  return (
    <>
      <Row className="mb-4">
        <Col>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">Manage your e-commerce platform</p>
        </Col>
      </Row>

      <Row>
        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body className="text-center">
              <FaBoxes size={48} className="text-primary mb-3" />
              <Card.Title>Products</Card.Title>
              <Card.Text>
                Manage your product catalog, add new products, edit existing ones, and handle inventory.
              </Card.Text>
              <div className="d-grid gap-2">
                <Link to="/admin/productlist">
                  <Button variant="outline-primary" className="w-100">
                    View Products
                  </Button>
                </Link>
                <Link to="/admin/product/create">
                  <Button variant="primary" className="w-100">
                    <FaPlus /> Add Product
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body className="text-center">
              <FaUsers size={48} className="text-success mb-3" />
              <Card.Title>Users</Card.Title>
              <Card.Text>
                Manage user accounts, view user information, and control admin privileges.
              </Card.Text>
              <div className="d-grid gap-2">
                <Link to="/admin/userlist">
                  <Button variant="outline-success" className="w-100">
                    View Users
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="mb-4">
          <Card className="h-100">
            <Card.Body className="text-center">
              <FaClipboardList size={48} className="text-warning mb-3" />
              <Card.Title>Orders</Card.Title>
              <Card.Text>
                Track and manage customer orders, update order status, and handle fulfillment.
              </Card.Text>
              <div className="d-grid gap-2">
                <Link to="/admin/orderlist">
                  <Button variant="outline-warning" className="w-100">
                    View Orders
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <h5>Quick Actions</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={6}>
                  <h6>Product Management</h6>
                  <ul className="list-unstyled">
                    <li>• <Link to="/admin/product/create">Create new product</Link></li>
                    <li>• <Link to="/admin/productlist">Edit existing products</Link></li>
                    <li>• Manage product categories and inventory</li>
                    <li>• Upload product images</li>
                  </ul>
                </Col>
                <Col md={6}>
                  <h6>User Management</h6>
                  <ul className="list-unstyled">
                    <li>• <Link to="/admin/userlist">View all users</Link></li>
                    <li>• Manage admin privileges</li>
                    <li>• Update user information</li>
                    <li>• Monitor user activity</li>
                  </ul>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard
