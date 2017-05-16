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
        setStoryActive={this.props.setStoryActive}
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
  getStoriesAroundUser: React.PropTypes.func,
  setStoryActive: React.PropTypes.func,
}

function mapStateToProps(state) {
  return {
    stories: state.stories.data
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getStoriesAroundUser: () => dispatch(getStoriesAroundCurrentLocation()),
    setStoryActive: (storyId) => dispatch(setStoryActive(storyId))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllStoriesContainer)
