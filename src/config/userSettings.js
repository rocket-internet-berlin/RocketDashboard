import constants from './constants';

const widgetType = constants.widgetType;
const iconType = constants.iconType;

const userSettings = {
  widgetList: {
    finance: {
      display: true,
      iconType: iconType.google,
      type: widgetType.finance,
    },
    weather: {
      display: true,
      type: widgetType.weather,
    },
    newRelicErrors: {
      display: true,
      heading: 'Transaction Errors',
      iconType: iconType.newrelic,
      threshold: 1,
      riseIsBad: true,
      type: widgetType.number,
    },
    newRelicLoadTime: {
      display: true,
      heading: 'Load Time (s)',
      iconType: iconType.newrelic,
      threshold: 0.33,
      riseIsBad: true,
      type: widgetType.number,
    },
    newRelicUniqueSessions: {
      display: true,
      heading: 'Unique Sessions',
      iconType: iconType.newrelic,
      type: widgetType.number,
    },
    newRelicSuccessfulBookings: {
      display: true,
      heading: 'Successful Bookings',
      iconType: iconType.newrelic,
      type: widgetType.number,
    },
    newRelicCliErrors: {
      display: true,
      heading: 'CLI Errors',
      iconType: iconType.newrelic,
      type: widgetType.number,
      threshold: 1,
      riseIsBad: true,
    },
    weekNumber: {
      display: true,
      iconType: iconType.calendar,
      heading: 'Week',
      type: widgetType.number,
    },
    newRelicErrorBreakdown: {
      display: true,
      heading: 'Error Breakdown',
      iconType: iconType.newrelic,
      type: widgetType.breakdown,
    },
    newRelicWebsiteFunnel: {
      display: true,
      heading: 'Website Funnel',
      iconType: iconType.newrelic,
      type: widgetType.funnel,
    },
    jiraInProgress: {
      display: true,
      iconType: iconType.jira,
      heading: 'In Progress',
      threshold: 10,
      riseIsBad: true,
      type: widgetType.number,
    },
    jiraSelectedForDevelopment: {
      display: true,
      iconType: iconType.jira,
      heading: 'Selected For Development',
      type: widgetType.number,
    },
    jiraReadyForQa: {
      display: true,
      iconType: iconType.jira,
      heading: 'Ready For QA',
      type: widgetType.number,
    },
    trivia: {
      display: true,
      iconType: iconType.calendar,
      heading: "Today's trivia",
      type: widgetType.trivia,
    },
    bugsHistory: {
      display: true,
      iconType: iconType.jira,
      type: widgetType.bugsHistory,
    },
    customNumber: {
      display: true,
      heading: 'Custom Number',
      iconType: null,
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
