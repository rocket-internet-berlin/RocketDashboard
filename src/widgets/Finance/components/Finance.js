import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RelativeTime from 'react-relative-time';
import getIcon from '../../../lib/getIcon';

const updatedTime = updated => {
  if (updated) {
    return (
      <em className="pull-right">
        <RelativeTime value={updated} titleFormat="YYYY/MM/DD HH:mm" />
      </em>
    );
  }
  return null;
};

const getChangeSection = change => {
  let classNames = 'change decrease bad';

  if (change > 0) {
    classNames = 'change increase good';
  }

  return (
    <span className={classNames}>
      {change}
    </span>
  );
};

const Finance = ({ finance, iconType }) =>
  <div className="panel Number">
    <div className="panel-heading">
      {finance.finance.company} Stock Price
      {getIcon(iconType)}
    </div>
    <div className="panel-body">
      <span className="current">
        {finance.finance.price}
      </span>
    </div>
    <div className="panel-footer">
      {getChangeSection(finance.finance.change)}
      {updatedTime(finance.finance.updated)}
    </div>
  </div>;

const mapStateToProps = state => ({
  finance: state.finance,
});

Finance.propTypes = {
  finance: PropTypes.shape({
    change: PropTypes.number,
    price: PropTypes.number,
    updated: PropTypes.string,
    company: PropTypes.string,
  }).isRequired,
  iconType: PropTypes.string,
};

Finance.defaultProps = {
  finance: {},
  iconType: null,
};

export default connect(mapStateToProps)(Finance);
