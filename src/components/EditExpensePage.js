import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startEditExpense(this.props.expense.id, expense);
        this.props.history.push('/dashboard');
    }
    onRemove = () => {
        this.props.startRemoveExpense(this.props.expense.id);
        this.props.history.push('/dashboard');
    }
    render() {
        return (
            <div>
                <div className="page-header">
                    <div className="content-container">
                        <h1 className="page-header__title">Edit expense</h1>
                    </div>
                </div>


                <div className="content-container">
                    <ExpenseForm
                        expense={this.props.expense}
                        onSubmit={this.onSubmit}
                    />


                    <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
                </div>
            </div>
        );
    }
}

// Here we are searching the id we got from the URL from the router, with the id in the 
// expenses list from the state in the redux store
// And we are extract that particular expense and passing it in the props to our 
// EditExpensePage component
const mapStateToProps = (state, props /* this is the props we got from the router when it called the EditExpensePage component */) => ({
    expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

// mapDispatchToProps = (dispatch, [ownProps]) => ({})
const mapDispatchToProps = (dispatch) => ({
    startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);