import { ToastContainer } from 'react-toastify'
import './App.css'
import RouterCongif from './config/RouterCongif'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div>
      <RouterCongif />
      <ToastContainer autoClose={2500} />
    </div>


  )
}

export default App
