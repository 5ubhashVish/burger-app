import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem';
import NavItem from './NavItem/NavItem'

configure({ adapter: new Adapter() });

describe('<NavigationItem/>', () => {
    it('should render two <NavItem/> elements', () => {
        const wrapper = shallow(<NavigationItem />)
        expect(wrapper.find(NavItem)).toHaveLength(2);
    });

});