import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

// exporting it separately for testing purposes
export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>

        
        <div className="list-body" >
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message" >
                        <span>No expenses</span>
                    </div>
                ) :
                    (
                        props.expenses.map(
                            (expense, index) =>
                                <ExpenseListItem
                                    key={expense.id}
                                    count={index + 1}
                                    {...expense} />
                        )
                    )
            }
        </div>
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);