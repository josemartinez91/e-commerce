import React, { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { getProductsThunk } from '../store/slices/products.slice';
import { carrito, cart, cart2, shop, store, user2 } from '../img';
import { useNavigate } from 'react-router-dom'
import CartSidebar from './CartSidebar';

const NavBar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [show, setShow] = useState(false);

   

    const reload = () => {
        dispatch(getProductsThunk())
    }
    const token = localStorage.getItem('token')

    const logout = () => {
        localStorage.setItem('token', '')
        navigate('/login')

    }
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if(token){
            setShow(true)
        }else{
            navigate('/login')
        }
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#/" onClick={() => reload()} className='title-nav'>E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto nav-container nav-burguer">
                            <Nav.Link href="#/purchases" ><img src={shop} alt="" className='shop-image' /></Nav.Link>
                            
                            {token ? (<Nav.Link href="#" onClick={() => logout()}><img src={user2} alt="" /><br />Logout</Nav.Link>)

                                : <Nav.Link href="#/login"><img src={user2} alt="" /> <br /> Login</Nav.Link>}
                            <Nav.Link href="#" onClick={handleShow}><img src={carrito} alt="" /></Nav.Link>


                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

           <CartSidebar show={show} handleClose={handleClose}/>
        </>

    );
};

export default NavBar;