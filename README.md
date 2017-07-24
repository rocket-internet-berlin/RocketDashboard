<!-- TOC depthFrom:1 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [RocketDashboard](#rocketdashboard)
	- [Installation](#installation)
	- [Adding configuration](#adding-configuration)
	- [Development](#development)
		- [Starting the "dev" server](#starting-the-dev-server)
		- [Optional](#optional)
	- [Widgets](#widgets)
	- [Adding new widgets](#adding-new-widgets)
		- [Easy way](#easy-way)
			- [Data source (model)](#data-source-model)
			- [React (UI)](#react-ui)
		- [Generic Widgets](#generic-widgets)
			- [`Number` widget](#number-widget)
			- [`Breakdown` widget](#breakdown-widget)
			- [`Funnel` widget](#funnel-widget)
		- [Hard way](#hard-way)
			- [Frontend](#frontend)
			- [Backend](#backend)
	- [Generic components](#generic-components)
			- [BasicTable.js](#basictablejs)
			- [VerticalBarChart.js](#verticalbarchartjs)
			- [HorizontalBarChart.js](#horizontalbarchartjs)
		- [For the curious](#for-the-curious)
	- [Widgets / Data sources](#widgets-data-sources)
		- [Google spreadsheets (the Bugs History widget)](#google-spreadsheets-the-bugs-history-widget)
	- [Collaboration](#collaboration)
	- [License](#license)
	- [Background](#background)

<!-- /TOC -->

# RocketDashboard

A dashboard with Jira, New Relic, Google Sheets and custom data sources integration.
It's perfect for development teams who want to be aware of their progress in real time.

Please see [CHANGELOG.md](https://github.com/rocket-internet-berlin/RocketDashboard/blob/master/CHANGELOG.md) for recent updates.

## Installation

Note: Make sure you have [yarn](https://yarnpkg.com) or [npm](https://nodejs.org) or installed. We recommend **yarn** due to performance and consistency reasons._

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

## Development

###  Starting the "dev" server

- Run `yarn start` (or `npm start`) to run the development and backend servers

- Open [http://localhost:3000](http://localhost:3000) in a browser to see your app.

In Chrome the page will reload automatically if you edit anything in the project.

You'll find build errors and lint warnings in the console.

### Optional

In order to have a better development experience, you can install the following Chrome extensions:

- [Add](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) **Redux DevTools** extension to Chrome.
- [Add](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) **React Developer Tools** extension to Chrome.

## Widgets

Currently shown widgets in the Dashboard:

- **Week** – the current week number.
- **Load Time** (New Relic)
- **Transaction Errors** – contains two numbers: the current amount of errors and previous (New Relic).
- **Unique Sessions** (New Relic)
- **Successful Bookings** (New Relic)
- **CLI Errors** (New Relic).
- **Error Breakdown** (New Relic)
- **Website Funnel** (New Relic)
- **Bugs History** – bugs amount chart (Google Sheets).
- Custom Widget Samples

## Adding new widgets

### Easy way

As the common Redux architecture pattern is not very plugin-friendly, we've developed some tools to make adding new widgets easier. Those include reusable generic widgets and streamlined data-binding with a custom data source.

#### Data source (model)

- open `/src/dataSources/dataSources.js`, you'll find there a list of data sources we already use (feel free to remove any of those you don't need);
- add a new entry to the array, it should contain a unique key (`key`) and a `Promise` method returning (`fetchFunction`);
- make sure that the `fetchFunction` resolved with data object, which conforms to the [expected structure](#generic-widgets);

You entry should look similar to:
```
  {
    key: 'customNumber',
    fetchFunction: () => new Promise(resolve => resolve({ data: { current: 9, previous: 19 } })),
  },
```
or
```
  {
    key: 'customBreakdown',
    fetchFunction: () => fetchUrl('http://www.mocky.io/v2/596f52eb0f00008d036b7535'),
  },
```

#### React (UI)

- open `/src/components/WidgetList/WidgetList.js`;
- there's a `WidgetList` React component with all the widgets to be shown inside;
- add the desired widget in the same way the rest have been already added;
- set a `heading` (string) property and `data` (object, see requirements above);
- optionally, you may set a `description` too or tweak the layout (we're using Bootstrap);
- in order to pass your data (you should have [already set it up](#easy-way)) to your widget:
  - add an entry to `mapStateToProps`, it should match this pattern: `<arbitrary-name>: state.generic.<data-source-key>,`;
  - add an entry to `WidgetList.propTypes`: `<the-same-name>: PropTypes.object.isRequired,`;
  - add an entry to `WidgetList.defaultProps`: `<the-same-name>: {},`;

Check the possible [arguments and sample JSX](#generic-widgets).

Restart the development server and, hopefully, you'll see the new widget.

### Generic Widgets

#### `Number` widget

![](https://github.com/rocket-internet-berlin/RocketDashboard/blob/master/readme-res/number-widget.png)

**Data structure of the resolved `fetchFunction`**

```json
{
    "status": "success",
    "data": {
        "current": 9,
        "previous": 19,
        "description": "This is the new Number widget"
    }
}
```
*NB!* The `previous` and `description` properties of the the `data` object are *optional*. Alternatively, *the description may be passed in the JSX* when adding the widget's Component.

**JSX**
```
<Number heading="Custom Widget" data={props.customWidget} riseIsBad threshold={5} />
```

**Arguments**
- `heading` (String) Heading of your widget.
- `data` (Object) Data to be displayed (see above for structure).
- `[description]` (String) Optional description to be displayed the numbers. Default: null.
- `[riseIsBad]` (Boolean) Optional switch to highlight the change symbol red, when `current` is higher than `previous`, i.e. has risen. Default: false.
- `threshold` (Number) Optional threshold to highlight `current` when it's gone over / sunk below. Default: null.

#### `Breakdown` widget

![](https://github.com/rocket-internet-berlin/RocketDashboard/blob/master/readme-res/breakdown-widget.png)

**Data structure of the resolved `fetchFunction`**

```json
{
  "status": "success",
  "data": {
    "results": [
      { "name": "A", "count": 99 },
      { "name": "B", "count": 19 },
      { "name": "C", "count": 9 }
    ],
    "description": "Example of a breakdown"
  }
}
```
*NB!* As before, the `description` property of the the `data` object is *optional*. Alternatively, it may be passed in the JSX.

**JSX**
```
<Breakdown heading="Custom Breakdown" data={props.customBreakdown} />
```

**Arguments**
- `heading` (String) Heading of your widget.
- `data` (Object) Data to be displayed (see above for structure).
- `[description]` (String) Optional description to be displayed the numbers. Default: null.

#### `Funnel` widget

![](https://github.com/rocket-internet-berlin/RocketDashboard/blob/master/readme-res/funnel-widget.png)

**Data structure of the resolved `fetchFunction`**

```json
{
  "status": "success",
  "data": {
    "results": [
      { "name": "A", "count": 99 },
      { "name": "B", "count": 19 },
      { "name": "C", "count": 9 }
    ],
    "description": "Example of a funnel"
  }
}
```
*NB!* As before, the `description` property of the the `data` object is *optional*. Alternatively, it may be passed in the JSX.

**JSX**
```
<Funnel heading="Custom Funnel" data={props.customFunnel} />
```

**Arguments**
- `heading` (String) Heading of your widget.
- `data` (Object) Data to be displayed (see above for structure).
- `[description]` (String) Optional description to be displayed the numbers. Default: null.


### Hard way

If the provided generic widgets and flow are enough and you need something different, you will have create your own widget or API endpoint. As an example, please, check how a `BugsHistory` widget is implemented.

#### Frontend

- add a new folder inside the `/src/widgets`;
- the newly created folder should contain folders `components`, `actions`, and `reducers`;
- implement a component, action, and reducer (check the `BugsHistory` to get insight);
- include your component to the `WidgetList` component;
- you should have an action to update data in your widget, trigger it inside a `refreshAll` function (`/src/actions/index.js`);
- add your reducer to the `appReducers` list (`/src/reducers/index.js`);

#### Backend

You may want to create a new route on our backend (a `/server` folder) where you would be able to implement any logic of fetching, transforming, and caching data received from third-party services.

- set the route to your new endpoint up (`/server/src/index.js`);
- add the endpoint code (check `/server/src/routes/bugsHistory.js` or `/server/src/routes/newRelic.js` for insight);

## Generic components

Some generic components are available for reuse when developing custom widgets:

- **Table**
- **HorizontalBarChart**
- **VerticalBarChart**

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

## Collaboration

The best way to help improving the project is [to file an issue](https://github.com/rocket-internet-berlin/RocketDashboard/issues/new). We are always happy to fix a bug or to add another widget suggested by you. All issues are taken into account and thoroughly discussed.

## License

RocketDashboard is [MIT licensed](LICENSE).

## Background

This project is being implemented in a JS bootcamp at [Rocket Internet SE](https://www.rocket-internet.com). We’re proud and thrilled to share it with the world!
