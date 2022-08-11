import React, { useState } from 'react';

const PurchaseItem = ({ purchase }) => {


    const [purchases, setPurchases] = useState(purchase.cart.products)

   



    return (
        <ul className='main-container'>
            <div className='list-container'>
                {/* <h2>{purchase.createdAt}</h2> */}
                {purchases.map(product => (
                    <li className='list-item' key={product.id}>
                        <div className='col-4'>
                            <p>{product.title}</p>
                        </div>
                        <div className='col-4'>
                            <div className='box'>
                                {product.productsInCart.quantity}
                            </div>

                        </div>
                        <div className='col-4'>
                            ${product.price}
                        </div>

                    </li>
                ))}
            </div>

        </ul>
    );
};

export default PurchaseItem;