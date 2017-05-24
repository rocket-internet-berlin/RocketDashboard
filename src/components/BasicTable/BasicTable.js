import React from 'react';
import PropTypes from 'prop-types';

const BasicTable = ({ data }) => (
  <div className="table-responsive">
    <table className="table">
      <tbody>
        {data.map(item => (
          <tr key={item.label}><td>{item.label}</td><td>{item.bugs}</td></tr>
        ))}
      </tbody>
    </table>
  </div>
);

BasicTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      bugs: PropTypes.isRequired,
    }),
  ).isRequired,
};

export default BasicTable;
