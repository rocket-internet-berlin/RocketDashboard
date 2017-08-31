import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';

import constants from '../config/constants';
import WidgetComponentFactory from './WidgetComponentFactory';
import Number from '../widgets/Number/components/Number';
import BugsHistory from '../widgets/BugsHistory/components/BugsHistory';
import Breakdown from '../widgets/Breakdown/components/Breakdown';
import Funnel from '../widgets/Funnel/components/Funnel';
import Text from '../widgets/Text/components/Text';
import Weather from '../widgets/Weather/components/Weather';

const widgetType = constants.widgetType;

describe('WidgetComponentFactory', () => {
  const genericProps = {
    onMove: sinon.spy(),
    onHover: sinon.spy(),
  };

  it('creates `Number` component', () => {
    const nFormatter = sinon.spy();
    const widgetConfig = {
      id: 'id',
      key: 'number',
      iconType: 'icon',
      type: widgetType.number,
      heading: 'Number Widget',
      threshold: 1,
      riseIsBad: true,
      formatter: nFormatter,
    };

    const expectedNumber = (
      <Number
        id="id"
        heading="Number Widget"
        iconType="icon"
        threshold={1}
        riseIsBad
        formatter={nFormatter}
        onMove={genericProps.onMove}
        onHover={genericProps.onHover}
      />
    );

    const widget = WidgetComponentFactory.create(widgetConfig, genericProps);
    const widgetComp = shallow(widget);

    expect(widgetComp.containsAllMatchingElements([<Number />])).toBe(true);
    expect(
      widgetComp.containsAllMatchingElements([
        <Number id="id" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(true);
    expect(widgetComp.containsAllMatchingElements([expectedNumber])).toBe(true);

    // Negative test
    expect(
      widgetComp.containsAllMatchingElements([
        <Number random="test" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(false);
  });

  it('creates `BugsHistory` component', () => {
    const widgetConfig = {
      id: 'id',
      key: 'number',
      iconType: 'icon',
      type: widgetType.bugsHistory,
      heading: 'Bugs history',
    };

    const expectedBugsHistory = (
      <BugsHistory
        id="id"
        heading="Bugs history"
        iconType="icon"
        onMove={genericProps.onMove}
        onHover={genericProps.onHover}
      />
    );

    const widget = WidgetComponentFactory.create(widgetConfig, genericProps);
    const widgetComp = shallow(widget);

    expect(widgetComp.containsAllMatchingElements([<BugsHistory />])).toBe(true);
    expect(
      widgetComp.containsAllMatchingElements([
        <BugsHistory id="id" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(true);
    expect(widgetComp.containsAllMatchingElements([expectedBugsHistory])).toBe(true);

    // Negative test
    expect(
      widgetComp.containsAllMatchingElements([
        <BugsHistory random="test" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(false);
  });

  it('creates `Breakdown` component', () => {
    const widgetConfig = {
      id: 'id',
      key: 'number',
      iconType: 'icon',
      type: widgetType.breakdown,
      heading: 'Bugs history',
    };

    const expectedBreakdown = (
      <Breakdown
        id="id"
        heading="Bugs history"
        iconType="icon"
        onMove={genericProps.onMove}
        onHover={genericProps.onHover}
      />
    );

    const widget = WidgetComponentFactory.create(widgetConfig, genericProps);
    const widgetComp = shallow(widget);

    expect(widgetComp.containsAllMatchingElements([<Breakdown />])).toBe(true);
    expect(
      widgetComp.containsAllMatchingElements([
        <Breakdown id="id" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(true);
    expect(widgetComp.containsAllMatchingElements([expectedBreakdown])).toBe(true);

    // Negative test
    expect(
      widgetComp.containsAllMatchingElements([
        <Breakdown random="test" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(false);
  });

  it('creates `Funnel` component', () => {
    const widgetConfig = {
      id: 'id',
      key: 'number',
      iconType: 'icon',
      type: widgetType.funnel,
      heading: 'Bugs history',
    };

    const expectedFunnel = (
      <Funnel
        id="id"
        heading="Bugs history"
        iconType="icon"
        onMove={genericProps.onMove}
        onHover={genericProps.onHover}
      />
    );

    const widget = WidgetComponentFactory.create(widgetConfig, genericProps);
    const widgetComp = shallow(widget);

    expect(widgetComp.containsAllMatchingElements([<Funnel />])).toBe(true);
    expect(
      widgetComp.containsAllMatchingElements([
        <Funnel id="id" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(true);
    expect(widgetComp.containsAllMatchingElements([expectedFunnel])).toBe(true);

    // Negative test
    expect(
      widgetComp.containsAllMatchingElements([
        <Funnel random="test" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(false);
  });

  it('creates `Text` component', () => {
    const widgetConfig = {
      id: 'id',
      key: 'number',
      iconType: 'icon',
      type: widgetType.text,
      heading: 'Bugs history',
    };

    const expectedText = (
      <Text
        id="id"
        heading="Bugs history"
        iconType="icon"
        onMove={genericProps.onMove}
        onHover={genericProps.onHover}
      />
    );

    const widget = WidgetComponentFactory.create(widgetConfig, genericProps);
    const widgetComp = shallow(widget);

    expect(widgetComp.containsAllMatchingElements([<Text />])).toBe(true);
    expect(
      widgetComp.containsAllMatchingElements([
        <Text id="id" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(true);
    expect(widgetComp.containsAllMatchingElements([expectedText])).toBe(true);

    // Negative test
    expect(
      widgetComp.containsAllMatchingElements([
        <Text random="test" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(false);
  });

  it('creates `Weather` component', () => {
    const widgetConfig = {
      id: 'id',
      key: 'number',
      iconType: 'icon',
      type: widgetType.weather,
      heading: 'Bugs history',
    };

    const expectedWeather = (
      <Weather
        id="id"
        heading="Bugs history"
        iconType="icon"
        onMove={genericProps.onMove}
        onHover={genericProps.onHover}
      />
    );

    const widget = WidgetComponentFactory.create(widgetConfig, genericProps);
    const widgetComp = shallow(widget);

    expect(widgetComp.containsAllMatchingElements([<Weather />])).toBe(true);
    expect(
      widgetComp.containsAllMatchingElements([
        <Weather id="id" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(true);
    expect(widgetComp.containsAllMatchingElements([expectedWeather])).toBe(true);

    // Negative test
    expect(
      widgetComp.containsAllMatchingElements([
        <Weather random="test" onMove={genericProps.onMove} onHover={genericProps.onHover} />,
      ]),
    ).toBe(false);
  });
});
