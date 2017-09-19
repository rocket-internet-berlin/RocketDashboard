import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import WidgetStore from '../../../src/containers/WidgetList/stores/WidgetStore';
import * as apiFunctions from '../../../src/lib/fetchApi';
import * as actions from '../../../src/actions/history/bugsHistory';

sinonStubPromise(sinon); // Initialize sinon-stub-promise

describe('bugsHistory response parsing', () => {
  const fakeWidgetDisplayed = { display: true };
  const fakeWidgetNotDisplayed = { display: false };
  let sandbox = null;

  const json = {
    data: [{ openBugs: 1, solvedBugs: 2, newBugs: 3 }],
  };
  const expectedAction = {
    type: 'RECEIVE_BUGSHISTORY',
    payload: json,
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  it('creates a correct action', () => {
    expect(actions.onReceive(json)).toEqual(expectedAction);
  });

  it('does not refresh if the widget is not displayed', () => {
    sandbox.stub(WidgetStore, 'getWidget').returns(fakeWidgetNotDisplayed);
    const fetchApiStub = sandbox.stub(apiFunctions, 'fetchApi');
    const dispatchStub = sandbox.stub();

    actions.refresh()(dispatchStub);

    expect(dispatchStub.callCount).toBe(0);
    expect(fetchApiStub.callCount).toBe(0);
  });

  it('refreshes if the widget is displayed', () => {
    sandbox.stub(WidgetStore, 'getWidget').returns(fakeWidgetDisplayed);
    const fetchApiStub = sandbox.stub(apiFunctions, 'fetchApi').returnsPromise();
    const dispatchStub = sandbox.stub();

    actions.refresh()(dispatchStub);

    fetchApiStub.resolves(json);

    expect(fetchApiStub.callCount).toBe(1);
    expect(dispatchStub.callCount).toBe(1);
    expect(dispatchStub.getCalls()[0].args[0]).toEqual(expectedAction);
  });

  afterEach(() => {
    sandbox.restore();
  });
});
