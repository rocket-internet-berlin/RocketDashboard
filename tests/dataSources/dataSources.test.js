import React from 'react';
import { shallow, mount } from 'enzyme';
import dataSources from '../../src/dataSources/dataSources';

describe('dataSources', () => {
  it('contains is an array', () => {
    const isArray = Object.prototype.toString.call(dataSources) === '[object Array]';
    expect(isArray).toEqual(true);
  });

  it('elements have "key" (string)', () => {
    dataSources.map(dataSource => {
      expect(typeof dataSource.key === 'string').toEqual(true);
      return true;
    });
  });
  it('elements have "fetchFunction" (Promise function)', () => {
    dataSources.map(dataSource => {
      expect(typeof dataSource.fetchFunction === 'function').toEqual(true);
      return true;
    });
  });
});
