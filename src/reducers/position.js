import {
  SET_REGION,
  SET_USER_LOCATION,
  USER_LOCATION_START,
  USER_LOCATION_SUCCESS,
  USER_LOCATION_ERROR
} from '../constants/actionTypes.js';

const initialState = {
  mapRegion:{
    latitude: 0,
    longitude: 0,
    latitudeDelta:  0.00922*1.5,
    longitudeDelta: 0.00421*1.5,
  },
  userLocation: {
    longitude: 0,
    latitude: 0
  },
  loading: false,
  error: null
}

export default function position(state = initialState, action){
  switch (action.type) {
    case SET_REGION:
      const { mapRegion } = action.payload;
      return {
        ...state,
        mapRegion: {
          ...state.mapRegion,
          ...mapRegion
        }
      };
    case SET_USER_LOCATION:
      return {
        ...state,
        userLocation: {
          longitude: action.payload.longitude,
          latitude: action.payload.latitude
        }
      };
    case USER_LOCATION_START:
      return {
        ...state,
        loading: true,
        error: null
      }
    case USER_LOCATION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        contacts: action.payload,
      }
    case USER_LOCATION_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state;
  }
};
