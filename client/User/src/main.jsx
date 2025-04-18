import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomProvider>
    <Provider store={store}>  
    <HelmetProvider>
    <App />
    </HelmetProvider>
    </Provider>
    </CustomProvider>
  </React.StrictMode>,
)
