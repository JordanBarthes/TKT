import React from 'react';
import Page404 from './views/Page404';
import App from './components/App';

import {
    Route,
    Switch
} from 'react-router-dom';

function Router() {
    return (
        <Switch>
            <Route exact path={'/'} render={() => <App />}></Route>
            <Route component={Page404} />
        </Switch>
    );
}

export default Router;
