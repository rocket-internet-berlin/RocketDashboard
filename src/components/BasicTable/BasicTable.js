import React from 'react';
import PropTypes from 'prop-types';

const BasicTable = ({ data }) => (
  <div className="table-responsive">
    <table className="table">
      <tbody>
        {data.map(item => <tr><td>{item.label}</td><td>{item.bugs}</td></tr>)}
      </tbody>
    </table>
  </div>
);

BasicTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BasicTable;
