import {
  ADD_CLICK,
  RESET,
  TICK,
  SET_TIME,
  FETCH_LEADERS,
  POST_SCORE,
} from '../actions/types';

const initialState = {
  leaders: null,
  clickCount: 0,
  timer: 10,
  score: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LEADERS:
      return {
        ...state,
        leaders: action.payload,
      };
    case ADD_CLICK:
      return {
        ...state,
        clickCount: state.clickCount + 1,
      };
    case RESET:
      return {
        ...state,
        clickCount: 0,
        timer: 60,
      };
    case TICK:
      return {
        ...state,
        timer: state.timer - 1,
      };
    case SET_TIME:
      return {
        ...state,
        timer: action.value,
      };
    case POST_SCORE:
      console.log('POST SCORE', action);
      return {
        ...state,
        score: action.data.score,
      };
    default:
      return state;
  }
}
