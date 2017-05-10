import React, { Component } from 'react';
import {
  Container,
  Content,
  H3
} from 'native-base';
import StoryCard from './StoryCard';

export default class UserStoriesContainer extends Component {
  render() {
    return (
      <Container>
        <Content>
          <H3 style={{margin: 10}}>
            Active Stories
          </H3>
          <StoryCard />
          <H3 style={{margin: 10}}>
            Completed Stories
          </H3>
          <StoryCard />
          <StoryCard />
        </Content>
      </Container>
    )
  }
}
