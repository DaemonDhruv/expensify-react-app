import React from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import LoginPage from '../components/LoginPage';
import PageNotFound from '../components/PageNotFound';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// BrowserRouter automatically uses 'history' and passes it to all the route components as props.
// We want to use our custom history and pass it to the normal <Router /> so that in futur if we want to export
// and use 'history' in another file which is unregistered in the router.. it will still work

export const history = createHistory();

const AppRouter = () => (
    <Router history={history}>
        <div>
            <Switch> {/* Switch will stop looking for the rest if a match is found */}
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route component={PageNotFound} /> {/* This is always a match. Because path is not given. So put it at last */}
            </Switch>
        </div>
    </Router>
);

export default AppRouter;