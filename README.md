# RocketDashboard
[![Build Status](https://travis-ci.org/rocket-internet-berlin/RocketDashboard.svg?branch=master)](https://travis-ci.org/rocket-internet-berlin/RocketDashboard) [![Coverage Status](https://coveralls.io/repos/github/rocket-internet-berlin/RocketDashboard/badge.svg?branch=master&2)](https://coveralls.io/github/rocket-internet-berlin/RocketDashboard?branch=master)

A dashboard with Jira, New Relic, Google Sheets and custom data sources integration.
It's perfect for development teams who want to be aware of their progress in real time.

Please see [CHANGELOG.md](https://github.com/rocket-internet-berlin/RocketDashboard/blob/master/CHANGELOG.md) for recent updates.

<!-- TOC depthFrom:2 depthTo:6 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Installation](#installation)
- [Adding configuration](#adding-configuration)
- [Development](#development)
	- [Starting the "dev" server](#starting-the-dev-server)
	- [For the curious](#for-the-curious)
	- [Optional](#optional)
- [Deployment](#deployment)
- [Current widgets](#current-widgets)
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
- [Widgets / Data sources](#widgets-data-sources)
	- [Google spreadsheets (the Bugs History widget)](#google-spreadsheets-the-bugs-history-widget)
- [Collaboration](#collaboration)
- [License](#license)
- [Background](#background)

<!-- /TOC -->

## Installation

Note: Make sure you have [yarn](https://yarnpkg.com) or [npm](https://nodejs.org) or installed. We recommend **yarn** due to performance and consistency reasons._

- Clone (SSH or [HTTPS](https://github.com/rocket-internet-berlin/RocketDashboard.git)) or [download](https://github.com/rocket-internet-berlin/RocketDashboard/archive/master.zip) our sources.
- Go to the project folder:
```
cd <path-to-the-project-folder>
```
- (Only needed for running locally - skip if using Docker) Install all dependencies by running:
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

The configuration file is read once on boot of the server application. If you change any values in this file, you'll have to restart the server application for the changes to come into effect.

In production the configuration should be set as environment variables.

## Development

###  Starting the "dev" server locally

- Run `yarn start` (or `npm start`) to run the development and backend servers

- Open [http://localhost:3000](http://localhost:3000) in a browser to see your app.

In Chrome the page will reload automatically if you edit anything in the project.

You'll find build errors and lint warnings in the console.

###  Running with docker

You'll need docker-ce and docker-compose. The frontend and backend have been set up to run in their own containers with their own dependencies despite the code folders being mounted as shared volumes on the local machine. 

To get the cluster up and running, just run `docker-compose up` from the repo root. Add a `--build` flag at the end to trigger a rebuild if needed. Open [http://localhost:3000](http://localhost:3000) in a browser to see your app.

As the code folders are shared with the local machine, any code change will lead to an immediate recompile in the affected container, so changes should be noticeable within seconds. For config changes, you'll have to restart the cluster as the .env file is only read on boot. 

Because of the setup with separate dependencies inside the containers, changes in package.json files may not trigger dependency updates inside the containers on build due to docker's cached layers. To get around this and force an update, just run `docker-compose down && docker-compose up --build`.

If you need to access the shell in a container, you may do so like this: `docker exec -it rocketdashboard_front_1 sh` where "rocketdashboard_front_1" is the container name. You'll see it in the terminal when starting the cluster or in the list of running containers from `docker ps`.

###  Running on Windows

Download Docker for Windows (not Docker Toolbox) and follow the commands above. Due to a line ending style discrepancy, the ES Linter will throw errors during container boot and not let the applications start. You will need to add the following line to the rules section in both `./.eslintrc.js` and `./server/.eslintrc.js` temporarily to circumvent this:
```
'linebreak-style': ["error", "windows"],
```
This should not be seen as a permanent solution but should be enough to get started. 

### For the curious

RocketDashboard consists of two quasi-separate parts - "client" and "server":
- "Client" is the front-end (React) app. It resides in the root folder of the project with its code in the `src` sub-folder.
- "Server" is the back-end (Express) app. It resides in the `server` folder with its code similarly in the `server/src` sub-folder.

Currently the `yarn start` commands will start the "Dev" servers for BOTH in parallel for convenience. However, you can run, test, compile etc. the client and server also separately. Just look at the available commands in the "scripts" section of `package.json` or with `yarn run` in the relevant folder.

### Optional

In order to have a better development experience, you can install the following Chrome extensions:

- [Add](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) **Redux DevTools** extension to Chrome.
- [Add](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) **React Developer Tools** extension to Chrome.

## Deployment

The included production build scripts will create the following folders ready to be deployed:
 - `build` containing the optimized build files for the client. This is the front-end part, thus should be served as static folder.
 - `server/build` containing the optimized build files for the api, respectively. This is the back-end/Express part, so it should be run in Node environment.

Depending on you hosting environment, you might want to either serve/run one or both of the above. Here are the available script commands to help you with that:

*(if using `npm`, type `npm run …` instead of `yarn …` in the below examples)*


- `yarn cs:build` to start the build processes for both the client and server
- `yarn cs:start` starts both
  - a static server for the client on port 3000 (`localhost:3000`)
  - an Express server for the api on port 3001 (`localhost:3000`)
- `yarn build` create production build only for the client/React app
- `yarn start:production` serve the client production build on port 3000
- `cd server && yarn build` create production build only for the api/Express
- `cd server && yarn start:production` serve the production build on port 3001

The port for either client and server can be changed by setting the `PORT` environment variable. E.g. `export PORT=8888 && yarn cs:start`.

All necessary credentials should be set as environment variables (or inside `.env`). See [Adding configuration](#adding-configuration) for details.

HTTPS can be used by setting `HTTPS=true` as environment variable.

## Deployment with docker

Configs for the production cluster have been prepared but not yet used in production. You'll need to add setting the environment vars in the server container for the cluster to be deployable from a fresh repo checkout.

To run the production cluster locally, go to repo root and run `docker-compose -f docker-compose-prod.yml up`. As with the development cluster, the `--build` flag is available to trigger a rebuild.

It should go without saying that the production cluster does not mount the local code folders as shared volumes; the code is copied in to each container during container build and that's that. To update the code, you'll need to rebuild the containers.  

## Current widgets

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
- **In Progress** - number of the issues (Jira).
- **Selected For Development** - number of the issues (Jira).
- **Ready For QA** – number of the issues (Jira).
- **Stock ticker** – current stock price of e.g. Rocket Internet (Google Finance)
- **Weather widget** – current temperature and weather conditions in a given city, e.g. Berlin (OpenWeather)
- **Trivia widget** – shows trivia pertaining to today's date.
- Custom Widget Samples

## Functionality

- Refresh button to force update the widget data.
- A settings modal dialog to choose which widgets should be displayed. Widgets that are hidden do not trigger any API calls.
- Re-ordering widgets by drag & drop. Order is persistent in browser local storage.
- Full screen mode that scrolls through displayed widgets in a carousel.  

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

- open `/src/config/userSettings.js`;
- there's a `WidgetList` property which has list of widget to be displayed in given order;
- add the desired widget in the same way the rest have been already added;
- set a `heading` (string) property and `data` (object, see requirements above);
- optionally, you may set a `description` too or tweak the layout (we're using Bootstrap);
- in order to pass your data (you should have [already set it up](#easy-way)) to your widget:
  - add an entry to `mapStateToProps`, it should match this pattern: `<arbitrary-name>: state.generic.<data-source-key>,`;
  - add an entry to `WidgetList.propTypes`: `<the-same-name>: PropTypes.object.isRequired,`;
  - add an entry to `WidgetList.defaultProps`: `<the-same-name>: {},`;

Check the possible [arguments and sample JSX](#generic-widgets).

Save your code and clear the userSettings var in the browser's local storage. Hopefully, you'll see the new widget.

Note that you will have to clear the userSettings var in the local storage for every single change in userSettings.js. There's a ticket in our Trello to handle this smoother for future oblivious customers, as frontend releases otherwise will not be noticeable on the client side until the userSettings are cleared. 

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
        "description": "This is the new Number widget",
        "updated": "2017-08-29T16:16:33.312Z"
    }
}
```
*NB!* The `previous` and `description` properties of the the `data` object are *optional*. Alternatively, *the description may be passed in the JSX* when adding the widget's Component.

**JSX**
```
<Number heading="Custom Widget" data={props.customWidget} riseIsBad threshold={5} iconType={widget.iconType} />
```

**Arguments**
- `heading` (String) Heading of your widget.
- `data` (Object) Data to be displayed (see above for structure).
- `[description]` (String) Optional description to be displayed the numbers. Default: null.
- `[riseIsBad]` (Boolean) Optional switch to highlight the change symbol red, when `current` is higher than `previous`, i.e. has risen. Default: false.
- `threshold` (Number) Optional threshold to highlight `current` when it's gone over / sunk below. Default: null.
- `iconType` (String) Which icon type is to be used in the header. Optional.

#### `Text` widget

![](https://github.com/rocket-internet-berlin/RocketDashboard/blob/master/readme-res/text-widget.png)

**Data structure of the resolved `fetchFunction`**

```json
{
    "status": "success",
    "data": {
        "body": "Lorem ipsum bacon ...",
        "updated": "2017-08-29T16:16:33.312Z"
    }
}
```

**JSX**
```
<Text heading="Some heading" data={props.customWidget} iconType={widget.iconType} />
```

**Arguments**
- `heading` (String) Heading of your widget.
- `data` (Object) Data to be displayed (see above for structure).
- `iconType` (String) Which icon type is to be used in the header. Optional.

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
<Breakdown heading="Custom Breakdown" data={props.customBreakdown} iconType={widget.iconType} />
```

**Arguments**
- `heading` (String) Heading of your widget.
- `data` (Object) Data to be displayed (see above for structure).
- `[description]` (String) Optional description to be displayed the numbers. Default: null.
- `iconType` (String) Which icon type is to be used in the header. Optional.

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
<Funnel heading="Custom Funnel" data={props.customFunnel} iconType={widget.iconType} />
```

**Arguments**
- `heading` (String) Heading of your widget.
- `data` (Object) Data to be displayed (see above for structure).
- `[description]` (String) Optional description to be displayed the numbers. Default: null.
- `iconType` (String) Which icon type is to be used in the header. Optional.


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

### Supported icon type values

- google, jira, newrelic, calendar, weather

To add more:
 - Put the transparent PNG file in `public/icons`.
 - Add the new type as a key in `src/config/constants.js` and connect the key to the file path.
 - Add styling in `src/sass/_panels.scss`, preferably for all of the defined screen breakpoints.
 - Apply your new icon type to a widget in `src/config/userSettings.js`.
 - Clear the `userSettings` var in your browser's local storage and reload the window. Enjoy. 

## Generic components

Some generic components are available for reuse when developing custom widgets:

- **Table**
- **HorizontalBarChart**
- **VerticalBarChart**

### BasicTable.js

Usage: `<BasicTable data={data} headings={headings} />`

Expected data structure:
```
const headings = ['Date', 'Open Bugs', 'Solved Bugs', ...]
const data = ['7. July', 423, 'n/a', ...]
```

### VerticalBarChart.js

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

### HorizontalBarChart.js

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
