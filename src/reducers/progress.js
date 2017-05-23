import {
  SET_STORY_PROGRESS_START,
  SET_STORY_PROGRESS_ERROR,
  SET_STORY_PROGRESS_SUCCESS,
  GET_STORY_PROGRESS_START,
  GET_STORY_PROGRESS_ERROR,
  GET_STORY_PROGRESS_SUCCESS,
} from '../constants/actionTypes.js';

const initialState = {
  error: null,
  loading: false,
  data: {}
}

export default function progress(state = {}, action) {
  switch (action.type) {
    case GET_STORY_PROGRESS_START:
    case SET_STORY_PROGRESS_START:
      return {
        ...state,
        loading: true
      };
    case GET_STORY_PROGRESS_ERROR:
    case SET_STORY_PROGRESS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_STORY_PROGRESS_SUCCESS:
    case SET_STORY_PROGRESS_SUCCESS:
      const newProgress = _.reduce(
        _.map(
          _.castArray(action.payload),
          (progress) => ({[progress.storyId]: progress} )
        ),
        (r,v,k) => {
          r[_.findKey(v)]=v[_.findKey(v)];
          return r;
        },
        {}
      );
      return {
        ...state,
        loading: false,
        error: null,
        data: {
          ...state.data,
          ...newProgress
        }
      };
    default:
      return state;
  }
}