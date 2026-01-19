import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../redux/Store';
import { setDrawer, updateBalance } from '../redux/AppSlice';
import type { ProductType, UserType } from '../types/Types';
import '../css/BasketDetails.css'
import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { calculateBasket, removeProductFromBasket, setBasket } from '../redux/BasketSlice';
import { toast } from 'react-toastify';

function BasketDetails() {

    const { drawer, currentUser } = useSelector((state: RootState) => state.app);
    const { basket, totalAmount } = useSelector((state: RootState) => state.basket);


    const dispatch = useDispatch();

    const closeDrawer = () => {
        dispatch(setDrawer(false));
    }

    useEffect(() => {
        dispatch(calculateBasket());
    }, [basket])

    const removeProduct = (productId: number) => {
        dispatch(removeProductFromBasket(productId));
    }

    const buy = () => {
        if (currentUser?.balance && currentUser.balance < totalAmount) {
            toast.warn("Your balance is insufficient");
            return;
        }
        if (currentUser?.balance) {
            const remainingTotal = currentUser.balance - totalAmount;
            const payload: UserType = {
                ...currentUser,
                balance: remainingTotal
            }
            dispatch(updateBalance(payload));
            dispatch(setBasket([]));
            localStorage.removeItem("basket");
            toast.success("Purchase successful")
        }

    }


    return (
        <Drawer open={drawer} anchor='right' onClose={closeDrawer} >

            {
                basket && basket.map((product: ProductType) => (
                    <>
                        <div className='main'>
                            <div style={{ marginRight: '15px' }}><img src={product.image} width={60} height={60} alt="" /></div>
                            <div className='product-title'>{product.title.substring(0, 30)} </div>
                            <div style={{ marginRight: '40px', fontWeight: 'bold' }}>{product.count}</div>
                            <div className='product-price'>{product.price}$</div>
                            <div><Button onClick={() => removeProduct(product.id)} size='small' variant='outlined' >Delete</Button> </div>
                        </div >

                    </>
                ))
            }

            <div className='total-amount'>Total: {totalAmount}$</div>
            <div className='total-amount'> <Button onClick={buy} size='small' variant='contained' color='success' >BUY</Button> </div>

        </Drawer >


    )
}

export default BasketDetails