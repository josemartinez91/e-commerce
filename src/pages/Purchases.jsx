import React, { useEffect } from 'react';
import{useSelector, useDispatch} from 'react-redux'
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import PurchaseItem from '../components/PurchaseItem';


const Purchases = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)

    useEffect(()=>{
        dispatch(getPurchasesThunk())
    },[])
   

   

  
    return (
        <div className='main-container'>
            <h1>Purchases product</h1>
            {purchases.map(purchase=>(
                <PurchaseItem purchase={purchase} key={purchase.id}/>
            ))}
        </div>
    );
};

export default Purchases;