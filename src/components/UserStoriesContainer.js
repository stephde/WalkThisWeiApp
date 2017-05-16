import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  H3
} from 'native-base';
import StoryCard from './StoryCard';
import { setStoryActive } from '../actions';

const mockStory = {
  _id: '59130080f1450662efcb0fa2',
  id: 'story_hpi',
  title: 'Lake HPI',
  description: 'Dieser See hat Fische!',
  picture: 'https://cloudstorage/storytitlepic.jpg',
  authorId: 'author1',
  categories: [
    'nature'
  ],
  creationDate: '2017-04-13T14:23:52.409Z'
};

class UserStoriesContainer extends Component {
  render() {
    return (
      <Container>
        <Content>
          <H3 style={{margin: 10}}>
            Active Stories
          </H3>
          <StoryCard
            story={mockStory}
            isStartable={false}
          />
          <H3 style={{margin: 10}}>
            Progressed Stories
          </H3>
          <StoryCard
            story={mockStory}
            isStartable={true}
            setStoryActive={this.props.setStoryActive}
          />
          <H3 style={{margin: 10}}>
            Completed Stories
          </H3>
          <StoryCard
            story={mockStory}
            isStartable={false}
          />
          <StoryCard
            story={mockStory}
            isStartable={false}
          />
        </Content>
      </Container>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStoryActive: (storyId) => dispatch(setStoryActive(storyId))
  }
}

export default connect(null,mapDispatchToProps)(UserStoriesContainer);
