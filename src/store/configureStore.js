/**
 * Redux store
 * 
 * @author Dhruv N. Bindoria.
 * @since  1.0.0
 */

import { createStore, combineReducers } from 'redux';
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
export default () => {
    const store = createStore(
        combineReducers({
            expenses: expensesReducer,
            filters: filtersReducer
        }),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // for redux dev tools to connect to this store
    );

    return store;
}
