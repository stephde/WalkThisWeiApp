import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getStoriesAroundCurrentLocation,
  setStoryActive
} from '../actions';
import {
  Container,
  Content,
  Text
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import StoryCard from './StoryCard';

class AllStoriesContainer extends Component {

  componentDidMount() {
    this.props.getStoriesAroundUser();
  }

  _buildStoryCards(){
    return _.map(this.props.stories, story =>
      <StoryCard
        key={story.id}
        story={story}
        isStartable={true}
        setStoryActive={
          storyId => this.props.setStoryActive(this.props.activeUserId, storyId)
        }
        storyProgress={this.props.progress[story.id]}
      />
    );
  }

  render() {
    const storyCards = this._buildStoryCards();
    return (
      <Container>
        <Content>
          { storyCards }
        </Content>
      </Container>
    );
  }
}

AllStoriesContainer.propTypes = {
  stories: React.PropTypes.object,
  activeUserId: React.PropTypes.string,
  getStoriesAroundUser: React.PropTypes.func,
  setStoryActive: React.PropTypes.func,
  progress: React.PropTypes.object
}

function mapStateToProps(state) {
  return {
    stories: state.stories.data,
    activeUserId: state.activeUser.id,
    progress: state.progress.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getStoriesAroundUser: () => dispatch(getStoriesAroundCurrentLocation()),
    setStoryActive: (userId, storyId) => dispatch(setStoryActive(userId, storyId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllStoriesContainer)
