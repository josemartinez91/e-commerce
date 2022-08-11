import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsThunk } from '../store/slices/products.slice';
import imageButton from '../img/free_icon_1.svg'
import { minus, plus } from '../img';
import { addProductCartThunk } from '../store/slices/cart.slice';
const ProductDetail = () => {

    const products = useSelector(state => state.products)
    const { id } = useParams()
    const [productDetail, setProductDetail] = useState({})
    const [suggestProduct, setSuggestProduct] = useState([])
    const [counter, setCounter] = useState(1);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addProduct = () => setCounter(counter + 1)
    const removeProduct = () => setCounter(counter - 1)

    useEffect(() => {
        dispatch(getProductsThunk())
    }, [id])

    useEffect(() => {
        const productFind = products.find((productItem) => productItem.id === Number(id));
        setProductDetail(productFind)

        const filteredProduct = products.filter((productItem) =>
            productItem.category.id === productFind?.category.id)
        setSuggestProduct(filteredProduct)
    }, [products, id])

    const [image, setImage] = useState("")
    const imagePagination = productDetail?.productImgs?.slice(0, 3)


    

    const addCountProduct = ()=>{
        alert('adding product')
        const product ={
            id: productDetail.id,
            quantity: counter
        }
        dispatch(addProductCartThunk(product))
        setCounter(1)
        console.log(product)
    }


    return (
        <div>
            <div className='header-container-md'>
                <div className='image-container col-6-md'>
                    <img className='main-image' src={image == "" ? productDetail?.productImgs?.[0] : image} alt="" />
                    <ul className='li-container'>
                        {imagePagination?.map(imageItem => (
                            <li
                                className='options-image-item'
                                key={imageItem}
                                onClick={() => setImage(imageItem)}
                            >
                                <img className='options-image' src={imageItem} alt="" />
                            </li>
                        ))}
                    </ul>

                </div>
                <div className='txt-center col-6-md'>
                    <div>
                        <h2>{productDetail?.title}</h2>
                        <p>{productDetail?.description}</p>

                    </div>
                    <div className='col-12 container-filter'>
                        <div className='col-6 txt-center'>
                            <p>Price </p>
                            <b><p>$ {productDetail?.price}</p></b>
                        </div>
                        <div className='col-6 txt-center'>
                            <p>Quantity</p>
                            <div className='container-search'>
                                <button className='add-button' onClick={removeProduct} disabled={counter === 1}>
                                    <img className='add-image' src={minus} alt="" />
                                </button>
                                <div className='add-content'>
                                    {counter}
                                </div>

                                <button className='add-button' onClick={addProduct}>
                                    <img className='add-image' src={plus} alt="" />
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className='txt-center'>
                        <button className='shop-button' onClick={addCountProduct}>Add to cart <img className='image-button' src={imageButton} alt="" /></button>
                    </div>
                </div>
            </div>






            <div className='txt-center'>
                <p className='text-after-button'>Similar items</p>
            </div>
            <ul className='txt-center suggest-ul-md'>
                {suggestProduct.map(products => (
                    <li
                        key={products.id}
                        className='suggest-item col-6-md'
                        onClick={() => navigate(`/product/${products.id}`)}
                    >
                        <img className='main-image' src={products.productImgs[0]} alt="" />
                        <p>{products.title}</p>


                    </li>
                ))}
            </ul>
        </div>
    );

};

export default ProductDetail;