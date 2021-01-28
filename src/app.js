import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import './style/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

store.subscribe(() => {
    const state = store.getState();
});

// state.unsubscribe() -> If needed in the future

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

ReactDOM.render( jsx, document.getElementById('app'));

// Component Stucture
/*
    <Header />

    <ExpenseDashboardPage>          -> path: "/"
        <ExpenseFilters />          -> ACCESSES STORE (read, write)
        <ExpenseList>               -> ACCESSES STORE (read only)
            <ExpenseListItem />     -> ACCESSES STORE (write)
            <ExpenseListItem />
            ..
            ..
        </ExpenseList>
    </ExpenseDashboardPage>


    <AddExpensePage>                -> path: "/create" | ACCESSES STORE (write)
        <ExpenseForm />             -> Reusable component
    </AddExpensePage>


    <EditExpensePage>               -> path: "/edit/:id" (expense.id) | ACCESSES STORE (read, write)
        <ExpenseForm />             -> Reusable component
    </EditExpensePage>
*/