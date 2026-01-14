import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterCongif from './config/RouterCongif'
import 'react-toastify/dist/ReactToastify.css';
import Spinner from './components/Spinner';

function App() {

  return (
    <div>
      <RouterCongif />
      <ToastContainer autoClose={2500} />
      <Spinner />
    </div>


  )
}

export default App
