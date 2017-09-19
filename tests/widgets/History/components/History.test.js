import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { LineChart } from 'recharts';

import ErrorHandler, { Error as ErrorComp } from '../../../../src/components/ErrorHandler/ErrorHandler';
import History from '../../../../src/widgets/History/components/History';
import BasicTable from '../../../../src/components/BasicTable/BasicTable';
import formatter from '../../../../src/lib/formatter';
import iconHandler from '../../../../src/lib/iconHandler';

describe('History component', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalHistory = History.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = el => el;
  const preview = el => el;

  let widget;
  let timeFormatterStub;
  let getIconPartialStub;
  const updatedTimestamp = new Date();
  const testTimestamp = 'some date';
  const testIcon = '<img class="logo"/>';
  const testIconType = 'someIconType';
  const testDescription = 'Explanation';
  const testHeader = 'Some number';

  const validData = {
    status: 'ok',
    error: '',
    history: [{ date: new Date(), openBugs: 1, solvedBugs: 2, newBugs: 3 }], // also test with 'error' and a value for error
    updated: updatedTimestamp,
  };

  const validLegends = [{ dataKey: 'thing', name: 'name', color: '#FFFFFF' }];

  describe('Common checks on a normal case widget', () => {
    beforeEach(() => {
      timeFormatterStub = sinon.stub(formatter, 'formatWidgetUpdatedTimestamp').returns(testTimestamp);
      getIconPartialStub = sinon.stub(iconHandler, 'getIconPartial').returns(testIcon);

      widget = shallow(
        <OriginalHistory
          connectDragSource={identity}
          connectDragPreview={preview}
          connectDropTarget={identity}
          heading={testHeader}
          description={testDescription}
          data={validData}
          iconType={testIconType}
          legends={validLegends}
          dots={false}
        />,
      );
    });

    it('contains the heading', () => {
      expect(widget.find('.panel-title-text').contains(testHeader)).toBe(true);
    });
    it('contains the explanation', () => {
      expect(widget.find('.panel-footer').contains(testDescription)).toBe(true);
    });
    it('contains the expected chart components for desktop and mobile', () => {
      expect(widget.find('.panel-body.hidden-xs').find(LineChart).length).toBe(1);
      expect(widget.find('.panel-body.hidden-xs').find(BasicTable).length).toBe(0);
      expect(widget.find('.panel-body.visible-xs-block').find(LineChart).length).toBe(0);
      expect(widget.find('.panel-body.visible-xs-block').find(BasicTable).length).toBe(1);
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

    it('displays an error text instead of charts if something is wrong', () => {
      const errorMessage = 'Something went wrong';
      const dataWithError = {
        status: 'error',
        error: errorMessage,
        message: errorMessage,
        history: [],
        updated: updatedTimestamp,
      };

      widget = mount(
        <OriginalHistory
          connectDragSource={identity}
          connectDragPreview={preview}
          connectDropTarget={identity}
          heading={testHeader}
          description={testDescription}
          data={dataWithError}
          iconType={testIconType}
          legends={validLegends}
          dots={false}
          response={dataWithError}
        />,
      );

      // Check no charts anywhere
      expect(widget.find('.panel-body.hidden-xs').find(LineChart).length).toBe(0);
      expect(widget.find('.panel-body.hidden-xs').find(BasicTable).length).toBe(0);
      expect(widget.find('.panel-body.visible-xs-block').find(LineChart).length).toBe(0);
      expect(widget.find('.panel-body.visible-xs-block').find(BasicTable).length).toBe(0);

      // Check error message is displayed instead
      expect(widget.find('.panel-body.hidden-xs').containsMatchingElement(<div>{errorMessage}</div>)).toBe(true);
      expect(widget.find('.panel-body.visible-xs-block').containsMatchingElement(<div>{errorMessage}</div>)).toBe(true);
    });

    afterEach(() => {
      timeFormatterStub.restore();
      getIconPartialStub.restore();
    });
  });
});
