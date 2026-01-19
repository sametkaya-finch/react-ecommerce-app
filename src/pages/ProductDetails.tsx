import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { setLoading } from '../redux/AppSlice';
import ProductService from '../services/ProductService';
import { useEffect, useState } from 'react';
import type { ProductType } from '../types/Types';
import '../css/ProductDetails.css'
import Button from '@mui/material/Button';
import { addProductToBasket } from '../redux/BasketSlice';

function ProductDetails() {

    const { productId } = useParams();
    const dispatch = useDispatch();
    const [product, setProduct] = useState<ProductType | null>();
    const [count, setCount] = useState<number>(0);

    const getProductById = async (productId: number) => {
        try {
            dispatch(setLoading(true));
            const product: ProductType = await ProductService.getProductById(productId);
            setProduct(product);
        } catch (error) {
            toast.error("Product details could not be loaded." + error);
        } finally {
            dispatch(setLoading(false));
        }
    }

    const addBasket = () => {
        if (product) {
            const payload: ProductType = {
                ...product,
                count: count
            }
            dispatch(addProductToBasket(payload));
            toast.success("Product added to cart")
        }
    }

    useEffect(() => {
        getProductById(Number(productId));
    }, [])


    return (
        <Container maxWidth="lg">

            {
                product && <>
                    <div className='main'>
                        <div>
                            <img className='image' src={product.image} />
                        </div>
                        <div className='description-main'>
                            <div className='title'> {product.title} </div>
                            <div className='description'> {product.description} </div>
                            <div className='price'> {product.price}$ </div>

                            <div style={{ marginTop: '20px' }}>
                                <span className='increase' onClick={() => setCount(count + 1)}> + </span>
                                <span className='count'> {count} </span>
                                <span className='decrease' onClick={() => setCount(count - 1)}> - </span>
                            </div>
                            <div>
                                <Button onClick={addBasket} color='info' variant='contained' size='small' sx={{ marginTop: '20px' }}> Add to Cart </Button>
                            </div>
                        </div>
                    </div>
                </>
            }

        </Container>

    )
}

export default ProductDetails