import React from 'react';
import { shallow } from 'enzyme';
import Number from './Number';

describe('Number component', () => {
  // Obtain the reference to the component before React DnD wrapping
  const OriginalNumber = Number.DecoratedComponent;

  // Stub the React DnD connector functions with an identity function
  const identity = el => el;

  const widget = shallow(
    <OriginalNumber
      connectDragSource={identity}
      connectDropTarget={identity}
      heading="Some number"
      description="Explanation"
      data={{ current: 99, previous: 9 }}
    />,
  );

  it('contains the heading', () => {
    expect(widget.contains('Some number')).toEqual(true);
  });
  it('contains the explanation', () => {
    expect(widget.contains('Explanation')).toEqual(true);
  });
  it('contains a current value', () => {
    expect(widget.find('.current').contains(99)).toEqual(true);
  });

  it('contains percentage', () => {
    expect(widget.find('.change').contains('1000%')).toEqual(true);
  });

  it('contains change Infinity when comparing to zero', () => {
    const anotherWidget = shallow(
      <OriginalNumber
        connectDragSource={identity}
        connectDropTarget={identity}
        heading="Some number"
        data={{ current: 99, previous: 0 }}
      />,
    );

    expect(anotherWidget.find('.change').contains('Infinity')).toEqual(true);
  });
  it('contains change 0 when current is zero and comparing to zero', () => {
    const anotherWidget = shallow(
      <OriginalNumber
        connectDragSource={identity}
        connectDropTarget={identity}
        heading="Some number"
        data={{ current: 0, previous: 0 }}
      />,
    );

    expect(anotherWidget.find('.change').contains('0%')).toEqual(true);
  });

  it('highlights increase as `bad` when `riseIsBad` is set', () => {
    const anotherWidget = shallow(
      <OriginalNumber
        connectDragSource={identity}
        connectDropTarget={identity}
        heading="Some number"
        data={{ current: 5, previous: 1 }}
        riseIsBad
      />,
    );

    expect(anotherWidget.find('.change.increase.bad').length).toEqual(1);
  });

  it('highlights decrease as `good` when `riseIsBad` is set', () => {
    const anotherWidget = shallow(
      <OriginalNumber
        connectDragSource={identity}
        connectDropTarget={identity}
        heading="Some number"
        data={{ current: 1, previous: 5 }}
        riseIsBad
      />,
    );

    expect(anotherWidget.find('.change.decrease.good').length).toEqual(1);
  });

  it('highlights decrease as `good` when `riseIsBad` is set', () => {
    const anotherWidget = shallow(
      <OriginalNumber
        connectDragSource={identity}
        connectDropTarget={identity}
        heading="Some number"
        data={{ current: 1, previous: 5 }}
        riseIsBad={false}
      />,
    );

    expect(anotherWidget.find('.change.decrease.bad').length).toEqual(1);
  });

  it('highlights `current` when over `threshold`', () => {
    const anotherWidget = shallow(
      <OriginalNumber
        connectDragSource={identity}
        connectDropTarget={identity}
        heading="Some number"
        data={{ current: 5, previous: 0 }}
        riseIsBad
        threshold={3}
      />,
    );

    expect(anotherWidget.find('.current.threshold-overcome').length).toEqual(1);
  });

  it('does not highlight `current` when under `threshold`', () => {
    const anotherWidget = shallow(
      <OriginalNumber
        connectDragSource={identity}
        connectDropTarget={identity}
        heading="Some number"
        data={{ current: 5, previous: 0 }}
        riseIsBad
        threshold={10}
      />,
    );

    expect(anotherWidget.find('.current.threshold-overcome').length).toEqual(0);
  });
});
