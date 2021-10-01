import axios from "axios";
import * as actions from "../apiActions";
import configData from '../../config.json';
import { toastAction } from '../toastActions';


const api = ({ dispatch }) => next => async action => {
 // console.log('grgrgregerggergerger');
  if (action.type !== actions.apiCallBegan.type) return next(action);
  const { url, method, data, config, onStart, onSuccess, onError } = action.payload;
  if (onStart) dispatch({ type: onStart });
  next(action);
  try {
   // console.log('rrrrrrrrrrrrrrrrr');
    const response = await axios.request({
      baseURL: configData.API_URL,
      url,
      method,
      data,
      config
    });

    // General
    dispatch(actions.apiCallSuccess(response.data));
    //Specific
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    //console.log(response.data.data)
  //  console.log(response.data.token)
  } catch (error) {
      const response = error.response;
      const message = response ? response.data.message : error.message;
      //General
      dispatch(actions.apiCallFailed({ message }));
      dispatch(toastAction({ message, type: 'error' }));
      //Specific
      if (onError) dispatch({ type: onError, payload: message });
  }
};

export default api;
