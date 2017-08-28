import React from 'react';
import constants from '../config/constants';

const getIcon = iconType => {
  if (iconType) {
    return (
      <span className="pull-right">
        <img className={`logo ${iconType}`} src={constants.iconSrc[iconType]} alt="Logo" />
      </span>
    );
  }
  return null;
};

export default getIcon;
