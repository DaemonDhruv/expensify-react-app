import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';

const ExpenseDashboardPage = () => (
    <div>
        This is expense dashboard
        <ExpenseFilters />
        <ExpenseList />
    </div>
);

export default ExpenseDashboardPage;