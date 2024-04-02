
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// import './index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    />
  </BrowserRouter>,
);


