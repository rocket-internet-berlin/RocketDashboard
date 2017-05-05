import React from 'react';

const BugsDiff = ({lastWeek, thisWeek}) => {
  
  return (
    <div className="BugsDiff widget">
      <div className="BugsDiff-title widget-title">Bugs</div>
      <div className="BugsDiff-text">{thisWeek} / {lastWeek}</div>
    </div>
  );
};

export default BugsDiff;
