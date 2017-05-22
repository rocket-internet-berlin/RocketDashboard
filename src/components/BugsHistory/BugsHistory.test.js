import React, { Component } from 'react';
import TestUtils from 'react-dom/test-utils';
import { PureBugsHistory } from './BugsHistory';

class RenderableBugsHistory extends Component {
  render() {
    return <PureBugsHistory history={[]} period={this.props.period} />;
  }
}

describe('BugsHistory component', () => {
  const widget = TestUtils.renderIntoDocument(
    <RenderableBugsHistory period="Last 0 Days" />,
  );
  const header = TestUtils.findRenderedDOMComponentWithClass(
    widget,
    'panel-heading',
  );
  it('displys "Last 0 Days" in the header', () => {
    expect(header.textContent).toEqual('Bugs History (Last 0 Days)');
  });
});
