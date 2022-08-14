import React from 'react';
import { Form, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';


const Login = () => {

    const { register, handleSubmit, reset } = useForm()
    const navigate = useNavigate()

    const defaultValues = {
        email: '',
        password: ''
    }

    const submit = data => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                console.log(res.data)
                localStorage.setItem('token', res.data.data.token)
                navigate('/')
            })
            .catch(error => {
                if (error.response.status === 401 || 404) {
                    alert('Credenciales Invalidas')
                    console.log(error.response)
                }
            })
        reset(defaultValues)
    }
    return (
        <div className='col-12 login-main-container'>

            <div className='login-form-container mt-3'>


                <Form onSubmit={handleSubmit(submit)} className='form-login'>
                    <h2>Welcome! Enter your email and password to continue</h2>
                    <Card className='test-data-container'>
                        <Card.Body className='test-data'>
                            <h3>Test data</h3>
                            <p>mason@gmail.com</p>
                            <p>mason1234</p>
                        </Card.Body>
                    </Card>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" {...register('email')} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register('password')} />
                    </Form.Group>
                    <div className='login-button-container'>
                        <button type='submit' className='login-button txt-center'>Login</button>
                    </div>

                    <div>
                        <span>Don't have a account, <button type='button' className='signup-button' onClick={()=>navigate('/signup')}>Sign Up</button></span>
                    </div>

                </Form>
            </div>


        </div>
    );
};

export default Login;