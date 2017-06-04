import React, {Component} from 'react';
import { connect } from 'react-redux';
import { turnVibrationAndLEDOn, turnVibrationAndLEDOff } from '../actions';

class Contact extends Component {
  render() {
    return null;
  }

  componentWillReceiveProps(newProps) {
    if(typeof this.props.nearByContacts !== 'undefined' &&
       typeof newProps.nearByContacts !== 'undefined' &&
       newProps.nearByContacts.length !== this.props.nearByContacts.length) {
      if(newProps.nearByContacts.length > 0) {
        this.props.turnVibrationAndLEDOn();
      }
      else {
        if(typeof this.props.nearByContacts !== 'undefined') {
          this.props.turnVibrationAndLEDOff();
        }
      }
    }
  }
}

Contact.propTypes = {
  turnVibrationAndLEDOn: React.PropTypes.func,
  turnVibrationAndLEDOff: React.PropTypes.func
}

function mapStateToProps(state) {
  return {
    nearByContacts: ['232233'],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    turnVibrationAndLEDOn: () => dispatch(turnVibrationAndLEDOn()),
    turnVibrationAndLEDOff: () => dispatch(turnVibrationAndLEDOff()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
