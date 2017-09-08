import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Funnel, { getTableData, fixSilhouette } from '../../../../src/widgets/Funnel/components/Funnel';
import BasicTable from '../../../../src/components/BasicTable/BasicTable';
import formatter from '../../../../src/lib/formatter';
import iconHandler from '../../../../src/lib/iconHandler';

describe('Funnel component', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalFunnel = Funnel.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = el => el;
  const preview = el => el;
  const updatedTimestamp = new Date();
  const heading = 'Some Heading';
  const description = 'Some Explanation';
  const testTimestamp = 'some date';
  const testIcon = '<img class="logo"/>';
  const testIconType = 'someIconType';

  const dataValid = {
    results: [{ name: 'name 1', count: 1 }, { name: 'name 2', count: 2 }],
    updated: updatedTimestamp,
  };

  let widget;
  let timeFormatterStub;
  let getIconPartialStub;

  describe('Common checks on a normal case widget', () => {
    beforeEach(() => {
      timeFormatterStub = sinon.stub(formatter, 'formatWidgetUpdatedTimestamp').returns(testTimestamp);
      getIconPartialStub = sinon.stub(iconHandler, 'getIconPartial').returns(testIcon);

      widget = shallow(
        <OriginalFunnel
          connectDragSource={identity}
          connectDragPreview={preview}
          connectDropTarget={identity}
          heading={heading}
          description={description}
          data={dataValid}
          iconType={testIconType}
        />,
      );
    });

    it('contains the heading', () => {
      expect(widget.contains(heading)).toEqual(true);
    });

    it('contains the description', () => {
      expect(widget.contains(description)).toEqual(true);
    });
    it('contains BasicTable', () => {
      expect(widget.find(BasicTable).length).toBe(1);
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

  describe('Edge case checks requiring their own widget', () => {
    beforeEach(() => {
      timeFormatterStub = sinon.stub(formatter, 'formatWidgetUpdatedTimestamp').returns(testTimestamp);
      getIconPartialStub = sinon.stub(iconHandler, 'getIconPartial').returns(testIcon);
    });

    it('does not contain BasicTable if no data.results are passed', () => {
      const dataNoResults = Object.assign({}, dataValid);
      delete dataNoResults.results;
      const widgetNoDescription = shallow(
        <OriginalFunnel
          connectDragSource={identity}
          connectDragPreview={preview}
          connectDropTarget={identity}
          heading={heading}
          data={dataNoResults}
        />,
      );
      expect(widgetNoDescription.find(BasicTable).length).toBe(0);
    });

    it('does not contain the description', () => {
      const widgetNoDescription = shallow(
        <OriginalFunnel
          connectDragSource={identity}
          connectDragPreview={preview}
          connectDropTarget={identity}
          heading={heading}
          data={dataValid}
        />,
      );
      expect(widgetNoDescription.contains(description)).toEqual(false);
    });

    afterEach(() => {
      timeFormatterStub.restore();
      getIconPartialStub.restore();
    });
  });

  describe('#getTableData', () => {
    const dataInput = [{ name: 'name 1', count: 1 }, { name: 'name 2', count: 2 }];
    const expected = [['name 1', 1], ['name 2', 2]];

    it('should transform given array of objects to array of arrays', () => {
      expect(getTableData(dataInput)).toEqual(expected);
    });
  });

  describe('#fixSilhouette', () => {
    it('should return the expected value', () => {
      expect(fixSilhouette(2)).toEqual(4);
      expect(fixSilhouette(-2)).toEqual(4);
    });
  });
});

