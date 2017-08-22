import React from 'react';
import PropTypes from 'prop-types';
import getIcon from '../../../lib/getIcon';

import './Trivia.scss';

const Trivia = ({ data, iconType }) =>
  <div className="panel Trivia">
    <div className="panel-heading">
      Date Trivia
      {getIcon(iconType)}
    </div>
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
  iconType: PropTypes.string,
};

Trivia.defaultProps = {
  data: {
    trivia: null,
  },
  iconType: null,
};

export default Trivia;
