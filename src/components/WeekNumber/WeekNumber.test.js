import React, { Component } from 'react';
import TestUtils from 'react-dom/test-utils';
import { PureWeekNumber } from './WeekNumber';

class RenderableWeekNumber extends Component {
  render() {
    return <PureWeekNumber week={this.props.week} />;
  }
}

describe('WeekNumber component', () => {
  const widget = TestUtils.renderIntoDocument(
    <RenderableWeekNumber week={999} />,
  );
  const body = TestUtils.findRenderedDOMComponentWithClass(
    widget,
    'widget-body',
  );
  it('displays 99', () => {
    expect(body.textContent).toEqual('999');
  });
});
