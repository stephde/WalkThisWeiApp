import React, { Component } from 'react';
import { Image } from 'react-native';
import {
  Container,
  Content,
  Text
} from 'native-base';

export default class UserProfile extends Component {
  render() {
    return (
      <Container style={{alignItems: 'center'}}>
        <Content>
          <Image
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              marginVertical: 10
            }}
            source={{
              uri: 'https://facebook.github.io/react/img/logo_og.png'
            }}
          />
          <Text>Mr. React Native</Text>
        </Content>
      </Container>
    )
  }
}
