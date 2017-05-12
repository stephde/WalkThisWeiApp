'use strict';

import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Container, Form, Input, Item, Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { Col, Row, Grid } from "react-native-easy-grid";
import PhoneInput from 'react-native-phone-input'
import { connect } from 'react-redux';
import { setUser } from '../../actions/';

// import styles from './styles';
class InputPhone extends Component {
  render() {
    return (
      <Form style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{justifyContent: 'center'}}>
            <Item style={{borderColor: '#FFFFFF', borderBottomWidth: 2.5, borderBottomColor: '#FFFFFF'}}>
              <PhoneInput ref='phone' style={{height: 50}} flagStyle={{height: 18, resizeMode: 'contain'}}/>
            </Item>
          </View>
          <View style={{flex: 0.8}}>
            <Item style={{borderColor: '#FFFFFF', borderBottomWidth: 2.5, borderBottomColor: '#FFFFFF'}}>
              <Input keyboardType="phone-pad" placeholderTextColor="#FFFFFF" placeholder="Phone Number" style={{fontSize: 18, color: '#FFFFFF'}}/>
            </Item>
          </View>
        </View>
      </Form>
    );
  }
}

class Login extends Component {
  onLogin() {
    this.props.setUser("test");
  }

  render() {
    return (
      <Container style={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#70C8BE', paddingTop: 20}}>
        <Grid>
          <Row size={30} style={{alignItems: 'center'}}>
            <Text style={{fontSize: 34, color: '#FFFFFF'}}>Sign Up with us</Text>
          </Row>
          <Row size={40} style={{justifyContent: 'center', alignItems: 'center'}}>
            <InputPhone/>
          </Row>
          <Row size={30} style={{alignItems: 'center', justifyContent: 'center'}}>
            <View>
              <Button transparent style={{borderWidth: 3, borderColor: '#FFFFFF', borderRadius: 99, height: 70, width: 170, justifyContent: 'center'}} onPress={() => {this.onLogin();}}>
                <Text style={{fontSize: 22, color: '#FFFFFF'}}>Login</Text>
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
