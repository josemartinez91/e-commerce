import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios'
const SignUp = () => {

    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm()
    const [message, setMessage] = useState('')

    const defaultValues = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone: ''
    }

    const submit = (data) => {

        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users', data)
            .then(res => {
                setMessage('Usuario creado correctamente')

                console.log(message)
                alert(`${message}`)
                navigate('/login')

            })

            .catch(error => console.log(error.response))
        console.log(data)
        reset(defaultValues)
    }

    return (

        <div className='col-12 login-main-container '>
            <div className='login-form-container mt-3'>
                <Form className='form-login' onSubmit={handleSubmit(submit)}>
                    <div>
                        <h4>Sign Up</h4>
                    </div>
                    <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" {...register('email')} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" {...register('firstName')} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" {...register('lastName')} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" {...register('password')} />
                    </Form.Group>
                    <Form.Group className="mb-3" >
                        <Form.Label>Phone (10 characters)</Form.Label>
                        <Form.Control type="tel" {...register('phone')} />
                    </Form.Group>
                    <div>{message}</div>
                    <div className='login-button-container'>
                        <button type='submit' className='login-button txt-center'>Sign up</button>
                    </div>
                    <div>
                        <span>Already have a account, <button type='button' className='signup-button' onClick={() => navigate('/login')}>Log in</button></span>
                    </div>
                </Form>

            </div>
        </div>

    );
};

export default SignUp;