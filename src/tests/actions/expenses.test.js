import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]); // Passing thunk as the middleware

// Putting dummy data in test db before every test case run.
beforeEach(done => {
    const expenseData = {};
    expenses.forEach(({id, description, note, amount, createdAt}) => {
        expenseData[id] = { description, note, amount, createdAt };
    })
    database.ref('expenses').set(expenseData).then(() => done());
});

test('should setup remove expense action object', () => {
    const result = removeExpense('123');
    expect(result).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123'
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense('123', { note: 'Rent' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123',
        updates: { note: 'Rent' }
    })
});

// test('should setup add expense action object to defaults', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// })

test('should setup add expense action object to values provided', () => {
    
    const action = addExpense(expenses[1]);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[1]
    })
});




// The parent function in test case will make a call to the db
// and return before the call gets compelete. Jest doesn't care about it.
// But what we want is to run a particular test after the call is made to
// the db and db have return a promise.
// So we need to tell jest that this test is aysncrhonous.
// And that it need to wait until a specific point in time, after we get the
// data from the db (i.e only after the code in the 'then' part runs)
// We do this by calling done(). So jest will wait till done() execute and finally
// the parent function will return. Until then the parent function will wait.

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const { description, amount, createdAt, note } = expenses[2];
    const expense = { description, amount, createdAt, note };
    
    // We needed to call this dispatch method hence we created a fake (mock) redux store
    // And pass our thunk middle ware to it.

    // Here, we have done promise chaning.
    // firebase is return a promise object (in action/expense.js code)
    // on this returned promise, a 'then' is already attached in the sourse code
    // and we are attaching another 'then' in this test code.
    store.dispatch(startAddExpense(expense)).then(() => {
        const actions = store.getActions(); // will get set of actions and put them in array
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expense
            }
        });

        // We are querying the database to check if test data is entered properly
        // We are returning the success promise from the db and in the promise chain
        // we will verify the result
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
     }).then((snapshot) => {
         expect(snapshot.val()).toEqual(expense);
         done();
     });
});

test('should add default expense to database and store', (done) => {
    const store = createMockStore({});
    const defaultExpense = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions(); 
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...defaultExpense
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
     }).then((snapshot) => {
         expect(snapshot.val()).toEqual(defaultExpense);
         done();
     });
});


test('should set up set expenses action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})


test('should fetch the expenses from firebase', () => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    })
})