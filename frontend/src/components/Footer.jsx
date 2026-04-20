import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer style={{ backgroundColor: '#343a40', color: '#ffffff', marginTop: 'auto', borderTop: '4px solid #FFA500' }}>
      <Container>
        <Row>
          <Col className='text-center py-4'>
            <h6 className='mb-1 text-uppercase' style={{ fontWeight: '600', letterSpacing: '1px' }}>
              Shopping Website
            </h6>
            <p className='mb-0' style={{ fontSize: '0.9rem', color: '#adb5bd' }}>
              &copy; {currentYear} All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
export default Footer
