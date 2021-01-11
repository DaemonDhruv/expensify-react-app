import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter()
})

// goto https://aribnb.io/enzyme

/* In the jest.config.json file we are telling jest to run config file for enzyme and some polyfill feature provided by the browsers */