import React from 'react';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({count, total}) => (
    <div>
        <h1>
            Viewing {count} expense{ (count !== 1) && 's' } totalling {numeral(total / 100).format('$0,0.00')}
        </h1>
    </div>
);

const mapStateToProps = (state) => {
    const expenses = getVisibleExpenses(state.expenses, state.filters)
    return {
        count: expenses.length,
        total: getExpensesTotal(expenses)
    }
};

export default connect(mapStateToProps)(ExpensesSummary);
