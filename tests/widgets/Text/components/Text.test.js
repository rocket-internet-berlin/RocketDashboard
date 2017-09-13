import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Text from '../../../../src/widgets/Text/components/Text';
import formatter from '../../../../src/lib/formatter';
import iconHandler from '../../../../src/lib/iconHandler';

describe('Text component', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalWidget = Text.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = el => el;

  const updatedTimestamp = new Date();
  const testTimestamp = 'some date';
  const testText = 'something something Chuck Norris';
  const testHeading = 'Yep, this is a heading';
  const testIcon = '<img class="logo"/>';
  const testIconType = 'someIconType';
  let timeFormatterStub;
  let getIconPartialStub;
  let widget;

  beforeEach(() => {
    timeFormatterStub = sinon.stub(formatter, 'formatWidgetUpdatedTimestamp').returns(testTimestamp);
    getIconPartialStub = sinon.stub(iconHandler, 'getIconPartial').returns(testIcon);
    widget = shallow(
      <OriginalWidget
        connectDragSource={identity}
        connectDropTarget={identity}
        data={{ body: testText, updated: updatedTimestamp }}
        heading={testHeading}
        iconType={testIconType}
      />,
    );
  });

  it('contains the heading', () => { // This case currently fails since the heading is not fully configurable
    expect(widget.find('.panel-title-text').contains(testHeading)).toBe(true);
  });
  it('contains the supplied text body', () => {
    // Can't use .contains on the React element because of dangerouslySetInnerHTML; have to render the HTML
    // and do a string includes on it instead
    expect(widget.find('.panel-body').html().includes(testText)).toBe(true);
  });
  it('contains the supplied timestamp', () => {
    expect(widget.find('.panel-footer').contains(testTimestamp)).toBe(true);
    expect(timeFormatterStub.callCount).toBe(1);
    expect(timeFormatterStub.calledWith(updatedTimestamp)).toBe(true);
  });
  it('contains the supplied icon', () => {
    expect(widget.find('.panel-heading').contains(testIcon)).toBe(true);
    expect(getIconPartialStub.callCount).toBe(1);
    expect(getIconPartialStub.calledWith(testIconType)).toBe(true);
  });

  afterEach(() => {
    timeFormatterStub.restore();
    getIconPartialStub.restore();
  });
});
