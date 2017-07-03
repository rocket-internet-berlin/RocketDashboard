import React, { Component } from 'react';
import TestUtils from 'react-dom/test-utils';
import { PureNewRelicLoadTime } from './NewRelicLoadTime';

class RenderableNewRelicLoadTime extends Component {
  render() {
    return <PureNewRelicLoadTime previous={this.props.previous} current={this.props.current} />;
  }
}

describe('NewRelicLoadTime component', () => {
  const widget = TestUtils.renderIntoDocument(<RenderableNewRelicLoadTime previous={9} current={99} />);
  const body = TestUtils.findRenderedDOMComponentWithClass(widget, 'panel-body');
  it('displays 99 / 9', () => {
    expect(body.textContent).toEqual('99 / 9');
  });
});
