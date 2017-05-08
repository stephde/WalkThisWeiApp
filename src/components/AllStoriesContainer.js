import React, { Component } from 'react';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { Actions } from 'react-native-router-flux';


export default class AllStoriesContainer extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text>
            Here will be aaaall the stories!!!
          </Text>
        </Content>
      </Container>
    );
  }
}
