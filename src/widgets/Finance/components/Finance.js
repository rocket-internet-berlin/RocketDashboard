import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RelativeTime from 'react-relative-time';

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

const Finance = ({ finance }) =>
  <div className="panel Number">
    <div className="panel-heading">
      {finance.finance.company} Stock Price
    </div>
    <div className="panel-body">
      <span className="current">
        {finance.finance.price}
      </span>
    </div>
    <div className="panel-footer">
      {finance.finance.change > 0
        ? <span className="change increase good">
          {finance.finance.change}
        </span>
        : <span className="change decrease bad">
          {finance.finance.change}
        </span>}
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
};

Finance.defaultProps = {
  finance: {},
};

export default connect(mapStateToProps)(Finance);
