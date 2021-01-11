import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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

test('should setup add expense action object to defaults', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
})

test('should setup add expense action object to values provided', () => {
    
    const expenseData = {
        description: 'Rent',
        note: 'Too much this month',
        amount: 200,
        createdAt: 120000
    }
    
    const action = addExpense(expenseData);

    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
    })
})