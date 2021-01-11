import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});


test('should render ExpenseForm with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);

    // This snapshot is before simulating the error
    expect(wrapper).toMatchSnapshot();
    // We are simulating a form submit event
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    // Here the form have been sumitted with all empty values,
    // In the ExpenseForm component we have set a condition that,
    // whenever a form is submitted with empty description or empty
    // amount, an error message is set up in the component's state
    
    // To check if the error is set or not, we will check the state
    // to see if the lenght of the error message is greater than 0
    expect(wrapper.state('error').length).toBeGreaterThan(0);

    // And to check if the error message is getting displayed, we'll
    // match it to a snapshot
    expect(wrapper).toMatchSnapshot();
})

test('should set description on input change', () => {
    const value = 'Dummy description'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', { 
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
    expect(wrapper).toMatchSnapshot();
})

test('should set not on textarea change', () => {
    const value = 'Dummy note'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', { 
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);
})

test('should set amount if valid input', () => {
    const value = '22.50';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);
})

test('should set amount if valid input', () => {
    const value = '12.222';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe('');
})

test('should call onSubmit prop for valid form submission', () => {
    // Jest provides us spy functions that can be passed (injected) 
    // in props of a component. Later we can test whether this spy 
    // function was called how many times, called with proper 
    // arguments or when was last called.
    const onSubmitSpy = jest.fn();
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    })
    expect(wrapper.state('error')).toBe('');
    const { amount, createdAt, description, note } = expenses[0];
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        amount, createdAt, description, note
    })
})

test('should set new date on date change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    // We are calling onDateChange method of the prop of SingleDatePicker
    // with the current time.
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
})

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    // .prop() allows us access children component's props
    // In this way we can test if the children component is doing
    // things properly
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calendarFocused')).toBe(focused);
})