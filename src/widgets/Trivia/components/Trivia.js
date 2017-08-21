import React from 'react';
import PropTypes from 'prop-types';

import './Trivia.scss';

const Trivia = ({ data }) =>
  <div className="panel Trivia">
    <div className="panel-heading">Date Trivia</div>
    <div className="panel-body">
      <div>
        {data.trivia}
      </div>
    </div>
  </div>;

Trivia.propTypes = {
  data: PropTypes.shape({
    trivia: PropTypes.string,
  }),
};

Trivia.defaultProps = {
  data: {
    trivia: null,
  },
};

export default Trivia;
