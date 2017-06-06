'use strict';

import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Button, Container, Form, Icon, Input, InputGroup, Item, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { login } from '../../actions/';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from '../splashscreen/SplashScreen'

var styles = {
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 20
  },
  signUpText: {
    fontSize: 34,
    color: '#70C8BE'
  },
  descriptionText: {
    fontSize: 18,
    color: '#888888'
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    lineHeight: 28,
    fontSize: 22,
    color: '#FFFFFF'
  },
  button: {
    borderWidth: 3,
    backgroundColor: '#70C8BE',
    borderColor: '#FFFFFF',
    borderRadius: 15,
    height: 50,
    //width: 170,,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  input: {
  },
  textView: {
    justifyContent: 'center',
    flex: 1
  },
  icon: {
    fontSize: 30,
    width: 34,
    height: 34,
    paddingLeft: 7,
    backgroundColor: '#FFFFFF',
    color: '#70C8BE',
    borderStyle: 'solid',
    borderColor: '#70C8BE',
    borderWidth: 1.5,
    borderRadius: 17,
    marginRight: 3
  },
  logo: {
    flex: 1,
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  buttonView: {
    flex: 1
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickName: ''
    }
  }

  componentDidMount() {
    this.props.login(DeviceInfo.getUniqueID(), null);
  }

  onLogin() {
    if(!this.state.nickName || this.state.nickName.length < 4) {
      Toast.show({
             supportedOrientations: ['landscape', 'portrait'],
             text: 'Please enter a nickname with at least 4 characters!',
             position: 'top',
             buttonText: 'Okay'
           });
      return;
    }
    this.props.login(DeviceInfo.getUniqueID(),this.state.nickName);
  }

  _renderLogin() {
    return (
      <Container style={styles.container}>
        <Grid>
          <Row size={15} style={styles.row}>
            <Text style={styles.signUpText}>Sign Up with us</Text>
          </Row>
          <Row size={20} style={styles.row}>
            <View>
              <Image source={require('../../../images/logo_512.jpg')} style={styles.logo} />
            </View>
          </Row>
          <Row size={20} style={styles.row}>
            <View style={styles.textView}>
              <Text style={styles.descriptionText}>
                Just enter a username, hit the button
                and you are ready to go!
              </Text>
            </View>
          </Row>
          <Row size={15} style={styles.row}>
            <View style={styles.textView}>
              <InputGroup>
                <Icon name="person" style={styles.icon} />
                <Input placeholder="Username"
                       value={this.state.nickName}
                       onChangeText={(input) => this.setState({nickName: input})}
                       borderType="underline" />
              </InputGroup>
            </View>
          </Row>
          <Row size={30} style={styles.row}>
            <View style={styles.buttonView}>
              <Button
                  transparent
                  style={styles.button}
                  onPress={() => {this.onLogin();}}>
                <Text style={styles.buttonText}>Sign Up!</Text>
              </Button>
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }

  render() {
    if(this.props.isUserLoading && !this.state.phoneNumber) {
      return (<SplashScreen/>);
    }
    return (
      this._renderLogin()
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (deviceId, nickName) => dispatch(login(deviceId, nickName)),
  };
}

const mapStateToProps = state => ({
  isUserLoading: state.activeUser.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
