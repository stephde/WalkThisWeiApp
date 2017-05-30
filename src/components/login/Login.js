'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Container, Form, Input, Item, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import { connect } from 'react-redux';
import { login } from '../../actions/';
import DeviceInfo from 'react-native-device-info';
import SplashScreen from '../splashscreen/SplashScreen'

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
    const inputBorderColor = '#FFFFFF';
    return (
      <Container style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#70C8BE', paddingTop: 20}}>
        <Grid>
          <Row size={30} style={{alignItems: 'center'}}>
            <Text style={{fontSize: 34, color: '#FFFFFF'}}>Sign Up with us</Text>
          </Row>
          <Row size={40} style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', flex: 1}}>
              <Input
                  placeholder="Username"
                  value={this.state.nickName}
                  onChangeText={(input) => this.setState({nickName: input})}
                  style={{borderColor: '#FFFFFF', borderBottomWidth: 2.5, borderBottomColor: inputBorderColor}} />
            </View>
          </Row>
          <Row size={30} style={{alignItems: 'center', justifyContent: 'center'}}>
            <View>
              <Button
                  transparent
                  style={{borderWidth: 3, borderColor: inputBorderColor, borderRadius: 99, height: 70, width: 170, justifyContent: 'center'}}
                  onPress={() => {this.onLogin();}}>
                <Text style={{lineHeight: 28, fontSize: 22, color: inputBorderColor}}>Sign Up!</Text>
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
