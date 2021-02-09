import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({count, total}) => (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Viewing <span>{count}</span> expense{ (count !== 1) && 's' } totalling <span>{numeral(total / 100).format('$0,0.00')}</span></h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
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
