import axios from 'axios';
import { ADD_CLICK, RESET, TICK, SET_TIME, FETCH_LEADERS } from './types';

export const fetchLeaders = () => async (dispatch) => {
  const response = await axios.get('/api/leaderboard');
  dispatch({
    type: FETCH_LEADERS,
    payload: response.data,
  });
};

export const addClick = () => {
  return {
    type: ADD_CLICK,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

export const timerTick = () => {
  return {
    type: TICK,
  };
};

export const setTime = (value) => {
  return {
    type: SET_TIME,
    value,
  };
};
