import React from 'react';
import { shallow, mount } from 'enzyme';
import BasicTable from './BasicTable';

const headings = ['Heading 1', 'Heading 2', 'Heading 3', 'Heading 4'];
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

  it('contains has rendered the provided headings', () => {
    const component = shallow(<BasicTable data={dataValid} headings={headings} />);
    const thead = component.find('thead');

    expect(thead.contains(<td>Heading 1</td>)).toEqual(true);
    expect(thead.contains(<td>Heading 2</td>)).toEqual(true);
    expect(thead.contains(<td>Heading 3</td>)).toEqual(true);
    expect(thead.contains(<td>Heading 4</td>)).toEqual(true);
  });

  it('throws exception when invalid data', () => {
    const dataInvalid = [['Row 1', Object(), 12, 13]];
    expect(() => mount(<BasicTable data={dataInvalid} />)).toThrow(Error);
  });
});
