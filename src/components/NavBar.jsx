import React from 'react';
import { Navbar, Container, Nav, } from 'react-bootstrap';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { getProductsThunk } from '../store/slices/products.slice';
import { carrito, cart, cart2, shop, store, user2 } from '../img';

const NavBar = () => {

    const dispatch = useDispatch()

    const reload = ()=>{
        dispatch(getProductsThunk())
    }

    return (

        <Navbar bg="light" expand="lg">
            <Container>
            <Navbar.Brand href="#/" onClick={()=>reload()}>E-commerce</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto nav-container">
                        <Nav.Link href="#/" ><img src={shop} alt="" className='shop-image' /></Nav.Link>
                        <Nav.Link href="#/login"><img src={user2} alt="" /></Nav.Link>
                        <Nav.Link href="#/purchases"><img src={carrito} alt="" /></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
};

export default NavBar;