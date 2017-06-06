import React, {Component} from 'react';
import { connect } from 'react-redux';
import { turnVibrationAndLEDOn, turnVibrationAndLEDOff, addNewContact, triggerShortVibration, hasSeenNewContact } from '../actions';

class Contact extends Component {
  render() {
    return null;
  }

  componentWillReceiveProps(newProps) {
    if(newProps.addContact && newProps.addContact != this.props.addContact) {
      this.props.addNewContact(newProps.userId);
    }
    if(newProps.newContacts) {
      this.props.hasSeenNewContact();
      this.props.triggerShortVibration();
    }
    if(typeof newProps.nearByContacts === 'undefined' &&
       typeof this.props.nearByContacts === 'undefined') {
      return;
    }
    if(newProps.nearByContacts.length !== this.props.nearByContacts.length) {
      if(this.props.nearByContacts.length === 0) {
        this.props.turnVibrationAndLEDOn();
      }
      if(newProps.nearByContacts.length === 0) {
        this.props.turnVibrationAndLEDOff();
      }
    }
  }
}

Contact.propTypes = {
  turnVibrationAndLEDOn: React.PropTypes.func,
  turnVibrationAndLEDOff: React.PropTypes.func,
  isLEDOn: React.PropTypes.bool,
  nearByContacts: React.PropTypes.array
}

function mapStateToProps(state) {
  const contacts = state.ble.isConnectedToDevice ? state.position.contacts : [];
  return {
    nearByContacts: contacts,
    newContacts: state.contact.newContacts,
    userId: state.activeUser.id,
    addContact: state.contact.addContact
  };
}

function mapDispatchToProps(dispatch) {
  return {
    turnVibrationAndLEDOn: () => dispatch(turnVibrationAndLEDOn()),
    turnVibrationAndLEDOff: () => dispatch(turnVibrationAndLEDOff()),
    addNewContact: (userId) => dispatch(addNewContact(userId)),
    triggerShortVibration: () => dispatch(triggerShortVibration()),
    hasSeenNewContact: () => dispatch(hasSeenNewContact())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
