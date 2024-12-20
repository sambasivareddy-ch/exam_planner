import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";

import store from './store/store';
import './index.css';
import App from './App';

// Root rendering of the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter future={{
            // Support for future react-router-dom upgrade
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        }}>
            <App/>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
