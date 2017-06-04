'use strict';

import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button, Container, Content, Icon, Separator, ListItem, List } from 'native-base';
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
          <View key={contact.id} style={{flex: 1, paddingTop: 16, flexDirection: 'row'}}>
            <Image source={contact.image}/>
            <View style={{flex: 1, paddingLeft: 16, justifyContent: 'center'}}>
              <Text style={styles.text}>{contact.name}</Text>
              <Text style={styles.text}>{contact.contactPlace}</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
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
    if(this.props.deviceId !== event.data) {
      this.props.setDeviceId(event.data);
      this.refs.cameraModal.close();
    }
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
          <Text style={styles.buttonText}>Add Wearable</Text>
        </Button>
      );
    }
    return (
      <Button style={styles.button} rounded transparent onPress={() => {this.onHandleRemoveWearable();}}>
        <Text style={styles.buttonText}>Remove Wearable</Text>
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
          <View style={{alignItems: 'center'}}>
            <Image source={require('../../../images/man-user.png')} style={styles.user} />
            <Text style={styles.profileText}>{this.props.user.nickName}</Text>
          </View>
        </View>

        <List style={styles.profileContent}>

          <ListItem style={styles.profileItem}>
            <View>
              <Text style={styles.headline}>Earned Badges</Text>
              <View style={{paddingTop: 8}}>
                <Image source={require('../../../images/badge.png')}/>
              </View>
            </View>
          </ListItem>

          <ListItem style={styles.profileItem}>
            <View style={{paddingTop: 8}}>
              <Text style={styles.headline}>Walking Stats</Text>
              <Text style={styles.text}>Today’s Distance: 5km (1 h)</Text>
              <Text style={styles.text}>Weekly Distance: 12km (8:20h)</Text>
            </View>
          </ListItem>

          <ListItem style={styles.profileItem}>
            <View style={{paddingTop: 8, flex: 1}}>
              <Text style={styles.headline}>Contacts</Text>
              { contacts }
            </View>
          </ListItem>

        </List>

        {this.props.isBluetoothOn &&
          <View style={styles.wearableButton}>
            {this._renderWearable()}
          </View>
        }

      </Content>
      {this._renderCameraModal()}
    </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    deviceId: state.ble.deviceId,
    user: state.activeUser,
    isBluetoothOn: state.ble.isBluetoothOn
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
  user: React.PropTypes.object,
  disconnectWearable: React.PropTypes.func,
  isBluetoothOn: React.PropTypes.bool
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
