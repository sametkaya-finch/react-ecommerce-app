import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterCongif from './config/RouterCongif'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';
import Navbar from './components/Navbar';
import { useSelector } from 'react-redux';
import type { RootState } from './redux/Store';

function App() {

  const { currentUser } = useSelector((state: RootState) => state.app);

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
