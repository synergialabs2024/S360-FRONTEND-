// @ts-ignore
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Spinner from './views/spinner/Spinner';

import './index.css';

import './utils/i18n';
import './_mockApis';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<Spinner />}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
);
