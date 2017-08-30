/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';

import WidgetListItems from './WidgetListItems';
import { closeWidgetModal } from '../../actions';
import './WidgetSettings.scss';

const WidgetSettings = props => {
  const closeModal = () => {
    props.closeWidgetModal();
  };

  return (
    <ReactModal
      isOpen={props.showModal}
      contentLabel="Minimal Modal Example"
      className="WidgetSettingsModal"
      overlayClassName="WidgetSettingsModalOverlay"
    >
      <div className="modal-content">
        {/* eslint-disable jsx-a11y/no-static-element-interactions */}
        <span onClick={closeModal} role="button" className="icon fa-times-circle" />
        <WidgetListItems widgetList={props.widgetList} />
      </div>
    </ReactModal>
  );
};

const mapStateToProps = state => ({
  showModal: state.widgetSettings.showModal,
  widgetList: state.widgetSettings.widgetList,
});

const mapDispatchToProps = {
  closeWidgetModal,
};

WidgetSettings.propTypes = {
  widgetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  showModal: PropTypes.bool.isRequired,
  closeWidgetModal: PropTypes.func.isRequired,
};

WidgetSettings.defaultProps = {
  showModal: false,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetSettings);
