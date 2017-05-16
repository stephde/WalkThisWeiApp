import _ from 'lodash';
import {
  GET_STORIES_START,
  GET_STORIES_ERROR,
  GET_STORIES_SUCCESS
} from '../constants/actionTypes.js';

const initialState = {
  data: {},
  loading: false,
  error: null
};

export default function stories(state = initialState, action) {
  switch(action.type) {
    case GET_STORIES_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GET_STORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case GET_STORIES_SUCCESS:
      const newStories = _.reduce(
        _.map(
          _.castArray(action.payload),
          (story) => ({[story.id]: story} )
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
          ...newStories
        }
      };
    default:
      return state;
  }
}
