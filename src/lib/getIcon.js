import React from 'react';
import constants from '../config/constants';

const getIcon = iconType => {
  if (iconType) {
    return <img className={`pull-right logo ${iconType}`} src={constants.iconSrc[iconType]} alt="Logo" />;
  }
  return null;
};

export default getIcon;
