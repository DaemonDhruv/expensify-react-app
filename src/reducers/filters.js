/**
 * Filters Reducer
 * 
 * @author Dhruv N. Bindoria.
 * @since  1.0.0
 */

import moment from 'moment';

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'), 
    endDate: moment().endOf('month')
};

/**
 * Reducer logic for managing filters
 *
 * @since      1.0.0
 * 
 * @alias    filtersReducer
 * @memberof reducers
 *
 * @param {Object}    state
 * @param {Object}    action   
 *
 * @return {Object}   Array of expense items
 */
export default (state = filtersReducerDefaultState, action) => {
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