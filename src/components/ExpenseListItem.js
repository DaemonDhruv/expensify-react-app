import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';
import { Link } from 'react-router-dom';

export const ExpenseListItem = ( { id, count, description, amount, createdAt, dispatch } ) => (
    <div>
        <Link to={`/edit/${id}`}><p>{count}. {description}, {amount} - {createdAt}</p></Link>
        <button
            onClick={ () => {
                dispatch(removeExpense(id))
            }}
        >
            Remove
        </button>
    </div>
); 

export default connect()(ExpenseListItem);