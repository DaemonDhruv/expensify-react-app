import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import 'normalize.css/normalize.css';
import './style/style.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';
import { history } from './routers/AppRouter';
import { login, logout } from './actions/auth';
import LoadingPage from './components/LoadingPage';

const store = configureStore();
let hasRendered = false;

// We don't want app to re-render 
const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render( jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

store.subscribe(() => {
    const state = store.getState();
});

// state.unsubscribe() -> If needed in the future

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);


ReactDOM.render( <LoadingPage />, document.getElementById('app'));

firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        })
    } else {
        // On pressing the logout button we want the user to be redirected to the login page
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});

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