# RocketDashboard

A dashboard with Jira integration.
It's perfect for development teams who want to be aware of their progress in real time.

Please see [CHANGELOG.md](https://github.com/rocket-internet-berlin/RocketDashboard/blob/master/CHANGELOG.md) for recent updates.

## Widgets

- **Week** – the current week number.
- **Load Time** (New Relic)
- **Transaction Errors** – contains two numbers: the current amount of errors and previous (New Relic).
- **Unique Sessions** (New Relic)
- **Successful Bookings** (New Relic)
- **CLI Errors** (New Relic).
- **Error Breakdown** (New Relic)
- **Website Funnel** (New Relic)
- **Bugs History** – bugs amount chart (Google Sheets).

## Two ways to add new widgets

### Easy way

The Redux architecture is complex so we've taken care of it for you. This is how it works:
 
 *Data source (model)*
 
 - open `/src/dataSources/dataSources.js`, you'll find there a list of data sources we already use (feel free to remove any of them you don't need);
 - add a new entry to the array, it should contain a unique key and a method returning `Promise`;

*React (UI)*

- open `/src/components/WidgetList/WidgetList.js`;
- there's a `WidgetList` React component with all the widgets to be shown inside;
- we support three types of generic widgets: `Number`, `Breakdown`, and `Funel`, choose one;
- add a desired widget in the same way the rest have been already added, you might want to change Bootstrap classes to adjust its size;
- set a `heading` (a string) property and a `data` (an object);
- `data`:
  - add an entry to `mapStateToProps`, it should match this pattern: `<arbitrary-name>: state.generic.<data-source-key>,`;
  - add an entry to `WidgetList.propTypes`: `<the-same-name>: PropTypes.object.isRequired,`;
  - add an entry to `WidgetList.defaultProps`: `<the-same-name>: {},`;

Restart a develoment server and, hopefully, you'll see the new widget.

### Hard way

// TODO

## Generic components

Some generic components are available for reuse when developing custom widgets:

- **Table**
- **HorizontalBarChart**
- **VerticalBarChart**

## Installation

_Note: Make sure you have [yarn](https://yarnpkg.com) or [npm](https://nodejs.org) or installed. We recommend **yarn** due to performance and consistency reasons._

- Clone (SSH or [HTTPS](https://github.com/rocket-internet-berlin/RocketDashboard.git)) or [download](https://github.com/rocket-internet-berlin/RocketDashboard/archive/master.zip) our sources.
- Go to the project folder:
```
cd <path-to-the-project-folder>
```
- Install all dependencies by running:
```
yarn && cd server && yarn && cd ..
```
or using `npm`:
```
npm install && cd server && npm install && cd ..
```
## Adding configuration

Since the current widgets fetch data remotely, **some configuration parameters are required**.

According to the [recommended best practices](https://devcenter.heroku.com/articles/node-best-practices#be-environmentally-aware) for local development the configuration is loaded from a `server/.env` in the project's folder.

- Copy the provided `server/.env.SAMPLE` to a new file `server/.env`. Open `.env` and fill-out the required credentials accordingly.

In production the configuration should be set as environment variables.

## Starting the "dev" server

- Then `yarn start` (or `npm start`) to run the development and backend servers

- Open [http://localhost:3000](http://localhost:3000) in a browser to see your app.

In Chrome the page will reload automatically if you edit anything in the project.

You'll find build errors and lint warnings in the console.

## Optional

In order to have a better development experience, you can install the following Chrome extensions:

- [Add](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) **Redux DevTools** extension to Chrome.
- [Add](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) **React Developer Tools** extension to Chrome.

### For the curious

RocketDashboard consists of two quasi-separate parts - "client" and "server":
- "Client" is the front-end (React) app. It resides in the root folder of the project with its code in the `src` sub-folder.
- "Server" is the back-end (Express) app. It resides in the `server` folder with its code similarly in the `server/src` sub-folder.

Currently the `yarn start` commands will start the "Dev" servers for BOTH in parallel for convenience. However, you can run, test, compile etc. the client and server also separately. Just look at the available commands in the "scripts" section of `package.json` or with `yarn run` in the relevant folder.

## Widgets / Data sources

### Google spreadsheets (the Bugs History widget)

The best way to fetch data from a Google spreadsheet is to use a service account. This is not an account in the ordinary sense, it belongs to a certain project, there's an email for identification and token for authentication (no password). Thus, if you want to get data from a certain Google document, share it with a service account and use credentials of the latter reach content over API. As a benefit, users won't have to authorize. For more details please visit [this website](https://developers.google.com/identity/protocols/OAuth2ServiceAccount).

To make the Bugs History widget work with your data this is what you need to do: 

- Set a right ID as a value of `BUGS_HISTORY_SPREADSHEET_ID` in the `.env` configuration file. 

- Data needs to be in a certain format. There should be 4 columns: 1st – formatted data, 2nd – open bugs amount, 3rd – solved bugs amount, 4th – new bugs amount.

- Also, you should set a value for a `BUGS_HISTORY_DATA_RANGE` key in a `.env` config file to something like **'PageName'!A1:D100**. **PageName** may be omitted if the spreadsheet consists of a single page. The range **A1:D100** should include all 4 columns (see the previous step for details), in this example it's A, B, C, and D, but you may pick whatever you want. A limit (in the example – 100) may be different for you. You might even have less filled rows.

### Reusing Base Components
Some components can be reused, when adding or modifying your custom widgets.

#### BasicTable.js
Usage: `<BasicTable data={data} headings={headings} />`

Expected data structure: 
```
const headings = ['Date', 'Open Bugs', 'Solved Bugs', ...]
const data = ['7. July', 423, 'n/a', ...]
```

#### VerticalBarChart.js
Usage: `<VerticalBarChart data={data} />`

Expected data structure: 
```
const data = [
  {
    key: 'Home',
    value: 123
  },
  ...
]
```

#### HorizontalBarChart.js
Usage: `<HorizontalBarChart data={data} />`

Expected data structure: 
```
const data = [
  {
    key: 'Home',
    value: 123
  },
  ...
]
```

## Collaboration

The best way to help improving the project is [to file an issue](https://github.com/rocket-internet-berlin/RocketDashboard/issues/new). We are always happy to fix a bug or to add another widget suggested by you. All issues are taken into account and thoroughly discussed.

## License

RocketDashboard is [MIT licensed](LICENSE).

## Background

This project is being implemented in a JS bootcamp at [Rocket Internet SE](https://www.rocket-internet.com). We’re proud and thrilled to share it with the world!
