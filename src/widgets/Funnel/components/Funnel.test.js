import React from 'react';
import { shallow } from 'enzyme';
import Funnel, { getTableData, fixSilhouette } from './Funnel';
import BasicTable from '../../../components/BasicTable/BasicTable';

describe('Funnel component', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalFunnel = Funnel.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = el => el;
  const preview = el => el;

  const dataValid = {
    results: [{ name: 'name 1', count: 1 }, { name: 'name 2', count: 2 }],
  };
  const heading = 'Some Heading';
  const description = 'Some Explanation';
  const widget = shallow(
    <OriginalFunnel
      connectDragSource={identity}
      connectDragPreview={preview}
      connectDropTarget={identity}
      heading={heading}
      description={description}
      data={dataValid}
    />,
  );

  it('contains the heading', () => {
    expect(widget.contains(heading)).toEqual(true);
  });

  it('contains the description', () => {
    expect(widget.contains(description)).toEqual(true);
  });

  it('contains BasicTable', () => {
    expect(widget.find(BasicTable).length).toBe(1);
  });

  it('does not contain BasicTable is no data.results are passed', () => {
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
});

describe('getTableData function', () => {
  const dataInput = [{ name: 'name 1', count: 1 }, { name: 'name 2', count: 2 }];
  const expected = [['name 1', 1], ['name 2', 2]];

  it('should transform given array of objects to array of arrays', () => {
    expect(getTableData(dataInput)).toEqual(expected);
  });
});

describe('fixSilhouette function', () => {
  it('should return a calculated value', () => {
    const expected = value => Math.abs(value * 2);
    expect(fixSilhouette(2)).toEqual(expected(2));
    expect(fixSilhouette(-2)).toEqual(expected(-2));
  });
});
