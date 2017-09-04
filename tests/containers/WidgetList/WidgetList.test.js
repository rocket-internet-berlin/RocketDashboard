import React from 'react';
import { shallow } from 'enzyme';
import Slider from 'react-slick';
import uuidv4 from 'uuid/v4';

import { WidgetList } from '../../../src/containers/WidgetList/WidgetList';
import constants from '../../../src/config/constants';
import Number from '../../../src/widgets/Number/components/Number';
import History from '../../../src/widgets/History/components/History';
import Breakdown from '../../../src/widgets/Breakdown/components/Breakdown';
import Funnel from '../../../src/widgets/Funnel/components/Funnel';
import Text from '../../../src/widgets/Text/components/Text';
import Weather from '../../../src/widgets/Weather/components/Weather';

const widgetType = constants.widgetType;

describe('WidgetList', () => {
  it('contains a wrapper .WidgetList', () => {
    const component = shallow(<WidgetList />);

    expect(component.find('.WidgetList').length).toEqual(1);
  });

  it('contains Slider component', () => {
    const component = shallow(<WidgetList fullScreenMode />);

    expect(component.find('.WidgetList').length).toEqual(1);
    expect(component.find('.WidgetList').containsAllMatchingElements([<Slider />])).toBe(true);
  });

  it('contains all component', () => {
    const widgetList = [
      {
        id: uuidv4(),
        key: 'finance',
        display: true,
        iconType: 'test',
        type: widgetType.number,
        heading: 'Stock Widget',
      },
      {
        id: uuidv4(),
        key: 'weather',
        display: true,
        iconType: 'test',
        type: widgetType.weather,
        heading: 'Weather Widget',
      },
      {
        id: uuidv4(),
        key: 'newRelicErrorBreakdown',
        display: true,
        heading: 'Error Breakdown',
        iconType: 'test',
        type: widgetType.breakdown,
      },
      {
        id: uuidv4(),
        key: 'newRelicWebsiteFunnel',
        display: true,
        heading: 'Website Funnel',
        iconType: 'test',
        type: widgetType.funnel,
      },
      {
        id: uuidv4(),
        key: 'trivia',
        display: true,
        iconType: 'test',
        heading: "Today's trivia",
        type: widgetType.text,
      },
      {
        id: uuidv4(),
        key: 'history',
        display: true,
        iconType: 'test',
        type: widgetType.history,
        heading: 'Bugs History',
      },
    ];

    const component = shallow(<WidgetList widgetList={widgetList} />);
    expect(component.find('.row').children()).toHaveLength(6);

    /**
     * For some reason test below fails.
     * However individual test passes for each component as expected
     */
    // expect(component.containsAllMatchingElements([
    //   <Number />,
    //   <Weather />,
    //   <Breakdown />,
    //   <Funnel />,
    //   <Text />,
    //   <History />,
    // ])).toBe(true);

    expect(component.containsAllMatchingElements([<Number />])).toBe(true);
    expect(component.containsAllMatchingElements([<Weather />])).toBe(true);
    expect(component.containsAllMatchingElements([<Breakdown />])).toBe(true);
    expect(component.containsAllMatchingElements([<Funnel />])).toBe(true);
    expect(component.containsAllMatchingElements([<Text />])).toBe(true);
    expect(component.containsAllMatchingElements([<History />])).toBe(true);
  });
});
