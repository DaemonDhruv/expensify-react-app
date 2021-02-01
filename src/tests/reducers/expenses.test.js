import expenses from '../fixtures/expenses';
import moment from 'moment';
import expensesReducer from '../../reducers/expenses';

test('should set defualt expenses state', () => {
    const state = expensesReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1], expenses[2]])
});

test('should not remove expense if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: '4',
        description: 'Electic Bill',
        note: '',
        amount: 4500,
        createdAt: moment(0).add(5, 'days').valueOf()
    }
    const action = {
        type: 'ADD_EXPENSE',
        expense
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
    const updates = {
        description: 'Electic Bill',
        note: '',
        amount: 4500,
        createdAt: moment(0).add(5, 'days').valueOf()
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '2',
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], { ...expenses[1], ...updates}, expenses[2]]);
});

test('should not edit expense if id not found', () => {
    const updates = {
        description: 'Electic Bill',
        note: '',
        amount: 4500,
        createdAt: moment(0).add(5, 'days').valueOf()
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '4',
        updates
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
})

test('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
})