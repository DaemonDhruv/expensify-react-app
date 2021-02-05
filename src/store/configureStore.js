/**
 * Redux store
 * 
 * @author Dhruv N. Bindoria.
 * @since  1.0.0
 */

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';


/*
    store = {
        [ // Expenses
            {d, n, a, c}, 
            {d, n, a, c}, 
            .. 
        ],
        { // Current Filters
            text, 
            sortBy, 
            startDate, 
            endate 
        } 
    }
*/

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer,
            auth: authReducer
        }),
        composeEnhancers(applyMiddleware(thunk)) // Thunk is a function, this allows redux to accept functions rahter than action objects and turn the function returns an action object and push the data to the firebase database. So call asynchronous actions.
       // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for redux dev tools to connect to this store
    );

    return store;
}
