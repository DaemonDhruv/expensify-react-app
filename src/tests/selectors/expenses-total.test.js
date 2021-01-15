import expenses from '../fixtures/expenses';
import selectExpenseTotal from '../../selectors/expenses-total';


test('should return 0 if no expenses', () => {
    const result = selectExpenseTotal([]);
    expect(result).toBe(0);
});

test('should correctly add up a single expense', () => {
    const result = selectExpenseTotal([expenses[1]]);
    expect(result).toBe(10900);
});

test('should correctly add up multiple expenses', () => {
    const result = selectExpenseTotal(expenses);
    expect(result).toBe(15595);
});