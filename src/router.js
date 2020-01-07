import React from 'react';
import Page404 from './views/Page404';

import Details from './components/Details';
import Home from './components/Home';

import {
    Route,
    Switch
} from 'react-router-dom';

function Router() {
    return (
        <Switch>
            <Route exact path={'/'} render={() => <Home />}></Route>
            <Route path={'/list/:id'} render={() => <Details />}></Route>
            <Route component={Page404} />
        </Switch>
    );
}

export default Router;
