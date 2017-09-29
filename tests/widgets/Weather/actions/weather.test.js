import sinon from 'sinon';
import sinonStubPromise from 'sinon-stub-promise';
import WidgetStore from '../../../../src/containers/WidgetList/stores/WidgetStore';
import * as apiFunctions from '../../../../src/lib/fetchApi';
import * as actions from '../../../../src/widgets/Weather/actions/weather';

sinonStubPromise(sinon); // Initialize sinon-stub-promise

describe('weather response parsing', () => {

  const fakeWidgetDisplayed = { display: true };
  const fakeWidgetNotDisplayed = { display: false };
  let sandbox = null;

  const json = {
    weather: { city: 'Berlin', temp: 18, icon: 'http://someIcon.de', description: 'Rainy AF' },
  };
  const expectedAction = {
    type: 'RECEIVE_WEATHER',
    payload: { ...json },
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

    expect(fetchApiStub.callCount).toBe(2); // We are making 2 calls for weather widget
    expect(dispatchStub.callCount).toBe(2); // 1 for current weather and 1 for next 7 days
    expect(dispatchStub.getCalls()[0].args[0]).toEqual(expectedAction);
  });

  afterEach(() => {
    sandbox.restore();
  });
});
