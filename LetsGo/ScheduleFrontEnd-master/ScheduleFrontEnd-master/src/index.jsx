import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import GlobalStyle from './styles/global';

ReactDOM.render(
  <React.StrictMode>
    {console.log('this work')}
    <App />
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById('root')
);
