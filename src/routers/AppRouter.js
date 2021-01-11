import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import PageNotFound from '../components/PageNotFound';

const AppRouter = () => (
    <Router>
        <div>
            <Header />
            <Switch> {/* Switch will stop looking for the rest if a match is found */}
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={PageNotFound} /> {/* This is always a match. Because path is not given. So put it at last */}
            </Switch>
        </div>
    </Router>
);

export default AppRouter;