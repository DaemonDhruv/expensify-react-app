import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        // Redirect programatically after successful submit-dispatch to dashboard
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                Add you expense here
                <ExpenseForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}

// By doing this, we are separating redux-react even apart
// And making it more test friendly
// Now the react component don't have to explicitly use 
// redux methods. As all data and methods will be passed 
// in as normal props

// Why we separated concerns for testing purposes?
// Becuase dispatch() need addExpense() and passing that would
// be difficult and out of our scope here. We only are concerned
// with the working of onSubmit. Whether it is getting called
// with proper values or not.
const matchDispatchToProps = (dispatch) => ({
        // This is going be passed on in the props
        startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, matchDispatchToProps)(AddExpensePage);