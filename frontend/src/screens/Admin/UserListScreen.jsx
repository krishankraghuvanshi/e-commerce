import React, { useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col, Modal, Form } from 'react-bootstrap'
import { FaEdit, FaTrash, FaUserEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import Message from '../../components/Message'
import Loader from '../../components/Loader'
import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../slices/usersApiSlice'

const UserListScreen = () => {
  const { data: users, isLoading, error } = useGetUsersQuery()
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation()
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation()
  
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [editingUser, setEditingUser] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    isAdmin: false
  })

  const deleteHandler = (user) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const editHandler = (user) => {
    setEditingUser(user)
    setEditForm({
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
    setShowEditModal(true)
  }

  const confirmDelete = async () => {
    try {
      await deleteUser(userToDelete._id).unwrap()
      toast.success('User deleted successfully')
      setShowDeleteModal(false)
      setUserToDelete(null)
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Error deleting user')
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateUser({
        _id: editingUser._id,
        ...editForm
      }).unwrap()
      toast.success('User updated successfully')
      setShowEditModal(false)
      setEditingUser(null)
    } catch (err) {
      toast.error(err?.data?.message || err.error || 'Error updating user')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <span className="badge bg-success">Admin</span>
                    ) : (
                      <span className="badge bg-secondary">User</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="light"
                      className="btn-sm mx-2"
                      onClick={() => editHandler(user)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user)}
                      disabled={deleteLoading || user.isAdmin}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user <strong>{userToDelete?.name}</strong>? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="danger" 
            onClick={confirmDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="isAdmin" className="mb-3">
              <Form.Check
                type="checkbox"
                name="isAdmin"
                label="Admin User"
                checked={editForm.isAdmin}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button 
              type="submit"
              variant="primary"
              disabled={updateLoading}
            >
              {updateLoading ? 'Updating...' : 'Update User'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default UserListScreen
