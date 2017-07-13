import React from 'react';
import { shallow, mount } from 'enzyme';
import BasicTable from './BasicTable';

const dataValid = [['Row 1', 11, 12, 13], ['Row 2', 21, 22, 23]];

describe('BasicTable component', () => {
  it('contains a table with the provided data', () => {
    const component = shallow(<BasicTable data={dataValid} />);

    expect(component.contains(<td>Row 1</td>)).toEqual(true);
    expect(
      component.contains(
        <td>
          {11}
        </td>,
      ),
    ).toEqual(true);
    expect(
      component.contains(
        <td>
          {12}
        </td>,
      ),
    ).toEqual(true);
    expect(
      component.contains(
        <td>
          {13}
        </td>,
      ),
    ).toEqual(true);
    expect(component.contains(<td>Row 2</td>)).toEqual(true);
    expect(
      component.contains(
        <td>
          {21}
        </td>,
      ),
    ).toEqual(true);
    expect(
      component.contains(
        <td>
          {22}
        </td>,
      ),
    ).toEqual(true);
    expect(
      component.contains(
        <td>
          {23}
        </td>,
      ),
    ).toEqual(true);
  });

  it('throws exceotion when invalid data', () => {
    const dataInvalid = [['Row 1', Object(), 12, 13]];
    expect(() => mount(<BasicTable data={dataInvalid} />)).toThrow(Error);
  });
});
