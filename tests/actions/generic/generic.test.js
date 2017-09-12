import React from 'react';
import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import { shallow, mount } from 'enzyme';
import { onReceive, refresh } from '../../../src/actions/generic/generic';

sinonStubPromise(sinon);

const key = 'someDataKey';
const json = {
  data: { some: 'data' },
};
const expectedAction = {
  type: 'RECEIVE_DATA',
  payload: {
    key,
    ...json,
  },
};

describe('onReceive', () => {
  it('should create action with proper structure', () => {
    const action = onReceive(key, json);

    expect(action).toEqual(expectedAction);
  });
});

describe('refresh', () => {
  it('should dispatch onReceive action when Promise is resolved', () => {
    const dispatch = sinon.spy();
    const fetchFunction = sinon.stub().returnsPromise();
    const dataSource = {
      key: 'someDataKey',
      fetchFunction,
    };

    const refreshResultFunction = refresh(dataSource);
    const dispatchResultFunction = refreshResultFunction(dispatch);

    expect(dispatch.notCalled).toBe(true);

    fetchFunction.resolves(json);

    expect(dispatch.calledOnce).toBe(true);

    expect(dispatch.getCall(0).args[0]).toEqual(expectedAction);
  });
});
