import { shallow } from 'enzyme';
import iconHandler from '../../src/lib/iconHandler';
import constants from '../../src/config/constants';

describe('iconHandler helper', () => {
  it('should return null if empty or no iconType is passed', () => {
    const returnedIcon = iconHandler.getIconPartial('');
    expect(returnedIcon).toBe(null);
  });
  it('should return valid icon JSX if valid iconType is passed', () => {
    const testIconType = constants.iconType.google;
    const returnedIcon = iconHandler.getIconPartial(testIconType);

    expect(returnedIcon).not.toBe(null);

    const renderedIcon = shallow(returnedIcon); // Let's try to render it
    expect(renderedIcon.prop('className').includes(testIconType)).toBe(true); // Icon type should be in element class list
    expect(renderedIcon.prop('src')).toBeTruthy();
    expect(renderedIcon.prop('alt')).toBeTruthy();
  });
});
