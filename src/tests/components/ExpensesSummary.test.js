import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { shallow } from 'enzyme';

test('should address as singular for single expense', () => {
    const wrapper = shallow(<ExpensesSummary count={1} total={94} />);
    expect(wrapper).toMatchSnapshot();
})

test('should address as plural for mulitple expenses', () => {
    const wrapper = shallow(<ExpensesSummary count={2} total={94} />);
    expect(wrapper).toMatchSnapshot();
})