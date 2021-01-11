import React from 'react';
import { shallow } from 'enzyme';
import { filters, altFilters } from '../fixtures/filters';
import { ExpenseFilters } from '../../components/ExpenseFilters';

let setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByAmount = jest.fn();
    sortByDate = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    
    wrapper = shallow(
        <ExpenseFilters 
            setTextFilter={setTextFilter}
            sortByAmount={sortByAmount}
            sortByDate={sortByDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            filters={filters}
        />
    )
});

test('should render ExpenseFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseFilters with alt filters correctly', () => {
    // .setProps() allows to change props of a component in the test environment
    // it's like setState()
    wrapper.setProps({
        filters: altFilters // this is the name of the prop and it value
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    wrapper.find('input').simulate('change', /* this is e */ {
        target: { value: altFilters.text }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(altFilters.text);
});

test('should sort by date', () => {
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', {
        target: { value: 'date' }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', {
        target: { value: 'amount' }
    });
    expect(sortByAmount).toHaveBeenLastCalledWith();
});

test('should handle date changes', () => {
    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate: altFilters.startDate,
        endDate: altFilters.endDate
    });
    expect(setStartDate).toHaveBeenCalledWith(altFilters.startDate);
    expect(setEndDate).toHaveBeenCalledWith(altFilters.endDate);
});

test('should handle date focus changes', () => {
    const calendarFocused = 'endDate'
    wrapper.find('DateRangePicker').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe(calendarFocused);
});