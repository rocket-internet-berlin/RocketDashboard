import React, { Component } from 'react';
import TestUtils from 'react-dom/test-utils';
import { PureNewRelicErrors } from './NewRelicErrors';

class RenderableNewRelicErrors extends Component {
  render() {
    return (
      <PureNewRelicErrors
        previous={this.props.previous}
        current={this.props.current}
      />
    );
  }
}

describe('NewRelicErrors component', () => {
  const widget = TestUtils.renderIntoDocument(
    <RenderableNewRelicErrors previous={9} current={99} />,
  );
  const body = TestUtils.findRenderedDOMComponentWithClass(
    widget,
    'panel-body',
  );
  it('displays 99 / 9', () => {
    expect(body.textContent).toEqual('99 / 9');
  });
});
