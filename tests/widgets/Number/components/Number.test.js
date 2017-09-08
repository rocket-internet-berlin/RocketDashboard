import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Number from '../../../../src/widgets/Number/components/Number';
import constants from '../../../../src/config/constants';
import formatter from '../../../../src/lib/formatter';
import iconHandler from '../../../../src/lib/iconHandler';

describe('Number component', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalNumber = Number.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = el => el;

  let widget;
  let timeFormatterStub;
  let getIconPartialStub;
  const updatedTimestamp = new Date();
  const testTimestamp = 'some date';
  const testIcon = '<img class="logo"/>';
  const testIconType = 'someIconType';
  const testDescription = 'Explanation';
  const testHeader = 'Some number';

  describe('Common checks on a normal case widget', () => {

    beforeEach(() => {
      timeFormatterStub = sinon.stub(formatter, 'formatWidgetUpdatedTimestamp').returns(testTimestamp);
      getIconPartialStub = sinon.stub(iconHandler, 'getIconPartial').returns(testIcon);

      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          description={testDescription}
          data={{ current: 99, previous: 9, updated: updatedTimestamp }}
          iconType={testIconType}
        />,
      );
    });

    it('contains the heading', () => {
      expect(widget.contains(testHeader)).toBe(true);
    });
    it('contains the explanation', () => {
      expect(widget.contains(testDescription)).toBe(true);
    });
    it('contains a current value', () => {
      expect(widget.find('.current').length).toBe(1);
      expect(widget.find('.current').contains(99)).toBe(true);
      expect(widget.find('.loading').length).toBe(0); // No loading indicator since we actually have a value
    });
    it('contains percentage', () => {
      expect(widget.find('.change').contains('1000%')).toBe(true);
    });
    it('contains the supplied timestamp', () => {
      expect(timeFormatterStub.callCount).toBe(1);
      expect(timeFormatterStub.calledWith(updatedTimestamp)).toBe(true);
      expect(widget.find('.panel-footer').contains(testTimestamp)).toBe(true);
    });
    it('contains the supplied icon', () => {
      expect(getIconPartialStub.callCount).toBe(1);
      expect(getIconPartialStub.calledWith(testIconType)).toBe(true);
      expect(widget.find('.panel-heading').contains(testIcon)).toBe(true);
    });
    it('highlights increase as `good` when `riseIsBad` is not set', () => {
      expect(widget.find('.change.increase.good').length).toBe(1);
    });

    afterEach(() => {
      timeFormatterStub.restore();
      getIconPartialStub.restore();
    });
  });

  describe('Edge cases for data visualization', () => {

    beforeEach(() => {
      timeFormatterStub = sinon.stub(formatter, 'formatWidgetUpdatedTimestamp').returns(testTimestamp);
      getIconPartialStub = sinon.stub(iconHandler, 'getIconPartial').returns(testIcon);
    });

    it('contains change Infinity when comparing to zero', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: 99, previous: 0 }}
        />,
      );

      expect(widget.find('.change').contains('Infinity')).toBe(true);
    });
    it('contains change 0 when current is zero and comparing to zero', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: 0, previous: 0 }}
        />,
      );

      expect(widget.find('.change').contains('0%')).toBe(true);
    });

    it('highlights increase as `bad` when `riseIsBad` is set', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: 5, previous: 1 }}
          riseIsBad
        />,
      );

      expect(widget.find('.change.increase.bad').length).toBe(1);
    });

    it('highlights decrease as `good` when `riseIsBad` is set', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: 1, previous: 5 }}
          riseIsBad
        />,
      );

      expect(widget.find('.change.decrease.good').length).toBe(1);
    });

    it('highlights decrease as `good` when `riseIsBad` is not set', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: 1, previous: 5 }}
          riseIsBad={false}
        />,
      );

      expect(widget.find('.change.decrease.bad').length).toBe(1);
    });

    it('highlights `current` when over `threshold`', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: 5, previous: 0 }}
          riseIsBad
          threshold={3}
        />,
      );

      expect(widget.find('.current.threshold-overcome').length).toBe(1);
    });

    it('does not highlight `current` when under `threshold`', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: 5, previous: 0 }}
          riseIsBad
          threshold={10}
        />,
      );

      expect(widget.find('.current.threshold-overcome').length).toBe(0);
    });

    it('displays a loading placeholder if the current data is not set', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: null }}
        />,
      );

      expect(widget.find('.current').length).toBe(0);
      expect(widget.find('.loading').length).toBe(1);
      expect(widget.find('.loading').contains(constants.loadingData)).toBe(true);
    });

    it('displays an unknown placeholder if the current data is unknown', () => {
      widget = shallow(
        <OriginalNumber
          connectDragSource={identity}
          connectDropTarget={identity}
          heading="Some number"
          data={{ current: constants.unknown }}
        />,
      );

      expect(widget.find('.current').length).toBe(0);
      expect(widget.find('.loading').length).toBe(1);
      expect(widget.find('.loading').contains(constants.unknown)).toBe(true);
    });

    afterEach(() => {
      timeFormatterStub.restore();
      getIconPartialStub.restore();
    });
  });
});
