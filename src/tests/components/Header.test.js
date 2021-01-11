// We have shallow rendering when we are just concerned about what getting rendered
// We have full DOM rendering testing when we are concerned about lifecycle methods, user interaction etc.

import React from 'react';
import { shallow } from 'enzyme';
// We are using enzyme instead becasue it is more feature-rich
// import ReactShallowRenderer from 'react-test-renderer/shallow';
// import toJSON from 'enzyme-to-json';
import Header from '../../components/Header';

test('should render the Header component', () => {
    const wrapper = shallow(<Header />);
    // This wrapper snapshot will create a lot of bullshit internal state alongside
    // the representational HTML
    // to avoide it we are going to use enzyme-to-json
    expect(wrapper).toMatchSnapshot();
    // expect(toJSON(wrapper)).toMatchSnapshot();
    // Rather than converting enzyme to json from this test file and importing it
    // We will configure the jest config to serial enzyme output to JSON. ;p

    // .find() works like a document query selector
    // .text() will extract the text of the selected element
    //expect(wrapper.find('h1').text()).toBe('Expensify');
    
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // // getRenderOutput() gives the output of the renderer.render() method
    // // toMatchSnapshot() with not arguments, when run for the first time will create a snapshot
    // // and it will match expect() to the snapshot that was created earlier.
    // expect(renderer.getRenderOutput()).toMatchSnapshot();
    // // Testing with snapshot, we are looking for changes, where this change we made is acceptable or not.
    // // If we don't accept the change, then we must go into the code and fix the bug.
    // // Else press 'u' to update the snapshot.
})
