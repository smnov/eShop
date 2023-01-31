import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate, createSearchParams } from 'react-router-dom'
import { Button, Form, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'

function RegisterScreen() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [message, setMessage] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const {loading, error, userInfo} = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate({
                pathname: '/',
                search: createSearchParams({

                }).toString()
            })
        }
    }, [navigate, userInfo])

    const submitHandler = (e) => {
        e?.preventDefault();
        if (password !== password2) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(name, email, password))
        }
    }
  return (
    <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='username'
                    placeholder='enter name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    required
                    type='email'
                    placeholder='Enter Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                </Form.Control>
                </Form.Group>
            <Form.Group controlId='password2'>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                    required
                    type='password'
                    placeholder='Confirm password'
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}>
                </Form.Control>
                </Form.Group>
                <Button type='submit'>Sign Up</Button>
        </Form>
            <Row className='py-3'>
                <Col>
                Have an account? <Link to='/login'>
                    Sign In
                    </Link></Col>
            </Row>
    </FormContainer>
  )
}

export default RegisterScreen