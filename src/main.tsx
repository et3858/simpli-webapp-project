import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';

// import * as bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


const BASENAME = "/";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={BASENAME}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
