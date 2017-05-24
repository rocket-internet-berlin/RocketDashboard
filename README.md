# RocketDashboard

A dashboard with Jira integration.
It's perfect for development teams who want to be aware of their progress in real time.

## Widgets

- **Bugs History** – bugs amount chart.
- **Week Number** – the current week number.
- **Bugs Difference** – contains two numbers: the current amount of bugs and the amount of bugs one week ago.
- and many more are coming.

## Installation

_Note: Make sure you have [npm](https://nodejs.org) or [yarn](https://yarnpkg.com) installed. We do recommend yarn._

- Clone (SSH or [HTTPS](https://github.com/rocket-internet-berlin/RocketDashboard.git)) or [download](https://github.com/rocket-internet-berlin/RocketDashboard/archive/master.zip) our sources.
- Open terminal (MacOS) or command line (Windows) and execute:
```
cd <path-to-the-dashboard-folder>
npm install
cd server
npm install
cd ..
npm start
```

The last command will start a development server and open http://localhost:3000 with the dashboard site running in chrome.

### Optional:

- [Add](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd) **Redux DevTools** extension to Chrome.
- [Add](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) **React Developer Tools** extension to Chrome.

## Collaboration

The best way to help improving the project is [to file an issue](https://github.com/rocket-internet-berlin/RocketDashboard/issues/new). We are always happy to fix a bug or to add another widget suggested by you. All issues are taken into account and thoroughly discussed.

## License

RocketDashboard is [MIT licensed](LICENSE).
