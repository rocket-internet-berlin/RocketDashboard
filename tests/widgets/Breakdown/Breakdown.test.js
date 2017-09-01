import React from 'react';
import { shallow } from 'enzyme';
import Breakdown from '../../../src/widgets/Breakdown/components/Breakdown';

describe('Breakdown component', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalBreakdown = Breakdown.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = el => el;
  const preview = el => el;

  const dataValid = {
    results: [{ name: 'name 1', count: 1 }, { name: 'name 2', count: 2 }],
  };
  const heading = 'Some Heading';
  const description = 'Some Explanation';
  const widget = shallow(
    <OriginalBreakdown
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

  it('does not contain the description', () => {
    const widgetNoDescription = shallow(
      <OriginalBreakdown
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
