import React from 'react';
import { shallow, mount } from 'enzyme';
import { WidgetList } from './WidgetList';

describe('WidgetList', () => {
  it('contains a wrapper .WidgetList', () => {
    const component = shallow(<WidgetList />);

    expect(component.find('.WidgetList').length).toEqual(1);
  });
});
