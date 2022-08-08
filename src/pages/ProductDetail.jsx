import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsThunk } from '../store/slices/products.slice';
import imageButton from '../img/free_icon_1.svg'

const ProductDetail = () => {

    const products = useSelector(state => state.products)
    const { id } = useParams()
    const [productDetail, setProductDetail] = useState({})
    const [suggestProduct, setSuggestProduct] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

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


    console.log(imagePagination)

    const toggleSuggest=()=>{
        navigate(`/product/${products.id}`)
        // setImage("")
    }


    return (
        <div>
            <div>
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
            <div>
                <h2>{productDetail?.title}</h2>
                <p>{productDetail?.description}</p>
                <p>Price </p>
                <b><p>$ {productDetail?.price}</p></b>
            </div>

            <div>
                <button className='shop-button'>Add to cart <img className='image-button' src={imageButton} alt="" /></button>
            </div>
            <div>
                <p className='text-after-button'>Similar items</p>
            </div>
            <ul>
                {suggestProduct.map(products => (
                    <li
                        className='options-image-item'
                        onClick={() => navigate(`/product/${products.id}`) }
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