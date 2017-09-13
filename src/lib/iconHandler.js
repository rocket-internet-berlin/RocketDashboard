import React from 'react';
import constants from '../config/constants';

const iconHandler = {
  getIconPartial(iconType) {
    if (iconType) {
      return <img className={`pull-right logo ${iconType}`} src={constants.iconSrc[iconType]} alt="Logo" />;
    }
    return null;
  },
};

export default iconHandler;
