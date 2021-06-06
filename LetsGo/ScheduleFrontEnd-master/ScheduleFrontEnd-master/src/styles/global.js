import { createGlobalStyle } from 'styled-components'

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: 'border-box';
    }

    body {
        font-family: Arial, Helvetica ,sans-serif;
        background: #81ecec;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    html, body, #root {
        height: 100%;
    }
`;