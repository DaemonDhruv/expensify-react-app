import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render expense Item', () => {
    const wrapper = shallow(<ExpenseListItem count={1} {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
})