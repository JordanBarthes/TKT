import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import serviceWorker from './serviceWorker';
import theme from './theme';

import './index.css';

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </MuiThemeProvider>,
    document.getElementById('root'),
);
serviceWorker();
