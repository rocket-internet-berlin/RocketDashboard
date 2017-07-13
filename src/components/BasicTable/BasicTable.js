import React from 'react';
import PropTypes from 'prop-types';
import './BasicTable.scss';

/* eslint-disable react/no-array-index-key */
/* Disable reason: for `data` we expect shallow array, which contains no "key". That's why we concat our own, i.e. `${rowIndex}-${index}` */
const BasicTable = ({ data, headings }) =>
  <div className="table-responsive">
    <table className="BasicTable table">
      {headings &&
        <thead>
          <tr>
            {headings.map(item =>
              <td key={item}>
                {item}
              </td>,
            )}
          </tr>
        </thead>}
      <tbody>
        {data.map((row, rowIndex) =>
          <tr key={rowIndex}>
            {row.map((column, index) =>
              <td key={`${rowIndex}-${index}`}>
                {column}
              </td>,
            )}
          </tr>,
        )}
      </tbody>
    </table>
    <div className="test" />
  </div>;

const validArrayItem = (arr, idx) => {
  const obj = arr[idx];
  const isInvalid = element => !(typeof element === 'string' || typeof element === 'number');
  const isInvalidError = obj.find(isInvalid);

  if (isInvalidError) {
    return isInvalidError;
  }

  return null;
};

BasicTable.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string.isRequired),
  data: PropTypes.arrayOf(validArrayItem).isRequired,
};

BasicTable.defaultProps = {
  headings: null,
};

export default BasicTable;
