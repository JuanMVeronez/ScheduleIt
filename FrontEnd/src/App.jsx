import React from 'react';
import { Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import { AuthProvider} from './Context/AuthContext';
import Routes from './routes';
import history from './history';


function App() {
  return (
    <>
      <AuthProvider>
          <HelmetProvider>
            <Router history={history}>
              <Routes />
            </Router>
          </HelmetProvider>
      </AuthProvider>
      <ToastContainer />
    </>
  );
}

export default App;
