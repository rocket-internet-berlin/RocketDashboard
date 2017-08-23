import unionBy from 'lodash/unionBy';
import findIndex from 'lodash/findIndex';
import isEmpty from 'lodash/isEmpty';

import userSettings from '../../../config/userSettings';
import storage from '../../../lib/storage';

class WidgetStore {
  constructor() {
    this.userSettings = userSettings;
    this.defaultWidgetList = this.userSettings.widgetList;
    this.readFromLocalStorage();
  }

  readFromLocalStorage() {
    const localSettings = storage.get('userSettings');

    if (localSettings && !isEmpty(localSettings.widgetList)) {
      // Merge settings from local storage with default settings
      // This is required to automatically import new widget from default settings
      const widgetList = unionBy(localSettings.widgetList, this.defaultWidgetList, 'key');
      this.setWidgetList(widgetList);
    } else {
      this.setWidgetList(this.defaultWidgetList);
    }
  }

  setWidgetList(widgetList) {
    this.widgetList = widgetList;
    this.save();
  }

  save() {
    const localSettings = storage.get('userSettings') || {};
    localSettings.widgetList = this.widgetList;
    storage.set('userSettings', localSettings);
  }

  getWidgetList() {
    return this.widgetList;
  }

  hover(sourceId, targetId) {
    this.moveTo(sourceId, targetId);
    return new Promise(resolve =>
      resolve({
        widgetList: this.widgetList,
      }),
    );
  }

  move(sourceId, targetId) {
    this.moveTo(sourceId, targetId);
    this.save();

    return new Promise(resolve =>
      resolve({
        widgetList: this.widgetList,
      }),
    );
  }

  moveTo(sourceId, targetId) {
    // Do not do anything if source and target is same
    if (sourceId === targetId) {
      return;
    }

    this.readFromLocalStorage();
    const source = findIndex(this.widgetList, { id: sourceId });
    const target = findIndex(this.widgetList, { id: targetId });

    if (source > -1 && target > -1) {
      const sourceWidget = this.widgetList.splice(source, 1);
      this.widgetList.splice(target, 0, sourceWidget[0]);
    }
  }
}

const widgetStore = new WidgetStore();

export default widgetStore;
