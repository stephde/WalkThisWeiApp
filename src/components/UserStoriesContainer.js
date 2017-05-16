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
            setStoryActive={
              storyId => this.props.setStoryActive(this.props.activeUserId, storyId)
            }
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

UserStoriesContainer.propTypes = {
  activeUserId: React.PropTypes.string,
  setStoryActive: React.PropTypes.func
}

function mapStateToProps({activeUser: {id}}) {
  return {
    activeUserId: id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStoryActive: (userId, storyId) => dispatch(setStoryActive(userId, storyId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserStoriesContainer);
