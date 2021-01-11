import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from '../../components/PageNotFound';

test('should render the PageNotFound component', () => {
    const wrapper = shallow(<PageNotFound />);
    expect(wrapper).toMatchSnapshot();
})