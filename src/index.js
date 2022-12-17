import React from 'react';
import { HashRouter as Router} from 'react-router-dom';
// import { BrowserRouter  as Router} from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import './index.scss';
import 'macro-css';


import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router basename='/sneakers-react'>
      <App />
    </Router>
  </React.StrictMode>
);