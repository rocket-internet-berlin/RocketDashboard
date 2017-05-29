import React, { Component } from 'react';
import TestUtils from 'react-dom/test-utils';
import { PureBugsDiff } from './BugsDiff';

class RenderableBugsDiff extends Component {
  render() {
    return (
      <PureBugsDiff
        lastWeek={this.props.lastWeek}
        thisWeek={this.props.thisWeek}
      />
    );
  }
}

describe('BugsDiff component', () => {
  const widget = TestUtils.renderIntoDocument(
    <RenderableBugsDiff lastWeek={9} thisWeek={99} />,
  );
  const body = TestUtils.findRenderedDOMComponentWithClass(
    widget,
    'widget-body',
  );
  it('displays 99 / 9', () => {
    expect(body.textContent).toEqual('99 / 9');
  });
});
