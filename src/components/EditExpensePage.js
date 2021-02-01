import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from '../components/ExpenseForm';
import { editExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.editExpense(this.props.expense.id, expense);
        console.log('updated', expense);
        this.props.history.push('/');
    }
    onRemove = () => {
        this.props.startRemoveExpense(this.props.expense.id);
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <ExpenseForm
                    expense={this.props.expense}
                    onSubmit={this.onSubmit}
                />
                <button
                    onClick={this.onRemove}
                >
                    Remove
                 </button>
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
    editExpense: (id, expense) => dispatch(editExpense(id, expense)),
    startRemoveExpense: (id) => dispatch(startRemoveExpense(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);