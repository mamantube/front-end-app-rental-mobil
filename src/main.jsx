import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Store from "./store/index.js";
import { Provider} from "react-redux";
// import "./assets/CSS/Global.css";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={Store} >
      <App />
    </Provider>
  </React.StrictMode>,
)
