# Change Log

#### Possible topics

- Improve test coverage for frontend.
- Backend tests.

#### 0.14.0

- Widget to display the current temperature and weather conditions in a configurable city.
- Twitter widget.
- Widget instantiation through FactoryPattern.
- Persistent re-ordering of widgets using drag & drop.
- Settings modal dialog to select which widget should be active. Selection is persistent in local storage.
- Icons for each widget header.
- Caching using redis in a separate Docker container.
- Caching of more controller responses.
- Full screen mode that shows one widget at a time in a carousel.
- Unit test refactoring + server-side tests.

#### 0.13.0

- Docker containers for both development and production use.
- Label for last server-side update on many widgets to indicate data freshness.
- Widget displaying trivia for today's date.
- Not letting the backend crash if NewRelic Insights config is set but empty.
- Improved logging; console for dev mode and access/error log files for production mode. 
- Material design theme.
- Friendlier default values for widgets for when data has not been fetched yet.
- Widget for tracking a stock price using Google Finance. 

#### 0.12.0

- Added Jira widgets
- Refactored Jira service with Promises
- Configured Travis CI (tests) and Coveralls.io (test coverage)
- Fixed production build, added script commands and instructions
- Updated the RI logo
- Test coverage: 58% ↗

### 0.11.0

- Implement custom data source for Number, Breakdown, and Funnel widgets.
- Add (explanation) sub-title to NewRelic widgets.

### 0.10.0

- Add Error Breakdown (New Relic pie-chart)
- Add Website Funnel (New Relic)
- Extract Graph, Table reusable components
- Add documentation for required data-structure of generic widgets
- Numbers turn to red if a threshold is overcome.
- Red and green to reflect if a dynamic is good.

### 0.9.0

- Implemented Campsy's NewRelic widgets (Site & CLI Errors, Load Time, Successful Bookings, Unique Sessions)
- Ensured cross-browser compatibility (fixed issues for IE11)
- Extracted Number generic widget and improved structure (now re-use generic component, reducer, scss, etc.)
- UI improvements (comparison percentage

### 0.8.0

- Fetch from the real bugs history Google Spreadsheet
- Establish API connection to Jira and add a widget
- Adhered project to [Semantic Versioning](http://semver.org/)
- Cleanup the Weekly Report / CHANGELOG.md
- Improve widget code structure

### 0.7.0

- Improve caching with key-value cache (cache crunched data instead of route responses)
- Refactored loading of environment credentials
- Auto-refresh the widgets data
- Test coverage: 25.53% ↘

### 0.6.0

- Added Babel ES6 transpiler and Eslint for the “server” part
- Removed back-end part of weekNumber (only FE now)
- Fetch data from Google Spreadsheet in the BE (BugsHistory widget)
- Fetch data from New Relic in the BE (newRelicErrors né BugsDiff)
- Config per environment with dedicated .js files
- Cache API results in Node.js/server-side
- Test coverage: 35.35%

### 0.4.0

- Redux-actions.
- Constants for action names.
- UI refresh.
- Unit tests.
- Fixed Build script.

### 0.3.0

- Chart widget.
- Backend (based on **Express**).
- An issue when **Redux DevTools** are not installed in the browser is fixed.
- Changelog, **MIT license**, and readme are added.

### 0.2.0

- Loading data with **AJAX**.
- **Sass** – **CSS** preprocessor.
- **Bootstrap** styles.
- Bugs Difference widget.
- Responsive layout.

### 0.1.0

- Started off by using **create-react-app**.
- Basic **HTML** layout.
- Week Number widget.
- **Redux** structure in the project.
- Eject-ed from **create-react-app**.
- **ESLint** with the AirBnB configurations (**eslint-config-airbnb**).
- Refresh button.
- **Prettier** is added to a pre-commit hook.
