//for getting  mail detail
import { fetchError, fetchStart, fetchSuccess } from './Common';
import axios from 'services/auth/jwt/config';
import { 
  GET_USER_DETAIL,GET_UPDATE_USER_DETAIL_IMAGE,GET_UPDATE_USER_DETAIL,
  SET_USER_DETAILS
} from '@jumbo/constants/ActionTypes';
import { setAuthUser } from 'redux/actions/Auth';
import { isUndefined } from 'lodash';
export const getUserDetail = (userid) => {
  return dispatch => {
    dispatch(fetchStart());
    axios
      .get('/user/profile',{
        params:{
          userid:userid
        }
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(fetchSuccess());
          dispatch({ type: GET_USER_DETAIL, payload: data.data.results });
        } else {
          dispatch(fetchError('Something went wrong'));
        }
      })
      .catch(error => {
        dispatch(fetchError('Something went wrong'));
      });
  };
};
//updateUserImage
export const updateUserImage = (userid,image) => {
  return dispatch => {
    dispatch(fetchStart());
    const ipAdress='0.0.0.0'
    const formData = new FormData()
    formData.append('files[]', image)
    formData.append('userid', userid)
    axios
    .put('/user/profile/image',
    formData,
    {
      body:{
        userid,
        ipAdress
      },
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        dispatch({ type: GET_UPDATE_USER_DETAIL_IMAGE, payload: data.data.results });
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    })
    .catch(error => {
      dispatch(fetchError('Something went wrong'));
    });
  }
}
//updateUser
export const updateUser = (user,isFrom,DaytoUpdate) => {
  let daytoUpdate = isUndefined(DaytoUpdate)?0:DaytoUpdate
  return dispatch => {
    if(user.Password === ""){
      delete user.Password;
    }
    dispatch(fetchStart());
    const ipAdress='0.0.0.0'
    axios
    .put('/user/profile/update',
    {
      body:{
        user,
        daytoUpdate,
        ipAdress
      },
      headers:{
        'content-type': 'application/json',
      }
    })
    .then(data => {
      if (data.status === 200) {
        dispatch(fetchSuccess());
        if(parseInt(isFrom) === 0){
          dispatch(setAuthUser(data.data.results.user));
          dispatch({ type: GET_UPDATE_USER_DETAIL, payload: data.data.results });
        }else{
          dispatch({ type: GET_UPDATE_USER_DETAIL, payload: data.data.results });
        }
       // 
      } else {
        dispatch(fetchError('Something went wrong'));
      }
    })
    .catch(error => {
      dispatch(fetchError('Something went wrong'));
    });
  }
}
//onForgetPass

