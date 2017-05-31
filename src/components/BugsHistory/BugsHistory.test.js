import React, { Component } from 'react';
import TestUtils from 'react-dom/test-utils';
import { PureBugsHistory } from './BugsHistory';

class RenderableBugsHistory extends Component {
  render() {
    return <PureBugsHistory history={[]} period={this.props.period} />;
  }
}

describe('BugsHistory component', () => {
  console.warn = jest.genMockFunction();

  const widget = TestUtils.renderIntoDocument(
    <RenderableBugsHistory period="Last 0 Days" />,
  );
  const header = TestUtils.findRenderedDOMComponentWithClass(
    widget,
    'panel-heading',
  );
  it('displays "Last 0 Days" in the header', () => {
    expect(header.textContent).toEqual('Bugs History (Last 0 Days)');
  });

  // We expect a warning from "node_modules/recharts/lib/util/LogUtils.js:22"
  const expectedWarning =
    'The width(0) and height(0) of chart should be greater than 0,\n       please check the style of container, or the props width(100%) and height(100%),\n       or add a minWidth(undefined) or minHeight(undefined) or use aspect(undefined) to control the\n       height and width.';
  expect(console.warn.mock.calls[0][0]).toEqual(expectedWarning);
});
