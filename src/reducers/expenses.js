/**
 * Expenses Reducer
 * 
 * @author Dhruv N. Bindoria.
 * @since  1.0.0
 */

/* 
    Array of expense items.
    Each item is an expense object having following properties:
        {
            description,
            note,
            amount,
            createdAt
        }
    Hence, state = [ {d, n, a, c}, {d, n, a, c}, .. ]
*/
const expensesReducerDefaultState = [];

/**
 * Reducer logic for managing our expenses
 *
 * @since      1.0.0
 * 
 * @alias    expensesReducer
 * @memberof reducers
 *
 * @param {Object[]}    state
 * @param {Object}      action   
 *
 * @return {Object[]}   Array of expense items
 */

 // We are not using 'break' here because we are returning
export default (state = expensesReducerDefaultState, action) => {
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
        case 'SET_EXPENSES':
            return action.expenses;
        default:
            return state;
    }
};