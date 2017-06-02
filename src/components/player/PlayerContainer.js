import MarkerPlayer from './player';
import { connect } from 'react-redux';
import {
  playerOpened,
  handledPlayerButtonPress,
  closedPlayer
} from '../../actions';
import _ from 'lodash';
import {
  getActiveStory,
  getActiveStoryProgress,
  getActiveSubChapter,
  getActiveSubChapters,
} from '../../helpers/stateHelper';
import { DISTANCE } from '../../constants/distance.js';
import { isInDistance } from '../../helpers/locationHelper';

function mapStateToProps(state) {
  const activeStory = getActiveStory(state.stories.data, state.activeUser);
  const activeStoryProgress = getActiveStoryProgress(state.stories.data, state.activeUser, state.progress.data);
  let annotation = {}
  if (state.player.annotationIndex === -1) {
    annotation = getActiveSubChapter(activeStory, activeStoryProgress);
  }
  else {
    annotation = getActiveSubChapters(activeStory, activeStoryProgress)[state.player.annotationIndex];
  }
  if (!_.isEmpty(annotation)) {
    annotation.inDistance = isInDistance(
      state.position.userLocation,
      {
        latitude: annotation.coordinates[1],
        longitude: annotation.coordinates[0]
      },
      DISTANCE
    );
  }

  return {
    openPlayer: state.player.openPlayer,
    annotation: annotation,
    controlButtonPressed: state.player.controlButtonPressed,
  };
}

function mapDispatchToProps(dispatch){
  return {
    playerOpened: () => dispatch(playerOpened()),
    handledPlayerButtonPress: () => dispatch(handledPlayerButtonPress()),
    closedPlayer: () => dispatch(closedPlayer())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerPlayer);
