import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  H3
} from 'native-base';
import StoryCard from './StoryCard';
import { setStoryActive } from '../actions';
import _ from 'lodash';

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
  _buildProgressedStories() {
    let result = [];
    if (this.props.progressedStories.length > 0) {
      result.push(
        <H3 style={{margin: 10}} key={'progressed-stories-h3'}>
          Progressed Stories
        </H3>
      );
      this.props.progressedStories.forEach(story =>
        result.push(
          <StoryCard
            key={`progressed-${story.id}`}
            story={story}
            isStartable={true}
            setStoryActive={
              storyId => this.props.setStoryActive(this.props.activeUserId, storyId)
            }
          />
        )
      );
    }
    return result;
  }

  _buildCompletedStories() {
    let result = [];
    if (this.props.completedStories.length > 0) {
      result.push(
        <H3 style={{margin: 10}} key={'completed-stories-h3'}>
          Completed Stories
        </H3>
      );
      this.props.completedStories.forEach(story =>
        result.push(
          <StoryCard
            key={`completed-${story.id}`}
            story={story}
            isStartable={false}
          />
        )
      );
    }
    return result;
  }

  render() {
    return (
      <Container>
        <Content>
          <H3 style={{margin: 10}}>
            Active Stories
          </H3>
          { this.props.activeStory
            ? <StoryCard
                story={ this.props.activeStory }
                isStartable={false}
              />
            : <Text>
                You do not have an active story :(
              </Text>
          }
          { this._buildProgressedStories() }
          { this._buildCompletedStories() }
        </Content>
      </Container>
    )
  }
}

UserStoriesContainer.propTypes = {
  activeUserId: React.PropTypes.string,
  activeStory: React.PropTypes.object,
  progressedStories: React.PropTypes.array,
  completedStories: React.PropTypes.array,
  setStoryActive: React.PropTypes.func
}

function mapStateToProps(state) {
  const { activeStoryId } = state.activeUser;
  const stories = state.stories.data;
  const storiesInProgressIds = state.activeUser.storiesInProgress;
  const completedStoriesIds = state.activeUser.completedStories;
  const progressedStories = _.filter(stories, (v,k) => {
    return _.some(
        storiesInProgressIds,
        (storyId) => storyId === k
      ) && k !== activeStoryId;
  });
  const completedStories = _.filter(stories, (v,k) => {
    return _.some(
        completedStoriesIds,
        (storyId) => storyId === k
      );
  });

  return {
    activeUserId: state.activeUser.id,
    activeStory: stories[`${activeStoryId}`],
    progressedStories,
    completedStories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setStoryActive: (userId, storyId) => dispatch(setStoryActive(userId, storyId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(UserStoriesContainer);
