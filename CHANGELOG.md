# Change Log

#### What’s the plan for next week

- Adhered project to [Semantic Versioning](http://semver.org/)
- Remove data duplication in Weekly Report / CHANGELOG.md and use one for weekly report
- Test production build and add production build+deploy instructions
- Improve test coverage
- Improve widget code structure
- Background process for remote data loading and crunching

#### Possible topics

- Implement all widgets that Campsy has

### current

- Fetch from the real bugs history Google Spreadsheet
- Establish API connection to Jira and add a widget

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
