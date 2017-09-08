import { shallow } from 'enzyme';
import formatter from '../../src/lib/formatter';

describe('formatter helper', () => {
  describe('#formatStockPrice', () => {
    it('should return a rounded stock price as a string', () => {
      const testValue = 1.123;
      const result = formatter.formatStockPrice(testValue);
      expect(result).toBe('1.12');
    });
    it('should return the value untouched if not a valid number', () => {
      const testValue = 'not a number';
      const result = formatter.formatStockPrice(testValue);
      expect(result).toBe(testValue);
    });
  });
  describe('#formatWidgetUpdatedTimestamp', () => {
    it('should return a rounded stock price as a string', () => {
      const testValue = new Date();
      const result = formatter.formatWidgetUpdatedTimestamp(testValue);

      expect(result).not.toBe(null);

      const renderedWidgetTimestamp = shallow(result); // Let's render it and check some more stuff

      expect(renderedWidgetTimestamp.childAt(0).prop('value')).toBe(testValue);

      // Implicitly, if we make it over here, we've gotten a renderable widget. Can't check more than that.
    });
    it('should return null if passed an empty value', () => {
      const testValue = '';
      const result = formatter.formatWidgetUpdatedTimestamp(testValue);
      expect(result).toBe(null);
    });
  });
});
