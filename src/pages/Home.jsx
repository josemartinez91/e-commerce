import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { filterCategoryThunk, filterProductsThunk, getProductsThunk } from '../store/slices/products.slice';
import { useNavigate } from 'react-router-dom'
import { InputGroup, Form, Button, ListGroup, Row, Card, Col } from 'react-bootstrap'
import axios from 'axios'
import Accordion from 'react-bootstrap/Accordion';
import { free_icon_1, searchIcon, filter } from '../img';
import { addProductCartThunk } from '../store/slices/cart.slice';



const Home = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchValue, setSearchValue] = useState('')
    const [categories, setCategories] = useState([])
    const products = useSelector(state => state.products)
    useEffect(() => {
        dispatch(getProductsThunk())

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])


    const addProduct = (id) => {
        const product = {
            id,
            quantity: 1
        }
        dispatch(addProductCartThunk(product))
        console.log(product)
    }


    return (
        <div >
            <Row>
                <Col lg={3}>
                    <div className='container-filter mt-5 ms-2 '>
                        <Accordion className='accordion-container container-filter-xl container-filter-xs' defaultActiveKey="0">
                            <Accordion.Item className='accordion-item-home'>
                                <Accordion.Header>Filter <img className='filter-image' src={filter} alt="" /></Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup className='mt-5'>
                                        <ListGroup.Item onClick={() => dispatch(getProductsThunk())}>Clear Filter</ListGroup.Item>
                                        {categories.map(category => (
                                            <ListGroup.Item
                                                key={category.id}
                                                onClick={() => dispatch(filterCategoryThunk(category.id))}
                                            >
                                                {category.name}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Accordion.Body>

                            </Accordion.Item>
                        </Accordion>
                    </div>


                </Col>


                <Col className='card-container'>

                    <div className='container-search mt-5'>
                        <InputGroup className="mb-3 container-input">
                            <Form.Control
                                placeholder="What are you looking for?"
                                aria-label="What are you looking for?"
                                aria-describedby="basic-addon2"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <button className='button-search' onClick={() => dispatch(filterProductsThunk(searchValue))}>
                                <img className='image-home-button' src={searchIcon} alt="" />
                            </button>
                        </InputGroup>
                    </div>
                    <Row xs={1} md={2} xl={3} className='g-4 container-search'>
                        {products?.map(product => (
                            <Col key={product.id} className='container-card'>
                                <Card >
                                    <div >
                                        <div onClick={() => navigate(`/product/${product.id}`)}>
                                            <div className='image'>
                                                <img src={product.productImgs[0]} alt="" />
                                                {/* <img src={product.productImgs[1]} className='image-over' alt="" /> */}
                                                {/* <Card.Img variant='top' src={product.productImgs[0]} />
                                        <Card.Img variant='top' src={product.productImgs[1]} className='image-over' /> */}
                                            </div>

                                            <Card.Body>
                                                <Card.Title> <b>{product.title}</b> </Card.Title>
                                                <div className='container-price'>
                                                    <div>
                                                        <p>Price </p>
                                                        <b><p>$ {product.price}</p></b>
                                                    </div>

                                                </div>


                                            </Card.Body>
                                        </div>
                                        <div className='container-home-button'>
                                            <button className='home-button' onClick={() => addProduct(product.id)}>
                                                <img className='image-home-button' src={free_icon_1} alt="" />
                                            </button>
                                        </div>
                                    </div>


                                </Card>
                            </Col>



                        ))}
                    </Row>

                </Col>


            </Row>

        </div>
    );
};

export default Home;