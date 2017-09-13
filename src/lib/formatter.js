import React from 'react';
import RelativeTime from 'react-relative-time';

/**
 * Custom widget formatter functions
 */
const formatter = {
  formatStockPrice(n) {
    if (n && !isNaN(parseFloat(n))) {
      return parseFloat(n).toFixed(2);
    }
    return n;
  },

  formatWidgetUpdatedTimestamp(updated) {
    if (updated) {
      return (
        <em className="pull-right">
          <RelativeTime value={updated} titleFormat="YYYY/MM/DD HH:mm" />
        </em>
      );
    }
    return null;
  },
};

export default formatter;
