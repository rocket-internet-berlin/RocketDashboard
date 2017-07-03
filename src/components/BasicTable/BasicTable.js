import React from 'react';
import PropTypes from 'prop-types';
import './BasicTable.scss';

const BasicTable = ({ data }) =>
  <div className="table-responsive">
    <table className="BasicTable table">
      <tbody>
        {data.map(item =>
          <tr key={item.date}>
            <td className="date">
              {item.date}
            </td>
            <td className="open-bugs">
              {item.openBugs}
            </td>
            <td className="solved-bugs">
              {item.solvedBugs}
            </td>
            <td className="new-bugs">
              {item.newBugs}
            </td>
          </tr>,
        )}
      </tbody>
    </table>
  </div>;

BasicTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      openBugs: PropTypes.isRequired,
      solvedBugs: PropTypes.isRequired,
      newBugs: PropTypes.isRequired,
    }),
  ).isRequired,
};

export default BasicTable;
