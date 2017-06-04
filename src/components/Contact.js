import React, {Component} from 'react';
import { connect } from 'react-redux';
import { turnVibrationAndLEDOn, turnVibrationAndLEDOff } from '../actions';

class Contact extends Component {
  render() {
    return null;
  }

  componentWillReceiveProps(newProps) {
    if(typeof newProps.nearByContacts === 'undefined') {
      return;
    }
    if(newProps.nearByContacts.length > 0) {
      if(!this.props.isLEDOn) {
        this.props.turnVibrationAndLEDOn();
      }
    } else {
      if(this.props.isLEDOn) {
        this.props.turnVibrationAndLEDOff();
      }
    }
  }
}

Contact.propTypes = {
  turnVibrationAndLEDOn: React.PropTypes.func,
  turnVibrationAndLEDOff: React.PropTypes.func,
  isLEDOn: React.PropTypes.bool
}

function mapStateToProps(state) {
  return {
    isLEDOn: state.ble.isLEDOn,
    nearByContacts: state.position.contacts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    turnVibrationAndLEDOn: () => dispatch(turnVibrationAndLEDOn()),
    turnVibrationAndLEDOff: () => dispatch(turnVibrationAndLEDOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
