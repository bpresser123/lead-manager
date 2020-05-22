import axios from 'axios';
import { returnErrors } from './messages';
import { USER_LOADED, USER_LOADING, AUTH_ERROR } from './types';

export const loadUser = () => (dispatch, getState) => {
  dispatch({type: USER_LOADING});

  // Checks auth reducer for token state from local storage
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  // Add auth header object in config object it token is available
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  axios.get("/api/auth/user", config)
  .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR
    })
  })
}
