import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Action generators

const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}) => ({
        type: 'ADD_EXPENSE',
        expense: {
            id: uuid(),
            description,
            note,
            amount,
            createdAt
        }
    });

// Removing expense by id. Passing Id is compulsory
const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});

const setStartDate = (startDate) => ({ // if argument is not passed.. the default value by-default will be undefined, so no need to explictly set it.
    type: 'SET_START_DATE',
    startDate
});

const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});
// Expenses Reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense];
        case 'REMOVE_EXPENSE':
            return state.filter(({ id }) => id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map(expense => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                } else {
                    return expense;
                }
            });
        default:
            return state;
    }
};

// Filters Reducer

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return { ...state, text: action.text };
        case 'SORT_BY_AMOUNT':
            return { ...state, sortBy: 'amount' };
        case 'SORT_BY_DATE':
            return { ...state, sortBy: 'date' };
        case 'SET_START_DATE':
            return { ...state, startDate: action.startDate };
        case 'SET_END_DATE':
            return { ...state, endDate: action.endDate };
        default:
            return state;
    }
};


// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        // First well check if the filter is set or not. If it is not set then we want to display all items.
        // If it is set then we want to apply filter specific condition.
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = text.length == 0 || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        // Sort by date, descending: most recent one, first.
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; // if returned 1 then, put b first, if -1 then put a first -> check MDN array.sort()
        }
        // Sort by amount, descending: higher amount, first.
        else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

// Store creation

const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    console.log(state.expenses, state.filters)
    console.log(getVisibleExpenses(state.expenses, state.filters));
});

// This returns the action object
const expense1 = store.dispatch(addExpense({ description: 'Rent', amount: 300, createdAt: 1000 }));
const expense2 = store.dispatch(addExpense({ description: 'Coffee', amount: 200, createdAt: 2000 }));

// //store.dispatch(removeExpense(expense1.expense.id));
// store.dispatch(editExpense(expense2.expense.id, { amount: 300 }));

//store.dispatch(setTextFilter('Rent'));
// //store.dispatch(setTextFilter());

//store.dispatch(sortByAmount());
// store.dispatch(sortByDate());

//store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));
// store.dispatch(setEndDate());