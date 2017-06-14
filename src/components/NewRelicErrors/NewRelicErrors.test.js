import React, { Component } from 'react';
import TestUtils from 'react-dom/test-utils';
import { PureNewRelicErrors } from './NewRelicErrors';

class RenderableNewRelicErrors extends Component {
  render() {
    return (
      <PureNewRelicErrors
        lastWeek={this.props.lastWeek}
        thisWeek={this.props.thisWeek}
      />
    );
  }
}

describe('NewRelicErrors component', () => {
  const widget = TestUtils.renderIntoDocument(
    <RenderableNewRelicErrors lastWeek={9} thisWeek={99} />,
  );
  const body = TestUtils.findRenderedDOMComponentWithClass(
    widget,
    'panel-body',
  );
  it('displays 99 / 9', () => {
    expect(body.textContent).toEqual('99 / 9');
  });
});
