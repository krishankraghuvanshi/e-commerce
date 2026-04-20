import {useState, useEffect} from "react"
import {Link, useLocation, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {Form, Button, Row, Col} from "react-bootstrap"
import FormContainer from "../components/formContainer"
import Loader from "../components/Loader"
import { useRegisterMutation, useLoginGoogleMutation } from "../slices/usersApiSlice"
import { setCredentials } from "../slices/authSlice"
import { toast } from "react-toastify"
import { GoogleLogin } from '@react-oauth/google';
// import RegisterScreen from './screens/RegisterScreen'

const RegisterScreen = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [register, {isLoading}] = useRegisterMutation()
    const [loginGoogle, { isLoading: isGoogleLoading }] = useLoginGoogleMutation()

    const {userInfo} = useSelector((state) => state.auth)

    const { search } = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [userInfo, redirect, navigate])

    const submitHandler = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await register({name, email, password, confirmPassword}).unwrap()
                console.log('Login response:', res)
                dispatch(setCredentials({...res}))
                navigate(redirect)
            } catch(err) {
                console.error('Login error:', err)
                toast.error(err?.data?.message || err.error)
            }
            
        }
        
    }

    const googleSuccess = async (credentialResponse) => {
        try {
            const res = await loginGoogle({ token: credentialResponse.credential }).unwrap()
            dispatch(setCredentials({...res}))
            navigate(redirect)
        } catch(err) {
            toast.error(err?.data?.message || err.error || 'Google Sign-In Failed')
        }
    }

    const googleError = () => {
        toast.error('Google Sign-In Failed')
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            <Form onSubmit={submitHandler}>

            <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='enter name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-3' controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-3' controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='confirmpassword'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button 
                    type='submit' 
                    variant='primary' 
                    className='mt-3 me-3'
                    disabled={isLoading || isGoogleLoading}
                >
                    Register
                </Button>
                {isLoading && <Loader />}
            </Form>

            <div className="mt-4">
                <p>Or sign up with:</p>
                <GoogleLogin
                    onSuccess={googleSuccess}
                    onError={googleError}
                    useOneTap
                />
            </div>

            <Row className='py-3'>
                <Col>
                    already have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen