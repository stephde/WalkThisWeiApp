import React, { Component } from 'react';
import {
  Container,
  Content,
  Text
} from 'native-base';

export default class DetailedStoryContainer extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Text>
            This is DetailedStoryContainer!
          </Text>
          <Text>
            { `Showing: ${this.props.story}` }
          </Text>
        </Content>
      </Container>
    );
  }
}
