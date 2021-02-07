import uuid from 'uuid';
import database from '../firebase/firebase';

// component calls acction generator
// action generator returns the ojbect
// component dispatches object
// redux store changes

// Action generators
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense,
    
});


// This is asyncronous action. It returns a function and then this function is passed to the reducer via the fake dispatch call from component.
// The reducer then runs this function where in we are first pushing the data to the firebase database and on a successful write, call the real 
// add addExpense action which will return the action object consisting of the component-passed data. We then give this action object to the real 
// dispatch call. This will in turn call the reducer and the state will get updated in the redux store.
export const startAddExpense = (expenseData = {}) => {
    // Setup the destructured defaults
    const {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = expenseData;
    const expense = {description, note, amount, createdAt };

    // Redux calls this thunk function with a dispatch method
    return (dispatch, getState) => {
        const userId = getState().auth.userId;
        // Push to firebase database
        // returning the bellow will allow us do promise chaining for testing purposes
        return database.ref(`users/${userId}/expenses`)
            .push(expense)
            .then((ref) => {
                // Only after successful write to the DB we want to flush same data into our redux store
                dispatch(addExpense({
                    id: ref.key, // firebase database will create a unique key, under which it will save the expense object. We want to retrive that unique key as our id.
                    ...expense
                }))
            })
            .catch((e) => {
                console.log('Error writing addingExpense to DB: ' + e);
                // Then maybe show this on a modal pop up.
            })
    }
}


// Removing expense by id. Passing Id is compulsory
export const removeExpense = (id) => ({
    type: 'REMOVE_EXPENSE',
    id
});

export const startRemoveExpense = (id) => {

    return (dispatch, getState) => {
        const userId = getState().auth.userId;
        return database.ref(`users/${userId}/expenses/${id}`)
            .remove()
            .then(() => {
                dispatch(removeExpense(id));
            })
            .catch((e) => {
                console.log('Error writing addingExpense to DB: ' + e);
                // Then maybe show this on a modal pop up.
            })
    }
}

export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates) => {

    return (dispatch, getState) => {
        const userId = getState().auth.userId;
        return database.ref(`users/${userId}/expenses/${id}`)
            .update(updates)
            .then((ref) => {
                // Only after successful write to the DB we want to flush same data into our redux store
                dispatch(editExpense(id, updates))
            })
            .catch((e) => {
                console.log('Error writing addingExpense to DB: ' + e);
                // Then maybe show this on a modal pop up.
            })
    }
}

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    const expenses = [];
    return (dispatch, getState) => {
        const userId = getState().auth.userId;
        return database.ref(`users/${userId}/expenses`)
            .once('value')
            .then((snapshot) => {
                
                // Parsing the snapshot
                snapshot.forEach(childSnapshot => {
                    expenses.push({
                        id: childSnapshot.key,
                        ...childSnapshot.val()
                    });
                });

                dispatch(setExpenses(expenses));
            })
            .catch((e) => {
                console.log('Error fetching expenses from DB: ' + e);
                // Then maybe show this on a modal pop up.
            })
    }
}