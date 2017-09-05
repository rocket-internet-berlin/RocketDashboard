import React from 'react';
import RelativeTime from 'react-relative-time';

/**
 * Custom widget formatter functions
 */
function financeFormatter(n) {
  if (n && !isNaN(parseFloat(n))) {
    return parseFloat(n).toFixed(2);
  }
  return n;
}

function timeFormatter(updated) {
  if (updated) {
    return (
      <em className="pull-right">
        <RelativeTime value={updated} titleFormat="YYYY/MM/DD HH:mm" />
      </em>
    );
  }
  return null;
}

export { financeFormatter, timeFormatter };
