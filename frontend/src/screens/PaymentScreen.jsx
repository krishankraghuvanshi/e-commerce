import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {Form, Button, Col} from 'react-bootstrap'
import FormContainer from '../components/formContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import {savePaymentMethod} from '../slices/cartSlice'

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state) => state.cart)
  const {shippingAddress} = cart

  useEffect(() => {
    if (!shippingAddress) {
      navigate("shipping")
    }
  }, [shippingAddress, navigate])

  const submitHandler= (e) =>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder')
  }

  return (
    <FormContainer>
        <CheckOutSteps step1={true} step2={true} step3={true} />
        <h1>Payment Method</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group controlId='paymentMethod'>
                <Form.Label>Select Payment Method</Form.Label>
                <Col>
                <Form.Check 
                    type='radio' 
                    label='PayPal or Credit Card' 
                    id='paypal' 
                    name='paymentMethod' 
                    value='PayPal' 
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                />
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen 