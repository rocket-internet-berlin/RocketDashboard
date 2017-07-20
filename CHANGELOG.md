# Change Log

#### What’s the plan for next week

- Jira widgets.
- Setup CI tool, e.g. Travis CI.

#### Possible topics

- Test production build and add production build+deploy instructions.
- Dockerize the app.
- Improve test coverage.
- Add a last update label on each widget.
- Loading indicators.

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
