import React from 'react';
import { Router } from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

// import {Provider as AlertProvider} from 'react-alert'
// import AlertTemplate from 'react-alert-template-basic';

// import { alertConfig } from './Context/hook/usePopUpAlert'
import { AuthProvider} from './Context/AuthContext'
import Routes from './routes';
import history from './history';

{/* <AlertProvider template={AlertTemplate} {...alertConfig}>
</AlertProvider> */}

function App() {
  return (
    <AuthProvider>
        <HelmetProvider>
          <Router history={history}>
            <Routes />
          </Router>
        </HelmetProvider>    
    </AuthProvider>
  );
}

export default App;
