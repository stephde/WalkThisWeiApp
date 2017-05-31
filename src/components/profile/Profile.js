'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Container, Content, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Camera from 'react-native-camera';
import styles from './styles';
import Modal from 'react-native-modalbox';
import { connect } from 'react-redux';
import { disconnectWearable, setDeviceId } from '../../actions';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [
        {
          id: 1,
          name: 'Lauren',
          contactPlace: 'Apr. 14 @ Dish',
          image: require('../../../images/contactf.png')
        },
        {
          id: 2,
          name: 'Ralph',
          contactPlace: 'Apr. 15 @ Dish',
          image: require('../../../images/contactm.png')
        }
      ]
    };
  }

  _getContacts() {
    return this.state.contacts
      .map((contact) => {
        return (
          <View key={contact.id} style={{paddingTop: 16, flexDirection: 'row'}}>
            <Image source={contact.image}/>
            <View style={{paddingLeft: 16, flex: 1, justifyContent: 'center'}}>
              <Text style={Object.assign({}, styles.otherFontSize, styles.textColor)}>{contact.name}</Text>
              <Text style={Object.assign({}, styles.otherFontSize, styles.textColor)}>{contact.contactPlace}</Text>
            </View>
            <View>
              <Icon name='ios-call-outline' style={Object.assign({fontSize: 40}, styles.textColor)}/>
            </View>
          </View>
        );
      });
  }

  onHandleAddWearable() {
    this.refs.cameraModal.open();
  }

  onHandleRemoveWearable() {
    this.props.disconnectWearable();
  }

  onHandleBarCodeRead(event) {
    this.props.setDeviceId(event.data);
    this.refs.cameraModal.close();
  }

  _renderCameraModal() {
    return (
      <Modal
        style={styles.modal}
        ref={"cameraModal"}
        animationDuration={300}
        swipeToClose={false}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}
          onBarCodeRead={(event) => {this.onHandleBarCodeRead(event);}}>
          <View style={{flex: 1, paddingTop: 20}}>
            <Button transparent onPress={() => {this.refs.cameraModal.close();}}>
              <Icon name="close-circle" style={Object.assign(styles.modalTextColor, styles.modalClosingButton)}/>
            </Button>
          </View>
          <View style={{flex: 1, justifyContent: 'flex-end'}}>
            <Text style={styles.capture}>Scan device's QR code</Text>
          </View>
        </Camera>
      </Modal>
    );
  }

  _renderWearable() {
    if(this.props.deviceId === '') {
      return (
        <Button style={styles.button} rounded transparent onPress={() => {this.onHandleAddWearable();}}>
          <Text style={Object.assign({}, styles.otherFontSize, styles.textColor)}>Add Wearable</Text>
        </Button>
      );
    }
    return (
      <Button style={styles.button} rounded transparent onPress={() => {this.onHandleRemoveWearable();}}>
        <Text style={Object.assign({}, styles.otherFontSize, styles.textColor)}>Remove Wearable</Text>
      </Button>
    );
  }

  render() {
    const contacts = this._getContacts();
    return (
      <Container style={{flex: 1}}>
      <Content>
        <View style={Object.assign({paddingTop: 20}, styles.container)}>
          <Button transparent onPress={() => {Actions.pop();}}>
            <Icon name="ios-arrow-back" style={styles.backButton}/>
          </Button>
          <View>
            <Image source={require('../../../images/userLarge.png')} style={styles.user} />
            <Text style={Object.assign({paddingTop: 6, textAlign: 'center'}, styles.titleFontSize, styles.textColor)}>You</Text>
          </View>
        </View>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          <View>
            <Text style={Object.assign({}, styles.titleFontSize, styles.textColor)}>Earned Badges</Text>
            <View style={{paddingTop: 8}}>
              <Image source={require('../../../images/badge.png')}/>
            </View>
          </View>
          <View style={{paddingTop: 16}}>
            <Text style={Object.assign({paddingBottom: 16}, styles.titleFontSize, styles.textColor)}>Walking Stats</Text>
            <Text style={Object.assign({}, styles.otherFontSize, styles.textColor)}>Today’s Distance: 5km (1 h)</Text>
            <Text style={Object.assign({}, styles.otherFontSize, styles.textColor)}>Weekly Distance: 12km (8:20h)</Text>
          </View>
          <View style={{paddingTop: 16}}>
            <Text style={Object.assign({}, styles.titleFontSize, styles.textColor)}>Contacts</Text>
            { contacts }
          </View>
          <View style={{paddingTop: 16, paddingBottom: 20, flex: 1, alignItems: 'center'}}>
            {this._renderWearable()}
          </View>
        </View>
      </Content>
      {this._renderCameraModal()}
    </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceId: state.ble.deviceId
  };
}

function mapDispatchToProps(dispatch){
  return {
    setDeviceId: (deviceId) => dispatch(setDeviceId(deviceId)),
    disconnectWearable: () => dispatch(disconnectWearable())
  };
}

Profile.propTypes = {
  setDeviceId: React.PropTypes.func,
  deviceId: React.PropTypes.string,
  disconnectWearable: React.PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
