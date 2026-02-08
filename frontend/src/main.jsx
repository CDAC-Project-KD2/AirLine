import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './components/redux/store.js'
import './config/axiosConfig.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <ToastContainer autoClose={2000} />
    </BrowserRouter>
  </Provider>
)
