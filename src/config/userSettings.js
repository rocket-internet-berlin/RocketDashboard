import constants from './constants';

const widgetType = constants.widgetType;

const userSettings = {
  widgetList: {
    finance: {
      display: true,
      type: widgetType.finance,
    },
    newRelicErrors: {
      display: true,
      heading: 'Transaction Errors',
      type: widgetType.number,
      threshold: 1,
      riseIsBad: true,
    },
    newRelicLoadTime: {
      display: true,
      heading: 'Load Time (s)',
      type: widgetType.number,
      threshold: 0.33,
      riseIsBad: true,
    },
    newRelicUniqueSessions: {
      display: true,
      heading: 'Unique Sessions',
      type: widgetType.number,
    },
    newRelicSuccessfulBookings: {
      display: true,
      heading: 'Successful Bookings',
      type: widgetType.number,
    },
    newRelicCliErrors: {
      display: true,
      heading: 'CLI Errors',
      type: widgetType.number,
      threshold: 1,
      riseIsBad: true,
    },
    weekNumber: {
      display: true,
      heading: 'Week',
      type: widgetType.number,
    },
    newRelicErrorBreakdown: {
      display: true,
      heading: 'Error Breakdown',
      type: widgetType.breakdown,
    },
    newRelicWebsiteFunnel: {
      display: true,
      heading: 'Website Funnel',
      type: widgetType.funnel,
    },
    jiraInProgress: {
      display: true,
      heading: 'In Progress',
      type: widgetType.number,
      threshold: 10,
      riseIsBad: true,
    },
    jiraSelectedForDevelopment: {
      display: true,
      heading: 'Selected For Development',
      type: widgetType.number,
    },
    jiraReadyForQa: {
      display: true,
      heading: 'Ready For QA',
      type: widgetType.number,
    },
    trivia: {
      display: true,
      heading: "Today's trivia",
      type: widgetType.trivia,
    },
    bugeHistory: {
      display: true,
      type: widgetType.bugsHistory,
    },
    customNumber: {
      display: true,
      heading: 'Custom Number',
      type: widgetType.number,
      threshold: 5,
      riseIsBad: true,
    },
    customFunnel: {
      display: true,
      heading: 'Custom Funnel',
      type: widgetType.funnel,
    },
    customBreakdown: {
      display: true,
      heading: 'Custom Breakdown',
      type: widgetType.breakdown,
    },
  },
};

export default userSettings;
