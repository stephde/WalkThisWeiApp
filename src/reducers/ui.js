import {
  SHOW_NEW_CHAPTER_TOGGLE,
  SET_STORY_ACTIVE_START,
  SET_STORY_PROGRESS_SUCCESS,
  FINISHED_STORY
} from '../constants/actionTypes';

const initialState = {
  showChapterButton: false,
  hasFinishedStory: false,
  newChapterProgress: {},
};

export default function ui(state = initialState, action) {
  switch (action.type) {
    case SET_STORY_PROGRESS_SUCCESS:
      return {
        ...state,
        showChapterButton: false,
      };
    case SHOW_NEW_CHAPTER_TOGGLE:
      return {
        ...state,
        showChapterButton: true,
        newChapterProgress: action.payload.nextProgress
      };
    case FINISHED_STORY:
      return {
        ...state,
        showChapterButton: false,
        hasFinishedStory: true
      }
    case SET_STORY_ACTIVE_START:
      return {
        ...state,
        showChapterButton: false,
        hasFinishedStory: false
      };
    default:
      return state;
  }
}
