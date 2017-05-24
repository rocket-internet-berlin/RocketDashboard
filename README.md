# RocketDashboard

A dashboard with Jira integration.
It's perfect for development teams who want to be aware of their progress in real time.

## Widgets

- **Bugs History** – bugs amount chart.
- **Week Number** – the current week number.
- **Bugs Difference** – contains two numbers: the current amount of bugs and the amount of bugs one week ago.
- and many more are coming.

## Installation

_Note: Make sure you have [yarn](https://yarnpkg.com) or [npm](https://nodejs.org) or installed. We recommend **yarn** due to performance and consistency reasons._

- Clone (SSH or [HTTPS](https://github.com/rocket-internet-berlin/RocketDashboard.git)) or [download](https://github.com/rocket-internet-berlin/RocketDashboard/archive/master.zip) our sources.
- Go to the project folder
```
cd <name-of-the-project-folder>
```
- Install all dependencies by running
```
yarn && cd server && yarn && cd ..
```
or using `npm`:
```
npm install && cd server && npm install && cd ..
```

- Then `yarn start` or `npm start` to run the development and backend servers

Then open [http://localhost:3000](http://localhost:3000) to see your app.

The page will reload if you make edits.

You will see the build errors and lint warnings in the console.

### Optional

In order to have a better development experience, you can install the following Chrome extensions: 

- [Add](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) **Redux DevTools** extension to Chrome.
- [Add](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) **React Developer Tools** extension to Chrome.

## Collaboration

The best way to help improving the project is [to file an issue](https://github.com/rocket-internet-berlin/RocketDashboard/issues/new). We are always happy to fix a bug or to add another widget suggested by you. All issues are taken into account and thoroughly discussed.

## License

RocketDashboard is [MIT licensed](LICENSE).
