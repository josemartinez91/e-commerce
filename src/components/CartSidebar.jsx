import Offcanvas from 'react-bootstrap/Offcanvas'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { buyCartThunk, getCartThunk } from '../store/slices/cart.slice';
import { useNavigate } from 'react-router-dom'


const CartSidebar = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk())
    }, [])

    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)

    console.log(cart)
    let total = 0

    const totalItem = (price, quantity) => {
        return price * quantity
        
    }

    const totalCart = () => {
        cart.forEach(element => {
            let itemTotal = 0
            itemTotal = element.price * element.productsInCart.quantity
            total += itemTotal
            
        });
        return total
    }

    return (
        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping cart</Offcanvas.Title>

            </Offcanvas.Header>
            <Offcanvas.Body>
                <ul>
                    {cart.map(productItem => (
                        <li

                            className='li-sidebar'
                            onClick={() => navigate(`/product/${productItem.id}`)}
                            key={productItem.id}>
                            <p>{productItem.title}</p>
                            <div className='quantity'>{productItem.productsInCart.quantity}</div>
                            <div className='total-item'>
                                <span>Total: </span>
                                <b>${totalItem(productItem.price, productItem.productsInCart.quantity)}</b>

                            </div>
                        </li>
                    ))}
                </ul>
            </Offcanvas.Body>
            <div className='total-cart total-item'>
                <span>Total: </span>
                <b>${totalCart()}</b>
            </div>
            <div className='txt-center'>
                <button className='shop-button' onClick={() => dispatch(buyCartThunk())}>Buy Cart</button>
            </div>

        </Offcanvas>
    );
};

export default CartSidebar;