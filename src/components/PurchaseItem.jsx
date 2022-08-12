import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const PurchaseItem = ({ purchase }) => {


    const [purchases, setPurchases] = useState(purchase.cart.products)
    const navigate = useNavigate()
   



    return (
        <ul className='main-container'>
            <div className='list-container'>
                <div className='date-container'>
                  <p><b>{purchase.createdAt}</b></p>  
                </div>
                
                {purchases.map(product => (
                    <li className='list-item' key={product.id}>
                        <div className='col-4' onClick={()=>navigate(`/product/${product.id}`)}>
                            <p>{product.title}</p>
                        </div>
                        <div className='col-4 quantity-container'>
                            <div className='box-quantity'>
                                {product.productsInCart.quantity}
                            </div>

                        </div>
                        <div className='col-4'>
                            <b>${product.price}</b>
                            
                        </div>

                    </li>
                ))}
            </div>

        </ul>
    );
};

export default PurchaseItem;