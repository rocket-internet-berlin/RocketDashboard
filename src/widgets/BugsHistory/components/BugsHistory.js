import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';

import getIcon from '../../../lib/getIcon';
import BasicTable from '../../../components/BasicTable/BasicTable';
import './BugsHistory.scss';
import { dragSource, dropTarget, draggingStyle } from '../../../lib/draggable';
import constants from '../../../config/constants';

const getTableDataFromHistory = data => data.map(item => [item.date, item.openBugs, item.solvedBugs, item.newBugs]);

const BugsHistory = ({ connectDragSource, connectDragPreview, connectDropTarget, isDragging, isOver, ...props }) =>
  compose(connectDragSource, connectDropTarget)(
    <div className="panel BugsHistory" style={draggingStyle(isDragging, isOver)}>
      {connectDragPreview(
        <div className="panel-heading">
          Bugs History
          {getIcon(props.iconType)}
        </div>,
      )}
      <div className="panel-body hidden-xs">
        <div className="row">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart margin={{ top: 0, right: 45, left: 0, bottom: 0 }} data={props.history}>
              <Line
                type="linear"
                dataKey="openBugs"
                name="Open"
                barSize={10}
                strokeWidth="1"
                dot={{ stroke: '#1986ff', strokeWidth: 1, r: 6 }}
                stroke="#1986ff"
              />
              <Line
                type="linear"
                dataKey="solvedBugs"
                name="Solved"
                barSize={10}
                strokeWidth="1"
                dot={{ stroke: '#9BB209', strokeWidth: 1, r: 6 }}
                stroke="#9BB209"
              />
              <Line
                type="linear"
                dataKey="newBugs"
                name="New"
                barSize={10}
                strokeWidth="1"
                dot={{ stroke: '#FF2B19', strokeWidth: 1, r: 6 }}
                stroke="#FF2B19"
              />
              <CartesianGrid stroke="#e7e7e7" strokeDasharray="2 4" />
              <XAxis dataKey="date" stroke="#b7b7b7" tickSize={10} />
              <YAxis stroke="#b7b7b7" tickSize={10} />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="panel-body visible-xs-block">
        <BasicTable
          data={getTableDataFromHistory(props.history)}
          headings={['Date', 'Open Bugs', 'Solved Bugs', 'New Bugs']}
        />
      </div>
      <div className="panel-footer">
        {props.description}
      </div>
    </div>,
  );

const mapStateToProps = state => ({
  history: state.bugsHistory.history,
});

BugsHistory.propTypes = {
  history: PropTypes.arrayOf(
    PropTypes.shape({
      openBugs: PropTypes.number.isRequired,
      solvedBugs: PropTypes.number.isRequired,
      newBugs: PropTypes.number.isRequired,
    }),
  ).isRequired,
  description: PropTypes.string,
  iconType: PropTypes.string,
};

BugsHistory.defaultProps = {
  description: null,
  iconType: null,
};

// export default connect(mapStateToProps)(BugsHistory);
export default compose(
  DragSource(constants.draggableType.smallWidget, dragSource, (conn, monitor) => ({
    connectDragSource: conn.dragSource(),
    connectDragPreview: conn.dragPreview(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(constants.draggableType.smallWidget, dropTarget, (conn, monitor) => ({
    connectDropTarget: conn.dropTarget(),
    isOver: monitor.isOver(),
  })),
  connect(mapStateToProps),
)(BugsHistory);
