'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Container, Form, Input, Item, Text, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import PhoneInput from 'react-native-phone-input'
import { connect } from 'react-redux';
import { setUser } from '../../actions/';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      isPhoneInputValid: true
    }
  }

  onLogin() {
    if(!this.state.isPhoneInputValid || !this.state.phoneNumber) {
      Toast.show({
             supportedOrientations: ['landscape', 'portrait'],
             text: 'Wrong phone number!',
             position: 'top',
             buttonText: 'Okay'
           });
      return;
    }
    this.props.setUser("test");
  }
  onPhoneNumberChange(number) {
    this.setState({
      isPhoneInputValid: this.refs.phone.isValidNumber(),
      phoneNumber: number
    });
  }

  render() {
    const inputBorderColor = this.state.isPhoneInputValid ? '#FFFFFF' : 'red';
    return (
      <Container style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#70C8BE', paddingTop: 20}}>
        <Grid>
          <Row size={30} style={{alignItems: 'center'}}>
            <Text style={{fontSize: 34, color: '#FFFFFF'}}>Sign Up with us</Text>
          </Row>
          <Row size={40} style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', flex: 1}}>
              <Item style={{borderColor: '#FFFFFF', borderBottomWidth: 2.5, borderBottomColor: inputBorderColor}}>
                <PhoneInput
                  ref='phone'
                  style={{flex: 1, height: 50}} flagStyle={{height: 18, resizeMode: 'contain'}}
                  textProps={{placeholder: 'Phone Number', placeholderTextColor: '#FFFFFF'}}
                  textStyle={{flex: 1, color: '#FFFFFF'}}
                  onChangePhoneNumber={(number) => {this.onPhoneNumberChange(number);}}/>
              </Item>
            </View>
          </Row>
          <Row size={30} style={{alignItems: 'center', justifyContent: 'center'}}>
            <View>
              <Button transparent style={{borderWidth: 3, borderColor: inputBorderColor, borderRadius: 99, height: 70, width: 170, justifyContent: 'center'}} onPress={() => {this.onLogin();}}>
                <Text style={{fontSize: 22, color: inputBorderColor}}>Login</Text>
              </Button>
            </View>
          </Row>
        </Grid>
      </Container>
    );
  }
}

function bindActions(dispatch) {
  return {
    setUser: name => dispatch(setUser(name))
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindActions)(Login);
