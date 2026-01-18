import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterCongif from './config/RouterCongif'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/Store';
import type { ProductType, UserType } from './types/Types';
import ProductService from './services/ProductService';
import { setCurrentUser, setProducts } from './redux/AppSlice';
import { useEffect } from 'react';
import { setBasket } from './redux/BasketSlice';

function App() {

  const { currentUser } = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();

  const getAllProducts = async () => {
    const products: ProductType[] = await ProductService.getAllProducts();
    dispatch(setProducts(products));
  }

  useEffect(() => {
    getAllProducts();
  }, [])

  useEffect(() => {
    const currentUserString: string | null = localStorage.getItem("currentUser");
    if (currentUserString) {
      const currentUser: UserType = JSON.parse(currentUserString) as UserType;
      dispatch(setCurrentUser(currentUser));
    }
  }, [])

  useEffect(() => {
    const basketString = localStorage.getItem("basket");
    if (basketString) {
      const basket: ProductType[] = JSON.parse(basketString) as ProductType[];
      dispatch(setBasket(basket));
    }
  })

  return (
    <div>

      {currentUser && <Navbar />}
      <RouterCongif />
      <ToastContainer autoClose={2500} />
      <Spinner />
    </div>


  )
}

export default App
