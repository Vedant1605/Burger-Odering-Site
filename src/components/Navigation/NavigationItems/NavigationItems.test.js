import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import React from 'react';
import NavigationItem from './Navigationitem/NavigationItem';

configure({adapter:new Adapter()})

describe('</NavigationItems>', () => {
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems/>)
    })
    it('shloud render two elements if not Authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('shloud render 3 elements if Authenticated',()=>{
        wrapper.setProps({isAuth:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
})
