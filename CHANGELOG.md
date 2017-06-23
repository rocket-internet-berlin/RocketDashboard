### What’s the plan for next week
- Add semantic versions
- Remove data duplication in Weekly Report / CHANGELOG and use one for weekly report
- Test production build and add instructions
- Improve test coverage
- Finish Jira connection and widget
- Improve widget code structure
- Background process for remote data loading and crunching

#### Possible topics

- Add all widgets that Campsy has

### 0.7.0

- Establish API connection to Jira and add a widget - WIP
- Improve caching with key-value cache (cache crunched data instead of route responses) 
- Fetch from the real bugs history Google Sheet - WIP
- Refactored loading of environment credentials
- Auto-refresh the widgets data
- Test coverage: 25.53% ↘

### 0.5.0 - 0.6.0 

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
