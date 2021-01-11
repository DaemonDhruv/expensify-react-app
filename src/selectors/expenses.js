/**
 * Filtered expense Items
 * 
 * @author Dhruv N. Bindoria.
 * @since  1.0.0
 */

import moment from 'moment';

/**
 * Filters and sorts the expenses.
 *
 * @since      1.0.0
 * 
 * @alias    getVisibleExpenses
 * @memberof selectos
 *
 * @param {Object[]}    expenses    -   Array of all expense objects (state.expenses)
 * @param {Object}      filters     -   Destructured state.filter object.
 *
 * @return {Object[]}   Array of expense items
 */
export default (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter(expense => {
        /* 
            If filters are not set then we want to display all items.
            If it is set then we want to apply filter specific condition.
            https://momentjs.com/docs/#/query/is-same-or-before/ 
        */ 
        const createdAtMoment = moment(expense.createdAt); //  Text to moment object
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day'): true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day'): true;
        const textMatch = text.length == 0 || expense.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        // Sort by date, descending: most recent one, first.
        if(sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1; 
        }
        // Sort by amount, descending: higher amount, first.
        else if(sortBy === 'amount') {
            return a.amount < b.amount ? 1 : -1;
        }
    });
}