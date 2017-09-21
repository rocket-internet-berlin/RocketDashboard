import uuidv4 from 'uuid/v4';

import constants from './constants';
import formatter from '../lib/formatter';

const widgetType = constants.widgetType;
const iconType = constants.iconType;

const userSettings = {
  widgetList: [
    {
      id: uuidv4(),
      key: 'finance',
      display: true,
      iconType: iconType.google,
      type: widgetType.number,
      formatter: formatter.formatStockPrice,
      heading: 'Stock Widget', // Only for displaying widget name in settings modal
    },
    {
      id: uuidv4(),
      key: 'githubPr',
      display: true,
      heading: 'Github Open PR Count',
      iconType: iconType.github,
      type: widgetType.number,
      threshold: 5,
      riseIsBad: true,
    },
    {
      id: uuidv4(),
      key: 'weather',
      display: true,
      iconType: iconType.weather,
      type: widgetType.weather,
      heading: 'Weather Widget', // Only for displaying widget name in settings modal
    },
    {
      id: uuidv4(),
      key: 'newRelicErrors',
      display: true,
      heading: 'Transaction Errors',
      iconType: iconType.newrelic,
      threshold: 1,
      riseIsBad: true,
      type: widgetType.number,
    },
    {
      id: uuidv4(),
      key: 'newRelicLoadTime',
      display: true,
      heading: 'Load Time (s)',
      iconType: iconType.newrelic,
      threshold: 0.33,
      riseIsBad: true,
      type: widgetType.number,
    },
    {
      id: uuidv4(),
      key: 'newRelicUniqueSessions',
      display: true,
      heading: 'Unique Sessions',
      iconType: iconType.newrelic,
      type: widgetType.number,
    },
    {
      id: uuidv4(),
      key: 'newRelicSuccessfulBookings',
      display: true,
      heading: 'Successful Bookings',
      iconType: iconType.newrelic,
      type: widgetType.number,
    },
    {
      id: uuidv4(),
      key: 'newRelicCliErrors',
      display: true,
      heading: 'CLI Errors',
      iconType: iconType.newrelic,
      type: widgetType.number,
      threshold: 1,
      riseIsBad: true,
    },
    {
      id: uuidv4(),
      key: 'weekNumber',
      display: true,
      iconType: iconType.calendar,
      heading: 'Week',
      type: widgetType.number,
    },
    {
      id: uuidv4(),
      key: 'newRelicErrorBreakdown',
      display: true,
      heading: 'Error Breakdown',
      iconType: iconType.newrelic,
      type: widgetType.breakdown,
    },
    {
      id: uuidv4(),
      key: 'newRelicWebsiteFunnel',
      display: true,
      heading: 'Website Funnel',
      iconType: iconType.newrelic,
      type: widgetType.funnel,
    },
    {
      id: uuidv4(),
      key: 'jiraInProgress',
      display: true,
      iconType: iconType.jira,
      heading: 'In Progress',
      threshold: 10,
      riseIsBad: true,
      type: widgetType.number,
    },
    {
      id: uuidv4(),
      key: 'jiraSelectedForDevelopment',
      display: true,
      iconType: iconType.jira,
      heading: 'Selected For Development',
      type: widgetType.number,
    },
    {
      id: uuidv4(),
      key: 'jiraReadyForQa',
      display: true,
      iconType: iconType.jira,
      heading: 'Ready For QA',
      type: widgetType.number,
    },
    {
      id: uuidv4(),
      key: 'trivia',
      display: true,
      iconType: iconType.calendar,
      heading: "Today's trivia",
      type: widgetType.text,
    },
    {
      id: uuidv4(),
      key: 'bugsHistory',
      display: true,
      iconType: iconType.jira,
      type: widgetType.history,
      heading: 'Bugs History',
      legends: [
        { dataKey: 'openBugs', name: 'Open', color: constants.chartColor.blue },
        { dataKey: 'solvedBugs', name: 'Solved', color: constants.chartColor.green },
        { dataKey: 'newBugs', name: 'New', color: constants.chartColor.red },
      ],
    },
    {
      id: uuidv4(),
      key: 'customNumber',
      display: true,
      heading: 'Custom Number',
      iconType: null,
      type: widgetType.number,
      threshold: 5,
      riseIsBad: true,
    },
    {
      id: uuidv4(),
      key: 'customFunnel',
      display: true,
      heading: 'Custom Funnel',
      type: widgetType.funnel,
    },
    {
      id: uuidv4(),
      key: 'customBreakdown',
      display: true,
      heading: 'Custom Breakdown',
      type: widgetType.breakdown,
    },
    {
      id: uuidv4(),
      key: 'twitterFeed',
      display: true,
      heading: 'Twitter feed',
      type: widgetType.text,
      iconType: iconType.twitter,
    },
    {
      id: uuidv4(),
      key: 'statusCakeHistory',
      display: true,
      heading: 'StatusCake uptime history',
      type: widgetType.history,
      legends: [{ dataKey: 'status', name: 'Status', color: constants.chartColor.blue }],
      dots: false,
      iconType: iconType.statuscake,
    },
    {
      id: uuidv4(),
      key: 'jiraSummary',
      display: true,
      iconType: iconType.jira,
      heading: 'Jira Summary',
      type: widgetType.pieChart,
    },
    {
      id: uuidv4(),
      key: 'instagram',
      display: true,
      iconType: iconType.instagram,
      type: widgetType.instagram,
    },
  ],
};

export default userSettings;
