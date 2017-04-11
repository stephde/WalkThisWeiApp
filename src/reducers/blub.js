
const BLUB = "BLUB";

const initialState = {
  blub: "blub"
};

export default function blub(state = initialState, action) {
  switch(action.type) {
    case BLUB:
      return state;
    default:
      return state;
  }
}