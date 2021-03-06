import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { BarChart } from 'recharts';
import VerticalBarChart from '../../../src/components/VerticalBarChart/VerticalBarChart';

const dataValid = [{ key: 1, value: 'value 1' }, { key: 2, value: 'value 2' }];
const dataInvalid = [{ key: 1 }];

// Since react will console.error propType warnings, that which we'd rather have
// as errors, we use sinon.js to stub it into throwing these warning as errors
// instead.
beforeAll(() => {
  sinon.stub(console, 'error').callsFake(warning => {
    throw new Error(warning);
  });
});
// While not forgetting to restore it afterwards
afterAll(() => {
  console.error.restore();
});

describe('<VerticalBarChart />', () => {
  it('contains BarChart with the provided data', () => {
    const component = shallow(<VerticalBarChart data={dataValid} />);

    expect(component.find(BarChart).length).toBe(1);
    expect(component.find(BarChart).props().data).toEqual(dataValid);
  });

  it('throws exception when invalid data', () => {
    expect(() => mount(<VerticalBarChart data={dataInvalid} />)).toThrow(Error);
  });
});
