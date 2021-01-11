import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

// exporting it separately for testing purposes
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ?
                <p>Expense list is empty</p>
                :
                (
                    props.expenses.map((expense, index) =>
                        <ExpenseListItem
                            key={expense.id}
                            count={index + 1}
                            {...expense}
                        />)
                )
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);